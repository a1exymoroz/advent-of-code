import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MazeSolverService, PathStep, MazeSolution } from '../services/maze-solver.service';

@Component({
  selector: 'app-maze-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maze-visualizer.component.html',
  styleUrls: ['./maze-visualizer.component.css']
})
export class MazeVisualizerComponent implements OnInit {
  grid: string[][] = [];
  solution: MazeSolution | null = null;
  currentStep: number = 0;
  isPlaying: boolean = false;
  animationSpeed: number = 100;
  private animationInterval: any;
  private currentInput: string = '';
  private currentIsTestData: boolean = true;

  testData1 = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

  testData2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

  constructor(
    private mazeSolver: MazeSolverService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadTestData(1);
  }

  loadTestData(testNumber: number) {
    if (testNumber === 3) {
      this.http.get('assets/16.txt', { responseType: 'text' }).subscribe({
        next: (data) => {
          this.solveMaze(data, false);
        },
        error: (err) => {
          console.error('Error loading test data 3:', err);
        }
      });
    } else {
      const data = testNumber === 1 ? this.testData1 : this.testData2;
      this.solveMaze(data, true);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        this.solveMaze(content, false);
      };
      reader.readAsText(file);
    }
  }

  solveMaze(input: string, isTestData: boolean) {
    this.currentInput = input;
    this.currentIsTestData = isTestData;
    this.grid = input.trim().split('\n').map(line => line.split(''));
    
    this.solution = this.mazeSolver.solveMaze(input, isTestData);
    
    // Add start position to path if not already included
    if (this.solution && this.solution.minPath.length > 0) {
      const start = this.mazeSolver.findStartingPosition(this.grid);
      if (start) {
        const firstStep = this.solution.minPath[0];
        if (firstStep.x !== start.x || firstStep.y !== start.y) {
          this.solution.minPath.unshift({
            x: start.x,
            y: start.y,
            direction: firstStep.direction,
            cost: 0
          });
        }
      }
    }
    
    this.currentStep = 0;
    this.stopAnimation();
  }

  getCellClass(x: number, y: number): string {
    if (!this.grid[y] || !this.grid[y][x]) return '';
    
    const cell = this.grid[y][x];
    const classes = ['cell'];
    
    if (cell === '#') {
      classes.push('wall');
    } else if (cell === 'S') {
      classes.push('start');
    } else if (cell === 'E') {
      classes.push('end');
    } else if (this.solution && this.isInPath(x, y)) {
      if (this.isCurrentStep(x, y)) {
        classes.push('current');
      } else {
        classes.push('path-cell');
      }
    } else {
      classes.push('path');
    }
    
    return classes.join(' ');
  }

  getCellContent(x: number, y: number): string {
    if (!this.grid[y] || !this.grid[y][x]) return '';
    
    const cell = this.grid[y][x];
    if (cell === 'S' || cell === 'E' || cell === '#') {
      return cell;
    }
    
    if (this.solution && this.isInPath(x, y)) {
      const step = this.solution.minPath.find(s => s.x === x && s.y === y);
      if (step) {
        const dirMap: { [key: string]: string } = {
          '>': '→',
          '<': '←',
          '^': '↑',
          'v': '↓'
        };
        return dirMap[step.direction] || '';
      }
    }
    
    return cell;
  }

  isInPath(x: number, y: number): boolean {
    if (!this.solution) return false;
    return this.solution.minPath.some(step => step.x === x && step.y === y);
  }

  isCurrentStep(x: number, y: number): boolean {
    if (!this.solution || this.currentStep >= this.solution.minPath.length) return false;
    const step = this.solution.minPath[this.currentStep];
    return step && step.x === x && step.y === y;
  }

  playAnimation() {
    if (!this.solution || this.solution.minPath.length === 0) return;
    
    this.isPlaying = true;
    this.currentStep = 0;
    
    this.animationInterval = setInterval(() => {
      this.currentStep++;
      if (this.currentStep >= this.solution!.minPath.length) {
        this.stopAnimation();
      }
    }, this.animationSpeed);
  }

  stopAnimation() {
    this.isPlaying = false;
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  resetAnimation() {
    this.stopAnimation();
    this.currentStep = 0;
  }

  stepForward() {
    if (!this.solution) return;
    if (this.currentStep < this.solution.minPath.length - 1) {
      this.currentStep++;
    }
  }

  stepBackward() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  get currentCost(): number {
    if (!this.solution || this.currentStep === 0) return 0;
    if (this.currentStep >= this.solution.minPath.length) {
      return this.solution.minCost;
    }
    return this.solution.minPath[this.currentStep]?.cost || 0;
  }

  get totalCost(): number {
    return this.solution?.minCost || 0;
  }

  get pathLength(): number {
    return this.solution?.minPath.length || 0;
  }
}


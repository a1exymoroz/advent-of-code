import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MazeSolverService, PathStep, MazeSolutionPart2 } from '../services/maze-solver.service';

@Component({
  selector: 'app-maze-visualizer-part2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maze-visualizer-part2.component.html',
  styleUrls: ['./maze-visualizer-part2.component.css']
})
export class MazeVisualizerPart2Component implements OnInit {
  grid: string[][] = [];
  solutionPart2: MazeSolutionPart2 | null = null;
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
    
    this.solutionPart2 = this.mazeSolver.solveMazePart2(input, isTestData);
    
    // For Part 2, use the first optimal path for animation
    if (this.solutionPart2 && this.solutionPart2.allOptimalPaths.length > 0) {
      const firstPath = this.solutionPart2.allOptimalPaths[0];
      if (firstPath.length > 0) {
        const start = this.mazeSolver.findStartingPosition(this.grid);
        if (start) {
          const firstStep = firstPath[0];
          if (firstStep.x !== start.x || firstStep.y !== start.y) {
            firstPath.unshift({
              x: start.x,
              y: start.y,
              direction: firstStep.direction,
              cost: 0
            });
          }
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
    } else if (this.solutionPart2) {
      // Part 2: show all visited cells with path indicators
      if (this.solutionPart2.visitedCells.has(`${x},${y}`)) {
        const pathIndices = this.getPathIndicesForCell(x, y);
        if (pathIndices.length > 0) {
          // Add class based on how many paths pass through this cell
          if (pathIndices.length === 1) {
            classes.push('path-single');
            classes.push(`path-${pathIndices[0] % 10}`);
          } else if (pathIndices.length <= 3) {
            classes.push('path-multiple');
          } else {
            classes.push('path-many');
          }
        }
        
        if (this.isCurrentStep(x, y)) {
          classes.push('current');
        }
      } else {
        classes.push('path');
      }
    } else {
      classes.push('path');
    }
    
    return classes.join(' ');
  }

  getCellStyle(x: number, y: number): { [key: string]: string } {
    if (!this.solutionPart2 || !this.solutionPart2.visitedCells.has(`${x},${y}`)) {
      return {};
    }

    const pathIndices = this.getPathIndicesForCell(x, y);
    if (pathIndices.length === 0) {
      return {};
    }

    // Color palette for different paths
    const colors = [
      'rgba(231, 76, 60, 0.8)',   // Red
      'rgba(52, 152, 219, 0.8)',  // Blue
      'rgba(46, 204, 113, 0.8)',  // Green
      'rgba(243, 156, 18, 0.8)',  // Orange
      'rgba(155, 89, 182, 0.8)',  // Purple
      'rgba(26, 188, 156, 0.8)',  // Turquoise
      'rgba(230, 126, 34, 0.8)',  // Dark Orange
      'rgba(52, 73, 94, 0.8)',    // Dark Blue
      'rgba(22, 160, 133, 0.8)',  // Dark Turquoise
      'rgba(192, 57, 43, 0.8)'    // Dark Red
    ];

    if (pathIndices.length === 1) {
      // Single path - use its color
      return { 'background-color': colors[pathIndices[0] % 10], 'color': 'white' };
    } else if (pathIndices.length <= 3) {
      // Multiple paths - blend colors
      const colorStops = pathIndices.slice(0, 3).map((idx, i) => {
        const color = colors[idx % 10];
        const position = (i / (pathIndices.length - 1)) * 100;
        return `${color} ${position}%`;
      }).join(', ');
      return { 
        'background': `linear-gradient(135deg, ${colorStops})`,
        'color': 'white'
      };
    } else {
      // Many paths - animated gradient
      const colorStops = pathIndices.slice(0, 5).map((idx, i) => {
        const color = colors[idx % 10];
        const position = (i / 4) * 100;
        return `${color} ${position}%`;
      }).join(', ');
      return { 
        'background': `linear-gradient(135deg, ${colorStops})`,
        'background-size': '200% 200%',
        'color': 'white'
      };
    }
  }

  getPathIndicesForCell(x: number, y: number): number[] {
    if (!this.solutionPart2) return [];
    
    const indices: number[] = [];
    this.solutionPart2.allOptimalPaths.forEach((path, idx) => {
      if (path.some(step => step.x === x && step.y === y)) {
        indices.push(idx);
      }
    });
    return indices;
  }

  getCellContent(x: number, y: number): string {
    if (!this.grid[y] || !this.grid[y][x]) return '';
    
    const cell = this.grid[y][x];
    if (cell === 'S' || cell === 'E' || cell === '#') {
      return cell;
    }
    
    debugger;
    if (this.solutionPart2) {
      // For Part 2, show direction from any path that visits this cell
      // If multiple paths, show a symbol indicating multiple paths
      const pathIndices = this.getPathIndicesForCell(x, y);
      if (pathIndices.length > 0) {
        // Find direction from the first path
        const firstPath = this.solutionPart2.allOptimalPaths[pathIndices[0]];
        const step = firstPath.find(s => s.x === x && s.y === y);
        if (step) {
          const dirMap: { [key: string]: string } = {
            '>': '→',
            '<': '←',
            '^': '↑',
            'v': '↓'
          };
          // If multiple paths pass through, we could show a different symbol
          // For now, just show the direction from the first path
          return dirMap[step.direction] || '';
        }
      }
    }
    
    return cell;
  }

  isCurrentStep(x: number, y: number): boolean {
    if (this.solutionPart2 && this.solutionPart2.allOptimalPaths.length > 0) {
      const currentPath = this.solutionPart2.allOptimalPaths[0];
      if (this.currentStep >= currentPath.length) return false;
      const step = currentPath[this.currentStep];
      return step && step.x === x && step.y === y;
    }
    return false;
  }

  playAnimation() {
    const path = this.getCurrentPath();
    if (!path || path.length === 0) return;
    
    this.isPlaying = true;
    this.currentStep = 0;
    
    this.animationInterval = setInterval(() => {
      this.currentStep++;
      if (this.currentStep >= path.length) {
        this.stopAnimation();
      }
    }, this.animationSpeed);
  }

  private getCurrentPath(): PathStep[] | null {
    if (this.solutionPart2 && this.solutionPart2.allOptimalPaths.length > 0) {
      return this.solutionPart2.allOptimalPaths[0];
    }
    return null;
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
    const path = this.getCurrentPath();
    if (!path) return;
    if (this.currentStep < path.length - 1) {
      this.currentStep++;
    }
  }

  stepBackward() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  get currentCost(): number {
    const path = this.getCurrentPath();
    if (!path || this.currentStep === 0) return 0;
    if (this.currentStep >= path.length) {
      return this.totalCost;
    }
    return path[this.currentStep]?.cost || 0;
  }

  get totalCost(): number {
    return this.solutionPart2?.minCost || 0;
  }

  get pathLength(): number {
    const path = this.getCurrentPath();
    return path?.length || 0;
  }

  get visitedCellCount(): number {
    return this.solutionPart2?.visitedCellCount || 0;
  }

  get optimalPathsCount(): number {
    return this.solutionPart2?.allOptimalPaths.length || 0;
  }
}


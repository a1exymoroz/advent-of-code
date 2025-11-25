import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MazeVisualizerComponent } from './maze-visualizer/maze-visualizer.component';
import { MazeSolverService } from './services/maze-solver.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MazeVisualizerComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>🦌 Reindeer Maze Visualization</h1>
        <p>Advent of Code 2024 - Day 16</p>
      </div>
      <app-maze-visualizer></app-maze-visualizer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Reindeer Maze Visualization';
}


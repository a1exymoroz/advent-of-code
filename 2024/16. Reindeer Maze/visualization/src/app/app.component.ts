import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MazeVisualizerComponent } from './maze-visualizer/maze-visualizer.component';
import { MazeVisualizerPart2Component } from './maze-visualizer-part2/maze-visualizer-part2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, MazeVisualizerComponent, MazeVisualizerPart2Component],
  template: `
    <div class="container">
      <div class="header">
        <h1>🦌 Reindeer Maze Visualization</h1>
        <p>Advent of Code 2024 - Day 16</p>
        <div class="part-switcher">
          <label>
            <input type="radio" name="part" [value]="false" [(ngModel)]="usePart2" (ngModelChange)="usePart2 = false">
            Part 1
          </label>
          <label>
            <input type="radio" name="part" [value]="true" [(ngModel)]="usePart2" (ngModelChange)="usePart2 = true">
            Part 2
          </label>
        </div>
      </div>
      <app-maze-visualizer *ngIf="!usePart2"></app-maze-visualizer>
      <app-maze-visualizer-part2 *ngIf="usePart2"></app-maze-visualizer-part2>
    </div>
  `,
  styles: [`
    .part-switcher {
      margin-top: 10px;
      display: flex;
      gap: 20px;
    }
    .part-switcher label {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  `]
})
export class AppComponent {
  title = 'Reindeer Maze Visualization';
  usePart2: boolean = false;
}


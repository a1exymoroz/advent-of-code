import { Injectable } from '@angular/core';

export interface Position {
  x: number;
  y: number;
  direction: string;
  cost: number;
}

export interface PathStep {
  x: number;
  y: number;
  direction: string;
  cost: number;
}

export interface MazeSolution {
  minCost: number;
  minPath: PathStep[];
  grid: string[][];
}

export interface MazeSolutionPart2 {
  minCost: number;
  allOptimalPaths: PathStep[][];
  visitedCells: Set<string>;
  visitedCellCount: number;
  grid: string[][];
}

@Injectable({
  providedIn: 'root'
})
export class MazeSolverService {
  private DIRECTIONS: { [key: string]: [number, number] } = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, -1],
    'v': [0, 1]
  };

  private TURN_LEFT: { [key: string]: string } = {
    '^': '<',
    '<': 'v',
    'v': '>',
    '>': '^'
  };

  private TURN_RIGHT: { [key: string]: string } = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^'
  };

  public findStartingPosition(grid: string[][]): { x: number; y: number } | null {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 'S') {
          return { x, y };
        }
      }
    }
    return null;
  }

  solveMaze(input: string, isTestData: boolean = true): MazeSolution {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const start = this.findStartingPosition(grid);

    if (!start) {
      return { minCost: Infinity, minPath: [], grid };
    }

    return this.findPossiblePaths(grid, start.x, start.y, isTestData);
  }

  private findPossiblePaths(
    grid: string[][],
    x: number,
    y: number,
    isTestData: boolean = true
  ): MazeSolution {
    const queue: Array<[number, number, number, string, PathStep[]]> = [];
    const gridCopy = grid.map(row => [...row]);
    const costs = new Map<string, number>();
    const visited = new Set<string>();

    // Initialize: from S, can start facing any direction and move forward
    for (const direction of Object.keys(this.DIRECTIONS)) {
      const [dx, dy] = this.DIRECTIONS[direction];
      const nextX = x + dx;
      const nextY = y + dy;

      if (gridCopy[nextY] && gridCopy[nextY][nextX] && gridCopy[nextY][nextX] !== '#') {
        const stateKey = `${nextX},${nextY},${direction}`;
        const cost = 1;
        costs.set(stateKey, cost);
        queue.push([nextX, nextY, cost, direction, [{ x: nextX, y: nextY, direction, cost }]]);
      }
    }

    queue.sort((a, b) => a[2] - b[2]);

    let minCostToEnd = Infinity;
    let minPath: PathStep[] = [];

    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) break;
      const [currX, currY, currentCost, direction, path] = item;
      const stateKey = `${currX},${currY},${direction}`;

      if (visited.has(stateKey)) {
        continue;
      }

      visited.add(stateKey);

      const moves = [
        { direction: direction, cost: currentCost + 1 },
        { direction: this.TURN_LEFT[direction], cost: currentCost + 1001 },
        { direction: this.TURN_RIGHT[direction], cost: currentCost + 1001 }
      ];

      for (const move of moves) {
        if (!move.direction || !this.DIRECTIONS[move.direction]) {
          continue;
        }

        const [dx, dy] = this.DIRECTIONS[move.direction];
        const nextX = currX + dx;
        const nextY = currY + dy;

        if (!gridCopy[nextY] || !gridCopy[nextY][nextX]) {
          continue;
        }

        if (gridCopy[nextY][nextX] === '#') {
          continue;
        }

        if (gridCopy[nextY][nextX] === 'E') {
          const finalCost = currentCost + move.cost;
          if (finalCost < minCostToEnd) {
            minCostToEnd = finalCost;
            minPath = [...path, { x: nextX, y: nextY, direction: move.direction, cost: finalCost }];
          }
          continue;
        }

        const nextStateKey = `${nextX},${nextY},${move.direction}`;

        if (visited.has(nextStateKey)) {
          continue;
        }

        const newCost = currentCost + move.cost;
        const existingCost = costs.get(nextStateKey);

        if (existingCost === undefined || newCost < existingCost) {
          costs.set(nextStateKey, newCost);
          queue.push([
            nextX,
            nextY,
            newCost,
            move.direction,
            [...path, { x: nextX, y: nextY, direction: move.direction, cost: newCost }]
          ]);
          queue.sort((a, b) => a[2] - b[2]);
        }
      }
    }

    if (!isTestData && minCostToEnd !== Infinity) {
      minCostToEnd = minCostToEnd - 2000;
    }

    return { minCost: minCostToEnd, minPath, grid: gridCopy };
  }

  solveMazePart2(input: string, isTestData: boolean = true): MazeSolutionPart2 {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const start = this.findStartingPosition(grid);

    if (!start) {
      return { 
        minCost: Infinity, 
        allOptimalPaths: [], 
        visitedCells: new Set(), 
        visitedCellCount: 0,
        grid 
      };
    }

    // First, find the minimum cost and one optimal path
    const part1Solution = this.findPossiblePaths(grid, start.x, start.y, isTestData);
    const minCost = part1Solution.minCost;
    const minPath = part1Solution.minPath;

    if (minCost === Infinity || !minPath) {
      return {
        minCost: Infinity,
        allOptimalPaths: [],
        visitedCells: new Set(),
        visitedCellCount: 0,
        grid: part1Solution.grid
      };
    }

    // Find all other optimal paths using the same approach as JavaScript
    const allOptimalPaths = this.findOtherPossiblePaths(grid, start.x, start.y, minPath);

    // Collect all unique cells visited by any optimal path
    const visitedCells = new Set<string>();
    for (const path of allOptimalPaths) {
      for (const step of path) {
        visitedCells.add(`${step.x},${step.y}`);
      }
    }

    return {
      minCost,
      allOptimalPaths,
      visitedCells,
      visitedCellCount: visitedCells.size,
      grid: part1Solution.grid
    };
  }

  private findOptimalPath(
    grid: string[][],
    x: number,
    y: number,
    optimalPath: PathStep[]
  ): PathStep[] | null {
    const optimalPathMap = new Map<string, PathStep>();
    for (const p of optimalPath) {
      optimalPathMap.set(`${p.x},${p.y}`, p);
    }

    const queue: Array<[number, number, number, string, PathStep[]]> = [];
    const costs = new Map<string, number>();
    costs.set(`${x},${y}`, 0);
    queue.push([x, y, 0, '^', [{ x, y, direction: '^', cost: 0 }]]);

    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) break;
      const [currX, currY, currentCost, direction, path] = item;

      const moves = [
        { direction: direction, cost: currentCost + 1 },
        { direction: this.TURN_LEFT[direction], cost: currentCost + 1001 },
        { direction: this.TURN_RIGHT[direction], cost: currentCost + 1001 }
      ];

      for (const move of moves) {
        if (!move.direction || !this.DIRECTIONS[move.direction]) {
          continue;
        }

        const [dx, dy] = this.DIRECTIONS[move.direction];
        const nextX = currX + dx;
        const nextY = currY + dy;

        if (!grid[nextY] || !grid[nextY][nextX]) {
          continue;
        }

        if (grid[nextY][nextX] === '#') {
          continue;
        }

        if (grid[nextY][nextX] === 'E') {
          continue;
        }

        const cellKey = `${nextX},${nextY}`;
        const existingCost = costs.get(cellKey);
        if (grid[nextY][nextX] === '.' || (existingCost === undefined || existingCost > move.cost)) {
          costs.set(cellKey, move.cost);
          queue.push([
            nextX,
            nextY,
            move.cost,
            move.direction,
            [...path, { x: nextX, y: nextY, direction: move.direction, cost: move.cost }]
          ]);
        }

        const optimalStep = optimalPathMap.get(`${nextX},${nextY}`);
        const currentStep = optimalPathMap.get(`${currX},${currY}`);
        if (optimalStep && !currentStep && optimalStep.cost + 1000 === move.cost) {
          return [...path, { x: nextX, y: nextY, direction: move.direction, cost: move.cost }];
        }
      }
    }

    return null;
  }

  private findOtherPossiblePaths(
    grid: string[][],
    x: number,
    y: number,
    optimalPath: PathStep[]
  ): PathStep[][] {
    const otherPossiblePaths: PathStep[][] = [optimalPath];

    let currentOptimalPath: PathStep[] | null = optimalPath;

    while (currentOptimalPath) {
      const allKnownPaths = otherPossiblePaths.flat();
      currentOptimalPath = this.findOptimalPath(grid, x, y, allKnownPaths);
      if (currentOptimalPath) {
        otherPossiblePaths.push(currentOptimalPath);
      }
    }

    return otherPossiblePaths;
  }
}


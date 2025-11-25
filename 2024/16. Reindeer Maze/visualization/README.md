# Reindeer Maze Visualization

Angular application to visualize the pathfinding algorithm for Advent of Code 2024 Day 16: Reindeer Maze.

## Setup

1. Navigate to the visualization directory:
```bash
cd visualization
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser to `http://localhost:4200`

## Features

- **Visualize the maze** with walls (#), start (S), and end (E) positions
- **Animate the pathfinding** algorithm step by step
- **Show the optimal path** with direction indicators (→ ← ↑ ↓)
- **Display cost information** (total cost, current step cost, path length)
- **Load test data** or your own input file (16.txt)
- **Control animation speed** (50-500ms per step)
- **Step through the path manually** with forward/backward buttons

## Controls

- **Load Test 1/2**: Load predefined test mazes
- **Choose File**: Load your own maze from a text file (e.g., 16.txt)
- **Play**: Animate the pathfinding from start to end
- **Stop**: Pause the animation
- **Reset**: Reset to the beginning
- **Step →/←**: Move forward/backward one step manually
- **Speed**: Adjust animation speed (50-500ms per step)

## Color Coding

- **Green (S)**: Start position
- **Red (E)**: End position
- **Dark Gray (#)**: Walls
- **Light Gray (.)**: Empty path
- **Blue**: Visited cells
- **Green with arrows**: Optimal path with direction indicators
- **Orange (pulsing)**: Current position during animation

## Notes

- The visualization shows the optimal path found by Dijkstra's algorithm
- Each step shows the direction the reindeer is facing
- Moving forward costs 1, turning then moving costs 1001
- The total cost includes all moves and turns


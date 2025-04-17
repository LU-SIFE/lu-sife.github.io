
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const cellSize = 4;
let cols, rows, grid;


// Fixed resolution for video recording
const recordingWidth = 1920; // Set the resolution (1920x1080)
const recordingHeight = 1080;

// Resize canvas when window is resized
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / cellSize);
  rows = Math.floor(canvas.height / cellSize);
  grid = createGrid();
}

window.addEventListener('resize', resizeCanvas);

// Create grid with random state
function createGrid() {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push(Math.random() > 0.8 ? 1 : 0); // Random start
    }
    grid.push(row);
  }
  return grid;
}

// Get alive neighbors of a cell
function getAliveNeighbors(grid, x, y) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        count += grid[ny][nx];
      }
    }
  }
  return count;
}

// Update grid based on Conway's rules
function updateGrid(grid) {
  const newGrid = [];
  for (let y = 0; y < rows; y++) {
    const newRow = [];
    for (let x = 0; x < cols; x++) {
      const alive = grid[y][x];
      const neighbors = getAliveNeighbors(grid, x, y);
      if (alive) {
        newRow.push(neighbors === 2 || neighbors === 3 ? 1 : 0);
      } else {
        newRow.push(neighbors === 3 ? 1 : 0);
      }
    }
    newGrid.push(newRow);
  }
  return newGrid;
}

// Draw grid on canvas
function drawGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x]) {
        ctx.fillStyle = '#8a807b';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

// Resize canvas and start the game
resizeCanvas();

// Main animation loop
function loop() {
  drawGrid(grid);
  grid = updateGrid(grid);

  setTimeout(() => {
    requestAnimationFrame(loop);
  }, 1000 / 24);

}

loop();
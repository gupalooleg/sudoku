module.exports = function solveSudoku(matrix) {
  solve(matrix);
  return matrix;
};

let matrixSize = 9;

function solve(matrix) {
  let emptyCell = getEmptyCell(matrix);
  if (!emptyCell) return true;

  let value;
  for (let i = 0; i < matrixSize; i++) {
    value = i + 1;
    if (isAvailableValueForCell(value, emptyCell, matrix)) {
      matrix[emptyCell.row][emptyCell.col] = value;

      if (solve(matrix)) return true;

      matrix[emptyCell.row][emptyCell.col] = 0;
    }
  }
  return false;
}

function isAvailableValueForCell(value, cell, matrix) {
  for (let row = 0; row < matrixSize; row++) {
    if (matrix[row][cell.col] === value) return false;
  }

  for (let col = 0; col < matrixSize; col++) {
    if (matrix[cell.row][col] === value) return false;
  }

  let blockSize = Math.sqrt(matrixSize);
  let firstBlockRow = Math.floor(cell.row / blockSize) * blockSize;
  let firstBlockCol = Math.floor(cell.col / blockSize) * blockSize;

  for (let row = firstBlockRow; row < firstBlockRow + blockSize; row++) {
    for (let col = firstBlockCol; col < firstBlockCol + blockSize; col++) {
      if (matrix[row][col] === value) return false;
    }
  }

  return true;
}

function getEmptyCell(matrix) {
  for (let row = 0; row < matrixSize; row++) {
    for (let col = 0; col < matrixSize; col++) {
      if (matrix[row][col] === 0) return { row, col };
    }
  }
}

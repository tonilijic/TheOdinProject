//
//
// FAACTORY FUNCTIONS

// cell objects

function Cell() {
  let value = " ";

  const addMark = (player) => {
    // assigning "x" or "o" value to the cell
    value = player.mark;
  };

  const getValue = () => value;

  return {
    addMark,
    getValue,
  };
}

// factory function for creating player objects
function newPlayer(name, mark) {
  return {
    name,
    mark,
  };
}

//
//
// GAMEBOARD - object 1
const GameBoard = (() => {
  let gameboard = [];

  //DOM
  const gridContainer = document.querySelector("#gameboard");
  const winnerModal = document.querySelector("#winnerModal");
  const winnerMessage = document.querySelector("#winnerMessage");
  const closeModal = document.querySelector(".close");

  // Close modal when the user clicks on <span> (x)
  closeModal.onclick = () => {
    winnerModal.style.display = "none";
    resetBoard();
  };

  // Close modal when the user clicks anywhere outside of the modal
  window.onclick = (event) => {
    if (event.target === winnerModal) {
      winnerModal.style.display = "none";
      resetBoard();
    }
  };

  // Named event handler function for click events
  const handleClick = (event) => {
    const row = parseInt(event.target.dataset.row); // i
    const column = parseInt(event.target.dataset.column); // j
    const currentPlayer = GameFlow.getCurrentPlayer();
    GameBoard.dropMark(row, column, currentPlayer);

    const winningCells = GameFlow.checkWin(currentPlayer);
    if (winningCells) {
      console.log(`${currentPlayer.name} wins!`);
      GameFlow.highlightWinningCells(winningCells);
      removeAllEventListeners();
      showWinnerModal(currentPlayer.name);
      //
    } else if (GameBoard.isBoardFull()) {
      console.log("The game is a draw!");
      removeAllEventListeners();
    } else {
      GameFlow.switchPlayerTurn();
      updatePlayerDisplay();
    }

    GameBoard.displayBoard();
  };

  const showWinnerModal = (winnerName) => {
    winnerMessage.textContent = `Congrats ${winnerName}, you won!`;
    winnerModal.style.display = "block";
  };

  const removeAllEventListeners = () => {
    const cells = gridContainer.querySelectorAll(".grid-item");
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleClick);
    });
  };

  // 3x3 grid creation and cell element behavior
  for (let i = 0; i < 3; i++) {
    gameboard[i] = [];
    for (let j = 0; j < 3; j++) {
      gameboard[i].push(Cell());

      // new div element for each cell
      const cellElement = document.createElement("div");
      cellElement.className = "grid-item";
      cellElement.dataset.row = i; // data-row
      cellElement.dataset.column = j; // data-column

      // add event listener with named handler function
      cellElement.addEventListener("click", handleClick);

      // add cell element to the container
      gridContainer.appendChild(cellElement);
    }
  }

  // encapsulation for controlled access without exposing array directly
  const getBoard = () => gameboard;

  // assigning mark to cells
  const dropMark = (row, column, player) => {
    const cell = gameboard[row][column];

    if (cell.getValue() === " ") {
      cell.addMark(player);

      // Update the corresponding cellElement in the DOM
      document.querySelector(
        `[data-row='${row}'][data-column='${column}']`
      ).textContent = player.mark;
      console.log(
        `Player ${player.name} marked cell (${row}, ${column}) with ${player.mark}`
      );
    } else {
      console.log(`${player.name} try another one`);
    }
  };

  const isBoardFull = () => {
    return gameboard.every((row) =>
      row.every((cell) => cell.getValue() !== " ")
    );
  };

  // Resetting the board
  const resetBoard = () => {
    gameboard.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        row[columnIndex] = Cell();
        const cellElement = document.querySelector(
          `[data-row='${rowIndex}'][data-column='${columnIndex}']`
        );
        cellElement.textContent = " "; // Clear the mark
        cellElement.style.backgroundColor = ""; // Reset the background color
        cellElement.addEventListener("click", handleClick);
      });
    });
    GameFlow.switchPlayerTurn();
    updatePlayerDisplay();
    console.log("Board has been reset");
  };

  // board display - debugging
  const displayBoard = () => {
    gameboard.forEach((row) => {
      console.log(row.map((cell) => cell.getValue()).join(" | "));
    });
  };

  return {
    getBoard,
    dropMark,
    isBoardFull,
    resetBoard,
    displayBoard,
  };
})();

//
//
//

// object 3 - game logic
const GameFlow = (() => {
  const player1 = newPlayer("Toni", "x");
  const player2 = newPlayer("Rafaela", "o");

  // player logic
  let currentPlayer = player1;

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  // winning conditions
  const checkWin = (player) => {
    const board = GameBoard.getBoard();
    const mark = player.mark;

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i].every((cell) => cell.getValue() === mark)) {
        return [
          [i, 0],
          [i, 1],
          [i, 2],
        ];
      }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
      if (board.every((row) => row[j].getValue() === mark)) {
        return [
          [0, j],
          [1, j],
          [2, j],
        ];
      }
    }

    // Check diagonals
    if (
      board[0][0].getValue() === mark &&
      board[1][1].getValue() === mark &&
      board[2][2].getValue() === mark
    ) {
      return [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    }

    if (
      board[0][2].getValue() === mark &&
      board[1][1].getValue() === mark &&
      board[2][0].getValue() === mark
    ) {
      return [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }

    return false;
  };

  const highlightWinningCells = (winningCells) => {
    winningCells.forEach(([row, column]) => {
      const cellElement = document.querySelector(
        `[data-row='${row}'][data-column='${column}']`
      );
      cellElement.style.backgroundColor = "lightgreen";
    });
  };

  return {
    switchPlayerTurn,
    getCurrentPlayer,
    checkWin,
    highlightWinningCells,
  };
})();

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", GameBoard.resetBoard);

const updatePlayerDisplay = () => {
  const currentPlayer = GameFlow.getCurrentPlayer();
  const displayPlayer = document.querySelector(".current-player");
  displayPlayer.textContent = `${currentPlayer.name}`;
};

// Initial display
updatePlayerDisplay();

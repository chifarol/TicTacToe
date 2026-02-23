import TicTacToe from "./TicTacToe.js";

class DomGameEngine {
  tictacMenu = null;
  winnerMessage = null;
  gameMessage = null;
  tictacBoard = null;
  player1NameInput = null;
  player2NameInput = null;
  startButton = null;
  ticTacToeApp = null;
  restartButton = null;
  constructor() {
    this.ticTacToeApp = new TicTacToe();
  }
  start() {
    this.tictacMenu = document.querySelector(".tictac-menu");
    this.winnerMessage = document.querySelector(".winner-message");
    this.gameMessage = document.querySelector(".game-message");
    this.tictacBoard = document.querySelector(".tictac-board-container");
    this.player1NameInput = document.getElementById("player1Name");
    this.player2NameInput = document.getElementById("player2Name");
    this.startButton = document.getElementById("start-button");
    this.restartButton = document.getElementById("restart-button");

    if (
      !this.tictacMenu ||
      !this.gameMessage ||
      !this.winnerMessage ||
      !this.tictacBoard ||
      !this.player1NameInput ||
      !this.player2NameInput ||
      !this.restartButton ||
      !this.startButton
    ) {
      throw new Error("Required DOM elements not found");
    }

    this.startButton.addEventListener("click", this.startGame);
    this.restartButton.addEventListener("click", this.restartGame);
  }
  handleCellClick = (cell) => {
    try {
      const currentPlayer = this.ticTacToeApp.handleNextPlay(
        cell.dataset.index,
      );
      cell.textContent = currentPlayer.symbol;
      cell.classList.add("taken");
      this.handleWin(currentPlayer);
    } catch (error) {
      alert(error.message);
    }
  };
  getAllCells = () => {
    return document.querySelectorAll(".tictac-board .cell") || [];
  };
  attachCellClickListeners = () => {
    const allCells = this.getAllCells();
    allCells.forEach((cell) => {
      cell.addEventListener("click", () => this.handleCellClick(cell));
    });
  };
  handleWin = (currentPlayer) => {
    const allCells = this.getAllCells();
    if (this.ticTacToeApp.isWinner(currentPlayer)) {
      this.gameMessage.style.display = "none";
      this.winnerMessage.style.display = "block";
      this.winnerMessage.textContent = `${currentPlayer.name} wins!`;
      allCells.forEach((c) => {
        c.classList.add("taken");
        c.removeEventListener("click", () => {});
      });
      alert(`${currentPlayer.name} wins!`);
    } else {
      const upcomingPlayer = this.ticTacToeApp.nextPlayer();
      this.gameMessage.textContent = `${upcomingPlayer.name} (${upcomingPlayer.symbol})'s turn`;
    }
  };
  startGame = () => {
    const player1Name = this.player1NameInput.value.trim();
    const player2Name = this.player2NameInput.value.trim();
    if (!player1Name || !player2Name) {
      alert("Please enter names for both players.");
      return;
    }
    if (player1Name === player2Name) {
      alert("Player names must be different.");
      return;
    }
    this.ticTacToeApp.setPlayer1Name(player1Name);
    this.ticTacToeApp.setPlayer2Name(player2Name);
    this.tictacMenu.style.display = "none";
    this.tictacBoard.style.display = "grid";
    const nextPlayer = this.ticTacToeApp.nextPlayer();
    this.gameMessage.style.display = "block";
    this.gameMessage.textContent = `${nextPlayer.name} (${nextPlayer.symbol})'s turn`;
    this.attachCellClickListeners();

    //   console.log(player1Name, player2Name);
  };
  restartGame = () => {
    const allCells = this.getAllCells();
    allCells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("taken");
    });
    this.ticTacToeApp.reset();
    this.gameMessage.style.display = "block";
    const nextPlayer = this.ticTacToeApp.nextPlayer();
    this.gameMessage.textContent = `${nextPlayer.name} (${nextPlayer.symbol})'s turn`;
    this.winnerMessage.style.display = "none";
  };
}

try {
  const engine = new DomGameEngine();
  engine.start();
} catch (error) {
  const errMsg = error.message;
  alert(errMsg);
  console.error(errMsg);
}

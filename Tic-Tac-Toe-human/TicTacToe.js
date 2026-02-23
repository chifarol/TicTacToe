class TicTacToe {
  player1 = {
    label: "Player 1",
    name: "",
    symbol: "X",
    moves: [],
  };
  player2 = {
    label: "Player 2",
    name: "",
    symbol: "O",
    moves: [],
  };
  currentPlayer = "";
  winningIndexes = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
  ];
  reset() {
    this.player1.moves = [];
    this.player2.moves = [];
    this.currentPlayer = "";
  }
  isWinner(player) {
    if (player.moves.length < 3) {
      return false;
    }
    const movesSet = new Set(player.moves);
    return this.winningIndexes.some((winArr) => {
      const winArrSet = new Set(winArr);
      if (winArrSet.isSubsetOf(movesSet)) {
        console.log("winner detected", player.name, winArrSet, movesSet);
        return true;
      }
    });
  }
  nextPlayer() {
    if (this.currentPlayer === this.player1.symbol) {
      return this.player2;
    } else {
      return this.player1;
    }
  }
  handleNextPlay(index) {
    // get net player
    const newPlayer = this.nextPlayer();
    if (+index < 1 || +index > 9) {
      const errMsg = "Invalid move. Please select a number between 1 and 9.";
      throw new Error(errMsg);
    }
    if (
      this.player1.moves.includes(index) ||
      this.player2.moves.includes(index)
    ) {
      const errMsg =
        "This cell is already occupied. Please select another cell.";
      throw new Error(errMsg);
    } else {
      newPlayer.moves.push(index);
      this.currentPlayer = newPlayer.symbol;
    }
    return newPlayer;
  }
  setPlayer1Name(name) {
    this.player1.name = name;
  }
  setPlayer2Name(name) {
    this.player2.name = name;
  }
}

export default TicTacToe;

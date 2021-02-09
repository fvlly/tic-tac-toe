const player1 = "X";
const player2 = "O";
const gameBoard = document.querySelector(".container");
let playerPick = ["", "", "", "", "", "", "", "", ""];

const gameStaus = document.querySelector(".game-status");
const restartGame = document.querySelector(".restart");

let player = player1;

//  switching between players
function updatePlayer() {
  player = player === player1 ? player2 : player1;
}

// tracks the games process
let status = "";
const gameStatus = document.querySelector(".game-status");

// inputing values to the board
gameBoard.addEventListener("click", (e) => {
  const { target } = e;

  gameStatus.textContent = "Game in progress";

  if (!inProgress()) {
    updateGameStatus();
    setTimeout(() => {
      restartGame.style.display = "block";
    }, 300);
    return;
  }

  if (target.classList.contains("input-box") && !target.innerHTML) {
    target.innerHTML = player;
    playerPick[target.id] = player;
    console.log(playerPick);
    if (!winner()) {
      updatePlayer();
    }

    console.log(player);
  }
});

// determining the winner
function winner() {
  // winning logic
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //
  for (const sequence of winningCombination) {
    const [a, b, c] = sequence;

    if (
      playerPick[a] &&
      playerPick[a] === playerPick[b] &&
      playerPick[a] === playerPick[c]
    ) {
      return sequence;
    }
  }
  return null;
}

// game in progress
function inProgress() {
  return !winner() && playerPick.includes("");
}

// finding out the game verdict
function updateGameStatus() {
  if (winner()) {
    status = ` Player ${player} WINS!!!`;
    gameStatus.textContent = status;
    return;
  }
  if (!inProgress()) {
    status = `Stalemate, try again `;
    gameStatus.textContent = status;

    return;
  }
}

// restarting a game after game verdict
restartGame.addEventListener("click", () => {
  document
    .querySelectorAll(".input-box")
    .forEach((cell) => (cell.innerHTML = ""));
  playerPick = ["", "", "", "", "", "", "", "", ""];
  winner();
  gameStatus.textContent = "Game is loading";
});

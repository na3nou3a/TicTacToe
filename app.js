// html selections
const oBtn = document.getElementById("o");
const xBtn = document.getElementById("x");
const restartBtn = document.getElementById("restart");
const cells = document.querySelectorAll(".item");
const resultpara = document.getElementById("result");
// players x and o
const xPlayer = {
  values: [],
  symbol: "X",
  name: "xXx"
};

const oPlayer = {
  values: [],
  symbol: "O",
  name: "oOo"
};

let currentPlayer = xPlayer;

const winPossibilities = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// events
// cells
cells.forEach(function (cell) {
  cell.addEventListener("click", handle);
});

// restart btn
restartBtn.addEventListener("click", restart);

// "O" btn
oBtn.addEventListener("click", function () {
  if (currentPlayer === oPlayer) {
    return;
  }
  alterPlayer();
  restart();
});

// "X" btn
xBtn.addEventListener("click", function () {
  if (currentPlayer === xPlayer) {
    return;
  }
  alterPlayer();
  restart();
});

// handle click
function handle() {
  const symbol = currentPlayer.symbol;
  const values = currentPlayer.values;
  values.push(+this.dataset.info);
  this.textContent = symbol;
  this.classList.add("disable");
  this.removeEventListener("click", handle);
  const chekW = checkTheWinner(values);

  if (chekW) {
    endGame(true);
    return;
  } else {
    const length = [...xPlayer.values, ...oPlayer.values].length;
    if (length === 9) {
      endGame(false); // draw
      return;
    }
  }

  alterPlayer();
}

// end game
function endGame(flag) {
  if (flag) {
    resultpara.innerHTML = `The Player "${currentPlayer.name}" Won!`;
  } else {
    resultpara.innerHTML = `Draw!`;
  }
  cells.forEach((cell) => cell.removeEventListener("click", handle));
}

// check winner
function checkTheWinner(arr) {
  return winPossibilities.some((possib) => {
    return possib.every((elm) => {
      return arr.includes(elm);
    });
  });
}

// swap player
function alterPlayer() {
  currentPlayer = currentPlayer === xPlayer ? oPlayer : xPlayer;
  xBtn.classList.toggle("clicked");

  oBtn.classList.toggle("clicked");
}

// restart game
function restart() {
  resultpara.textContent = "";
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("disable");
    cell.addEventListener("click", handle);
  });

  xPlayer.values = [];
  oPlayer.values = [];
}

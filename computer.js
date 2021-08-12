// html selections
const compBtn = document.getElementById("o");
const humBtn = document.getElementById("x");
const restartBtn = document.getElementById("restart");
const cells = document.querySelectorAll(".item");
const resultpara = document.getElementById("result");
// human x and computer o
const human = {
  values: [],
  symbol: "X",
  name: "Human",
};

const computer = {
  values: [],
  symbol: "O",
  name: "Computer",
  cellsValues: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  randomIndex: function () {
    const rn = Math.floor(Math.random() * this.cellsValues.length);
    return this.cellsValues[rn];
  },
};

let currentPlayer = human;

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
  cell.addEventListener("click", handlehumanClick);
});

// restart btn
restartBtn.addEventListener("click", function () {
  currentPlayer = human;
  restart();
});

// computer btn "O"
compBtn.addEventListener("click", function () {
  restart();
  compBtn.classList.add("clicked");
  humBtn.classList.remove("clicked");
  makeComputerClick(null);
});

// "X" btn
humBtn.addEventListener("click", function () {
  restart();
});

function handlehumanClick() {
  currentPlayer = human;
  human.values.push(+this.dataset.info);
  this.textContent = human.symbol;
  this.classList.add("disable");
  this.removeEventListener("click", handlehumanClick);
  const chekWinner = checkTheWinner(human.values);

  if (chekWinner) {
    endGame(true);
    return;
  } else {
    const length = [...human.values, ...computer.values].length;
    if (length === 9) {
      endGame(false); // draw
      return;
    }
  }

  makeComputerClick(this);
}

function makeComputerClick(cell) {
  currentPlayer = computer;

  if (cell) {
    const index1 = computer.cellsValues.indexOf(+cell.dataset.info);
    computer.cellsValues.splice(index1, 1);
  }

  const randomIndex = computer.randomIndex();
  const randomCell = getRandomCell(randomIndex);

  computer.values.push(+randomCell.dataset.info);

  const index2 = computer.cellsValues.indexOf(+randomCell.dataset.info);
  computer.cellsValues.splice(index2, 1);

  randomCell.textContent = computer.symbol;
  randomCell.classList.add("disable");
  randomCell.removeEventListener("click", handlehumanClick);

  const chekWinner = checkTheWinner(computer.values);

  if (chekWinner) {
    endGame(true);
    return;
  } else {
    const length = [...human.values, ...computer.values].length;
    if (length === 9) {
      endGame(false); // draw
      return;
    }
  }
}

function getRandomCell(index) {
  const array = [...cells];
  let randomCell;
  array.forEach(function (cell) {
    if (cell.dataset.info === index.toString()) {
      randomCell = cell;
      return;
    }
  });
  return randomCell;
}

// check winner
function checkTheWinner(arr) {
  return winPossibilities.some((possib) => {
    return possib.every((elm) => {
      return arr.includes(elm);
    });
  });
}

// end game
function endGame(flag) {
  if (flag) {
    resultpara.innerHTML = `The Player "${currentPlayer.name}" Won!`;
  } else {
    resultpara.innerHTML = `Draw!`;
  }
  cells.forEach((cell) => {
    cell.removeEventListener("click", handlehumanClick);
    cell.classList.add("disable");
  });
}

// restart game
function restart() {
  currentPlayer = human;
  compBtn.classList.remove("clicked");
  humBtn.classList.add("clicked");
  humBtn.classList.add("clicked");
  resultpara.textContent = "";
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("disable");
    cell.addEventListener("click", handlehumanClick);
  });

  human.values = [];
  computer.values = [];
  computer.cellsValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

restart();

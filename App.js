
let isCircleTurn = false;




const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll(".cell");

function addClickEventListenerToCell(cell) {
  cell.addEventListener("click", onCellClick);
}

cells.forEach(addClickEventListenerToCell);

function addMarker(clickedCell) {
  if (isCircleTurn) {
    clickedCell.classList.add("o");
    return;
  }

  clickedCell.classList.add("x");
}

function checkIsMarked(cell) {
  const hasClassX = cell.classList.contains("x");
  const hasClassO = cell.classList.contains("o");
  return hasClassX || hasClassO;
}

function hasWon() {
  const currentClass = isCircleTurn ? "o" : "x";

  const hasAtleastOneWinningCombinationMatched = winningCombinations.some(
    (winningCombination) => {
      const didWinningCombinationMatch = winningCombination.every((index) => {
        const cell = cells[index];
        const hasClass = cell.classList.contains(currentClass);
        

        return hasClass;

      });

      return didWinningCombinationMatch;
    }
  );

  return hasAtleastOneWinningCombinationMatched;
}

function isDraw() {
  // Converting NodeList to Array
  const cellsArray = [...cells];

  return cellsArray.every((cell) => {
    return checkIsMarked(cell);
  });
}

function showWinningMessage() {
  if (isCircleTurn) {
    alert('Congratulations! Player2 wins');

    document.getElementById("player2").innerHTML = 'Player2 wins';

    return;
  }

  alert('Congratulations! Player1 wins');
  document.getElementById("player1").innerHTML = 'Player1 wins';
}

function onCellClick(event) {
  const clickedCell = event.currentTarget;
  const isAlreadyClicked = checkIsMarked(clickedCell);

  if (isAlreadyClicked) {
    return;
  }

  addMarker(clickedCell);

  if (hasWon()) {
    setTimeout(showWinningMessage, 500);

    return;
  }

  if (isDraw()) {
    alert("Draw!");
    return;
  }

  isCircleTurn = !isCircleTurn;
}

const restartButton = document.getElementById('resetButton');
restartButton.addEventListener('click', restartGame);

function restartGame() {
  isCircleTurn = false
  cells.forEach(cell => {
    cell.classList.remove('x');
    cell.classList.remove('o');
    cell.removeEventListener('click', onCellClick);
    cell.addEventListener('click', onCellClick, { once: true })

  })

  document.getElementById("player2").innerHTML = 'Player2';
    document.getElementById("player1").innerHTML = 'Player1';


}

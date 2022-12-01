//*Variable
var currentPlayer = "X";
var turn = 1;

var winTiles = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

var oTiles = [];
var xTiles = [];

var displayPlayer = document.getElementsByClassName("display-player");
var displayAnnouncer;

var winFlag = false;

//*Boot Event Listener
function boot() {
  //*Variable
  displayAnnouncer = document.getElementById("announcer");

  //*Tiles
  var tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function () {
      insertElement(this, i);
    });
  }

  //*ResetBtn
  var resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", function () {
    reset();
  });
}

//*FUnctions
function insertElement(tile, tileIndex) {
  let classAdd;
  let classRemove;

  if (tile.innerText == "" && !winFlag) {
    if (turn % 2 == 0) {
      currentPlayer = "O";
      turnPlayer = "X";
      classAdd = "playerO";
      classRemove = "playerX";
      oTiles.push(tileIndex);
    } else {
      currentPlayer = "X";
      turnPlayer = "O";
      classAdd = "playerX";
      classRemove = "playerO";
      xTiles.push(tileIndex);
    }

    ++turn;

    tile.innerText = currentPlayer;
    tile.classList.add(classAdd);
    tile.classList.remove(classRemove);

    WinnerChek();

    displayPlayer[0].innerText = turnPlayer;
    displayPlayer[0].classList.add(classRemove);
    displayPlayer[0].classList.remove(classAdd);
  }
}

function lineChek(nTiles) {
  for (let i = 0; i < winTiles.length; i++) {
    var line = 0;
    for (let j = 0; j < nTiles.length; j++) {
      for (let k = 0; k < 3; k++) {
        if (nTiles[j] == winTiles[i][k]) {
          line++;
        }

        if (line == 3) {
          return true;
        }
      }
    }
  }
}

function WinnerChek() {
  if (lineChek(xTiles)) {
    displayAnnouncer.innerHTML =
      "Player <span class='playerX'> X </span> Woooooooooooooooon";
    displayAnnouncer.classList.remove("hide");
    winFlag = true;
  } else if (lineChek(oTiles)) {
    console.log("owins");
    displayAnnouncer.innerHTML =
      "Player <span class='playerO'> O </span> Woooooooooooooooon";
    displayAnnouncer.classList.remove("hide");
    winFlag = true;
  }
}

function reset() {
  currentPlayer = "X";
  turn = 1;

  oTiles = [];
  xTiles = [];

  displayPlayer.innerText = "X";
  displayAnnouncer.classList.add("hide");

  winFlag = false;

  var tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].innerHTML = "";
  }
}

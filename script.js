let player1;
let player2;
let currentPlayer;
let toggle = false;
let winnerFound = false;

const winners = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameBoard = (() => {
  let gameboard = Array(9).fill(undefined);

  let boxes = document.querySelectorAll(".box");
  const versus = document.querySelector(".versus");

  // determine winner
  const winner = () => {
    for (let i = 0; i < winners.length; i++) {
      let r = winners[i]; //[1,2,3]
      let first = gameBoard.gameboard[r[0]];
      let second = gameBoard.gameboard[r[1]];
      let third = gameBoard.gameboard[r[2]];
      let j = gameBoard.gameboard;

      // if all 3 arent undefined, compare them, if theyre all the same mark, winner based on mark
      if (first && second && third) {
        if (first === second && second === third) {
          boxes.forEach((box) => {
            box.removeEventListener("click", switcher);
          });
          winnerFound = true;
          toggle //declare winner depending on toggle position
            ? (versus.innerText = player2.name + ", wins")
            : (versus.innerText = player1.name + ", wins");
        } else if (winnerFound == false && j.includes(undefined) == false) {
          //if there are no empty spaces left, and a winner still hasnt been found
          winnerFound = false;
          versus.innerText = "tie";
        }
      }
    }
  };

  // used to keep track of currentplayer

  let playerSwapper = () => {
    if (toggle == false) {
      toggle = true;
      return player2;
    }
    toggle = false;
    return player1;
  };

  // references the event.target, which is the box
  function switcher(event) {
    //if currentPlayer's mark is #, remove from array at box.id, replace with 'X'; update display; swap player;.
    switch (currentPlayer.mark) {
      case "X":
        gameBoard.gameboard.splice(event.target.id, 1, "X");
        gameBoard.winner();
        displayController.displayUpdate();
        currentPlayer = playerSwapper();
        event.target.removeEventListener("click", switcher);
        break;
      case "O":
        gameBoard.gameboard.splice(event.target.id, 1, "O");
        gameBoard.winner();
        displayController.displayUpdate();
        currentPlayer = playerSwapper();
        event.target.removeEventListener("click", switcher);
        break;
    }
  }
  //sets up boxes for marking using ^ switcher
  const marker = () => {
    boxes.forEach((box) => {
      box.addEventListener("click", switcher);
    });
  };

  return {
    gameboard,
    marker,
    winner,
  };
})();
//end of IIFE

//reflects status of gameboard array
const displayController = (() => {
  // let gameboard = gameBoard.gameboard; // grab the current gameboard array

  const displayUpdate = () => {
    gameBoard.gameboard.forEach((index, idx) => {
      let box = document.getElementById(idx);
      // for each element in the gameboard, if the array index isn't empty and it doesnt already have a mark, add a mark
      if (!index == "" && !box.hasChildNodes()) {
        let image = document.createElement("img");
        if (index == "X") {
          image.classList.add("marker");
          image.style.width = "100%";
          image.src = "images/x.svg";
          box.appendChild(image);
        } else if (index == "O") {
          image.classList.add("marker");
          image.src = "images/cirque.svg";
          image.style.width = "100%";
          box.appendChild(image);
        }
      }
    });
  };

  return { displayUpdate };
})();

//player factory
const player = (name, mark) => {
  return {
    name,
    mark,
  };
};

//starts the game based on inputs

const gameInitializer = (() => {
  const userName = document.getElementById("user1");
  const displayUserName = document.querySelector(".user-name");
  const opponentName = document.getElementById("opponent");
  const displayOpponentName = document.querySelector(".opponent-name");
  const versus = document.querySelector(".versus");

  const user1Submit = document.getElementById("enterButton");
  const opponentSubmit = document.getElementById("opponentButton");
  const resetButton = document.getElementById("resetButton");
  const userMarkX = document.getElementById("toggle-on");
  const replayButton = document.querySelector(".cta");

  const reboot = () => {
    let markers = document.querySelectorAll(".marker");
    winnerFound = false;
    toggle = false;
    player1 =
      player2 =
      currentPlayer =
      displayOpponentName.innerText =
      displayUserName.innerText =
        "";
    versus.innerText = "VS.";
    markers.forEach((marker) => {
      marker.remove();
    });
    gameBoard.gameboard = Array(9).fill(undefined);
  };

  //create player
  user1Submit.addEventListener("click", function () {
    let name = userName.value;
    userMarkX.checked
      ? (player1 = player(name, "X"))
      : (player1 = player(name, "O"));

    userName.value = "";
    displayUserName.innerText = player1.name + ", " + player1.mark;
  });

  //create opponent, start game
  opponentSubmit.addEventListener("click", function () {
    let name = opponentName.value;
    player1.mark == "X"
      ? (player2 = player(name, "O"))
      : (player2 = player(name, "X"));

    currentPlayer = player1;
    opponentName.value = "";
    displayOpponentName.innerText = player2.name + ", " + player2.mark;
    gameBoard.marker(); // initializes gameboard for marking
    displayController.displayUpdate();
  });

  resetButton.addEventListener("click", reboot);

  replayButton.addEventListener("click", function () {
    let markers = document.querySelectorAll(".marker");
    currentPlayer = player1;
    winnerFound = false;
    toggle = false;
    versus.innerText = "VS";
    markers.forEach((marker) => {
      marker.remove();
    });
    gameBoard.gameboard = Array(9).fill(undefined);
    gameBoard.marker(); // initializes gameboard for marking
    displayController.displayUpdate();
  });
  return {};
})();

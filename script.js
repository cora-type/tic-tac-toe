let player1;
let player2;
let currentPlayer;

const gameBoard = (() => {
  let gameboard = Array(9).fill(undefined);
  let boxes = document.querySelectorAll(".box");

  const marker = () => {
    boxes.forEach((result) => {
      result.addEventListener("click", function _switcher() {
        switch (currentPlayer.mark) {
          case "X":
            gameboard.splice(result.id, 1, "X");
            displayController.displayUpdate();
            currentPlayer = player2;
            this.removeEventListener("click", _switcher);
            break;
          case "O":
            gameboard.splice(result.id, 1, "O");
            displayController.displayUpdate();
            currentPlayer = player1;
            this.removeEventListener("click", _switcher);
            break;
        }
      });
    });
  };
  return {
    gameboard,
    marker,
  };
})();

const displayController = (() => {
  let gameboard = gameBoard.gameboard; // grab the current gameboard array
  const displayUpdate = () => {
    gameboard.forEach((result, idx) => {
      let box = document.getElementById(idx);
      // for each element in the gameboard, if the array index isn't empty and it doesnt already have a mark, add a mark
      if (!result == "" && !box.hasChildNodes()) {
        let image = document.createElement("img");
        if (result == "X") {
          image.style.width = "100px";
          image.src = "images/ex.svg";
          box.appendChild(image);
        } else if (result == "O") {
          image.style.width = "50px";
          image.src = "images/circle.svg";
          image.style.cursor = "default";
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
  const user1Submit = document.getElementById("user1Button");

  const opponentName = document.getElementById("opponent");
  const opponentSubmit = document.getElementById("opponentButton");

  const userMarkX = document.getElementById("toggle-on");

  //create player
  user1Submit.addEventListener("click", function () {
    let name = userName.value;
    if (userMarkX.checked) {
      player1 = player(name, "X");
    } else player1 = player(name, "O");
  });

  //create opponent
  opponentSubmit.addEventListener("click", function () {
    let name = opponentName.value;
    if ((player1.mark = "X")) {
      player2 = player(name, "O");
    } else player2 = player(name, "X");

    currentPlayer = player1;
    gameBoard.marker();
  });

  return {};
})();

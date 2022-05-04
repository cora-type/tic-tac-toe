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
  const winner = (func) => {
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
            box.removeEventListener("click", func);
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
  function playerMarker(event) {
    //if currentPlayer's mark is #, remove from array at box.id, replace with 'X'; update display; swap player;.
    switch (currentPlayer.mark) {
      case "X":
        gameBoard.gameboard.splice(event.target.id, 1, "X");
        gameBoard.winner(playerMarker);
        displayController.displayUpdate();
        currentPlayer = playerSwapper();
        event.target.removeEventListener("click", playerMarker);
        break;
      case "O":
        gameBoard.gameboard.splice(event.target.id, 1, "O");
        gameBoard.winner(playerMarker);
        displayController.displayUpdate();
        currentPlayer = playerSwapper();
        event.target.removeEventListener("click", playerMarker);
        break;
    }
  }

  // references the event.target, which is the box
  function aiMarker(event) {
    //if currentPlayer is the user, mark the grid with user's mark.
    switch (currentPlayer) {
      case player1:
        gameBoard.gameboard.splice(event.target.id, 1, player1.mark);
        gameBoard.winner(aiMarker);
        displayController.displayUpdate();
        currentPlayer = playerSwapper();
        event.target.removeEventListener("click", aiMarker);
        break;
      case player2: // if the currentPlayer is the computer, use minimax to mark?
        // splice the return value from running minimax with the current board & computer as the player
        let bestSpot = computer.minimax(gameBoard.gameboard, computer.aiPlayer);
        console.log(bestSpot.index);
        // gameBoard.gameboard.splice(
        //   event.target.id,
        //   1,
        //   computer.minimax(gameBoard.gameboard, player2.mark)
        // );
        // gameBoard.winner(aiMarker);
        // displayController.displayUpdate();
        // currentPlayer = playerSwapper();
        // event.target.removeEventListener("click", aiMarker);
        break;
    }
  }

  //enables marking on boxes using ^ switcher
  const marker = (func) => {
    boxes.forEach((box) => {
      box.addEventListener("click", func);
    });
  };

  return {
    gameboard,
    marker,
    winner,
    playerMarker,
    aiMarker,
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

  const computerButton = document.querySelector(".computer-button");

  //reboot game
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

  //reset game
  const reset = () => {
    let markers = document.querySelectorAll(".marker");
    currentPlayer = player1;
    winnerFound = false;
    toggle = false;
    versus.innerText = "VS";
    markers.forEach((marker) => {
      marker.remove();
    });
    gameBoard.gameboard = Array(9).fill(undefined);
    gameBoard.marker(gameBoard.playerMarker); // initializes gameboard for marking
    displayController.displayUpdate();
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

  //create opponent, start game against human player
  opponentSubmit.addEventListener("click", function () {
    let name = opponentName.value;
    player1.mark == "X"
      ? (player2 = player(name, "O"))
      : (player2 = player(name, "X"));

    currentPlayer = player1;
    opponentName.value = "";
    displayOpponentName.innerText = player2.name + ", " + player2.mark;
    gameBoard.marker(gameBoard.playerMarker); // initializes gameboard for marking
  });

  computerButton.addEventListener("click", function () {
    userMarkX.checked
      ? (player2 = player("computer", "O"))
      : (player2 = player("computer", "O"));

    currentPlayer = player1;
    computer.huPlayer = player1.mark;
    computer.aiPlayer = player2.mark;

    displayOpponentName.innerText = player2.name + ", " + player2.mark;
    gameBoard.marker(gameBoard.aiMarker);
  });

  resetButton.addEventListener("click", reboot);

  replayButton.addEventListener("click", reset);
  return {};
})();

//AI PLAYER

const computer = (() => {
  //human
  let huPlayer;
  //ai
  let aiPlayer;

  // the main minimax function
  function minimax(newBoard, player) {
    //available spots
    var availSpots = emptyIndexies(newBoard);

    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (winning(newBoard, huPlayer)) {
      return { score: -10 };
    } else if (winning(newBoard, aiPlayer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    // an array to collect all the objects
    var moves = [];

    // loop through available spots
    for (var i = 0; i < availSpots.length; i++) {
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
      move.index = newBoard[availSpots[i]];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == aiPlayer) {
        var result = minimax(newBoard, huPlayer);
        move.score = result.score;
      } else {
        var result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if (player === aiPlayer) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
  }

  // returns the available spots on the board
  function emptyIndexies(board) {
    return board.filter((s) => s == undefined);
  }

  // winning combinations using the board indexies for instace the first win could be 3 xes in a row
  function winning(board, player) {
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }

  return { minimax, huPlayer, aiPlayer, emptyIndexies, winning };
})();

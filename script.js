const gameBoard = (() => {
  let gameboard = ["X", "X", "O", "X", "X", "O", "O", "O", "O"];
  // let gameboardFinal = Array[9];
  return {
    gameboard,
  };
})();

// const player = (name, symbol) => {
//   const sayHello = () => console.log("hello!");
//   return { name, age, sayHello };
// };

const displayController = (() => {
  let currentGame = gameBoard.gameboard; // grab the current gameboard array
  currentGame.forEach((result, idx) => {
    // for each element in the gameboard
    if (!(result == "")) {
      //if the element isnt empty
      let box = document.getElementById(idx); //get the div linked to the current element ID
      let image = document.createElement("img"); //create the tag

      if (result == "X") {
        // if it's an X, put image ex
        image.style.width = "100px";
        image.src = "images/ex.svg";
        box.appendChild(image);
      } else {
        image.style.width = "50px";
        image.src = "images/circle.svg";
        box.appendChild(image);
      }
    }
  });
  return {};
})();

// const displayController = ((player, gameboard) => {
//   let activeSymbol = player.symbol // the current symbol to input
//   let boxes = document.querySelectorAll(".box"); // select all boxes
//   boxes.addEventListener('click', function (){ // add an event listener to all boxes
//     const symbol = document.createElement('svg')
//   })
//   // boxes.forEach((result, idx) => {

//   // });
// })();

// // const jeff = personFactory("jeff", 27);

// const player = (name, symbol) => {
//   const sayHello = () => console.log('hello!');
//   return { name, symbol, sayHello };
// };

// const jeff = player('jeff', 27);

// console.log(jeff.name); // 'jeff'

// jeff.sayHello(); // calls the function and logs 'hello!'

// // window.addEventListener("load", (event) => {
// //   displayController();
// // });

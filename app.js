let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Initializing game variables
let turnO = true; // Tracks current player (true for O, false for X)
let count = 0; // Tracks number of moves made

// Winning patterns for tic tac toe
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Event listeners for each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O's turn
      box.innerText = "O";
      turnO = false;
    } else {
      // Player X's turn
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    // Check for winner after each move
    let isWinner = checkWinner();

    // If no winner and all boxes are filled, it's a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to handle a draw
const gameDraw = () => {
  msg.innerText = `Game Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function to display winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

// Event listeners for reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
"use strict";
//select elements
const score1El = document.querySelector("#score--0");
const score2El = document.querySelector("#score--1");
const currentEl0 = document.querySelector("#current--0");
const currentEl1 = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//start page
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add("hidden");

//final scores.
const scores = [0, 0];
//current value
let currentScore = 0;
//player guess
let activePlayer = 0;

//function for changing player
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//rolling dice button functionality
btnRoll.addEventListener("click", function () {
  //1.generating a random number 1-6
  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  //2.display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `images/dice-${diceNumber}.png`;
  //3.check for rolled 1: if true, switch to next player
  if (diceNumber !== 1) {
    //add dice to current score
    currentScore += diceNumber;
    document.querySelector(
      `#current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    //switched to next player
    switchPlayer();
  }
});

//HOLD BUTTON
btnHold.addEventListener("click", function () {
  //1. add current score to active player's score
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  //2. check if players score is >=100

  if (scores[activePlayer] >= 100) {
    // case true:finish game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    //disabling buttons
    btnRoll.disabled = true;
    btnHold.disabled = true;
    //remove dice from game
    diceEl.classList.add("hidden");
  } else {
    //case false:switch to the next player
    switchPlayer();
  }
});

//new game button reset
btnNew.addEventListener("click", function () {
  //reset players total scores
  score1El.textContent = 0;
  score2El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  //reactive buttons
  btnRoll.disabled = false;
  btnHold.disabled = false;
  //remove winner background
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  //reset current scores
  currentScore = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  activePlayer = 0;
});

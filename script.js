// create element
const cardsContainer = document.querySelector(".cards-container");
const timer = document.querySelector(".main .timer");
const wrong = document.querySelector(".main .wrong");
// create wrong attempts element
let wrongAttempts = 0;
wrong.innerHTML = `wrong Attempts : ${wrongAttempts}`;
// create cards
for (let i = 1; i <= 24; i++) {
  let html = `
  <div class="card">
  <div class="card-inner">
    <img class="img-1" name= "image" src="imgs/back.jpg" alt="" />
    <img class="img-2" src="" alt="" />
  </div>
</div>
  `;
  cardsContainer.innerHTML += html;
}
const backImages = document.querySelectorAll(".img-2");
let msg = document.querySelector(".cards-container div");
const msgB = document.querySelector(".cards-container .won p");

// to get random pics
let numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];
for (let i = 0; i <= 23; i++) {
  let guessedNum = Math.floor(Math.random() * numbers.length);
  backImages[i].src = `imgs/img-${numbers[guessedNum]}.jpg`;
  numbers.splice(guessedNum, 1);
}

const cardInner = document.querySelectorAll(".card-inner");
let div = [];
let checkData = [];

cardsContainer.addEventListener("click", (e) => {
  // won the game
  let wonGame = [];
  cardInner.forEach((card) => {
    if (card.classList.contains("ok")) {
      wonGame.push("true");
      if (wonGame.length === 24) {
        msg.classList.add("msg");
        msgB.innerHTML = "You Won The Game 🎉🎉🎉🎉🎉🎉";
        console.log("won");
      }
    }
  });
  if (e.target.name === "image") {
    if (checkData.length < 2) {
      // flip the card
      e.target.closest(".card-inner").classList.add("flip");
      // store src is check data
      checkData.push(
        e.target.closest(".card-inner").querySelector(".img-2").src
      );
      // store div in div
      div.push(e.target.closest(".card-inner").querySelector(".img-2"));
      // check if the cards are identical
      if (checkData.length === 2) {
        if (checkData[0] === checkData[1]) {
          div[0].closest(".card-inner").style.pointerEvents = "none";
          div[1].closest(".card-inner").style.pointerEvents = "none";
          div[0].closest(".card-inner").classList.add("ok");
          div[1].closest(".card-inner").classList.add("ok");
          // if cards are not identical
        } else {
          setTimeout(() => {
            div[0].closest(".card-inner").classList.remove("flip");
            div[1].closest(".card-inner").classList.remove("flip");
            wrongAttempts++;
            wrong.innerHTML = `wrongAttempts : ${wrongAttempts}`;
            // if wrong attemts equal 10
            if (wrongAttempts === 10) {
              msg.classList.add("msg");
              msgB.innerHTML = "You Lost 😢😢😢😢";
            }
          }, 500);
        }
      }
      if (checkData.length >= 2) {
        cardsContainer.style.pointerEvents = "none";
        setTimeout(() => {
          div = [];
          checkData = [];
          cardsContainer.style.pointerEvents = "auto";
        }, 800);
      }
    }
  }
});

// times function
var sec = 900,
  secpass,
  countDown = setInterval(function () {
    "use strict";
    secpass();
  }, 1000);
function secpass() {
  "use strict";
  var min = Math.floor(sec / 60),
    remSec = sec % 60;
  if (remSec < 10) {
    remSec = "0" + remSec;
  }
  if (min < 10) {
    min = "0" + min;
  }
  timer.innerHTML = min + ":" + remSec;
  if (sec > 0) {
    sec = sec - 1;
  } else {
    clearInterval(countDown);
    msg.classList.add("msg");
    msgB.innerHTML = "You Lost 😢😢😢😢";
    document.getElementById("fail").play();
  }
}

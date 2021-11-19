
            // GETTING THE VALUES FROM HTML

const gameBoardStart = document.querySelector('.drawing-game-board');
const gameBoardStats = document.querySelector('.game-panel-board-end');

const startGameBoard = document.querySelector('.container-game-panel')
const gameBoard = document.querySelector('.container-memory-cards');
const svgThing = document.querySelector('.svg-game-board');
const svgThingEnd = document.querySelector('.svg-game-board-end');

const containerCards = document.querySelector('.container-cards');


const scoreEnd = document.querySelector('#scoreEnd');
const timeEnd = document.querySelector('#timeEnd');
const pointsEnd = document.querySelector('#pointsEnd');

const gridSizeArr = [];
let points = 0;
var counter = 0;

          // Increasing the number of moves FOR DIGIT RABBIT

var digitRabbit = document.querySelector('#nrOfMoves')
let countDigitRabbit = 0;



            //  PART-FIRST - CONDITIONS FOR THE START

// ALLOWING ONLY ONE INPUT IN THE MOMENT - 1
var buttonsGameStart1row = document.querySelectorAll('.button-game-start-1-row')

buttonsGameStart1row.forEach(button =>{
  button.addEventListener('click', () =>{

    const gridSize = button.getAttribute('data-grid-size')

    gridSizeArr.push(gridSize);

    let buttonFilled = document.querySelector('.button-game-start-fill-1-row');
    if (buttonFilled) {
      buttonFilled.classList.remove("button-game-start-fill-1-row")
    }
    button.classList.add("button-game-start-fill-1-row")

  // when calling the start change size of the grid table

    if (gridSizeArr[gridSizeArr.length -1] == 20) {
      containerCards.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr"
    } else {
      containerCards.style.gridTemplateColumns = "1fr 1fr 1fr 1fr"
    }

  })
})


const timeOutArr = [];

           // ALLOWING ONLY ONE INPUT IN THE MOMENT - 2

var buttonsGameStart2row = document.querySelectorAll('.button-game-start-2-row')

buttonsGameStart2row.forEach(button =>{
  button.addEventListener('click', () =>{

    const timeOut = button.getAttribute('data-timeout')

    timeOutArr.push(timeOut);

    let buttonFilled2 = document.querySelector('.button-game-start-fill-2-row');
    if (buttonFilled2) {
      buttonFilled2.classList.remove("button-game-start-fill-2-row")
    }
    button.classList.add("button-game-start-fill-2-row")

  })
})

const timeLimitArr = [];

          // ALLOWING ONLY ONE INPUT IN THE MOMENT - 3

var buttonsGameStart3row = document.querySelectorAll('.button-game-start-3-row')

buttonsGameStart3row.forEach(button =>{
  button.addEventListener('click', () =>{

    const timeLimit = button.getAttribute('data-time-limit')

    timeLimitArr.push(timeLimit)

    let buttonFilled3 = document.querySelector('.button-game-start-fill-3-row');
    if (buttonFilled3) {
      buttonFilled3.classList.remove("button-game-start-fill-3-row")
    }
    button.classList.add("button-game-start-fill-3-row")

  })
})


                      // PART-TWO Initalization of game board

const btnPlayAgain = document.querySelectorAll('.play-btn')


btnPlayAgain.forEach(button => {
  button.addEventListener('click', () => {

    // IF ALL THE SELECTION FROM THE MENU ARE CHOSEN THEN PURSUE OTHERWISE SHOW MESSAGE

if (timeOutArr.length &&  timeLimitArr.length && gridSizeArr.length) {

// setting timer of hourglass

var intervalDisplay = setInterval(timerFunc,1000)

  function  timerFunc() {
  counter ++;
  const hourglassTimer = document.querySelector('#timer');
  hourglassTimer.textContent = counter;

  if (counter == timeLimitArr[timeLimitArr.length-1]) {

  resetGameWhenTimeOver()
    }
  }

function resetGameWhenTimeOver() {

  window.clearInterval(intervalDisplay);

  startGameBoard.classList.remove('display');
  gameBoardStats.classList.remove('display')

  gameBoardStart.classList.add('display')
  gameBoard.classList.add('display')

  scoreEnd.textContent = points + "/" + (gridSizeArr[gridSizeArr.length-1]/2)
  timeEnd.textContent = counter + "s"
  let scoreOfMovesAndPoints = Math.floor(points/countDigitRabbit * 100)
  pointsEnd.textContent = scoreOfMovesAndPoints + "%"

  counter = 0;
  points = 0;
  countDigitRabbit = 0;

         // RESETING THE CARDS OBJECT BEFORE NEW Shuffling

    for (var i = 0; i < CARDS.length; i++) {
      CARDS[i] = copyOBJ[i]
    }

        // RESETING MAIN - GRID TABLE FROM CARDS

    gridTable.innerHTML = "";

}

// end of hourglass timer function


startGameBoard.classList.toggle('display')
svgThing.classList.add('display')
svgThingEnd.classList.add('display')
gameBoard.classList.toggle('display')


// Shuffling function

const shuffling = (arr, numberShuffle) => {
let temp;
let exchangeNr;
for (let i = numberShuffle-1; i >= 0; i--) {
let randomIndex = Math.floor(Math.random() * (i + 1));
temp = arr[i]
arr[i] = arr[randomIndex];
arr[randomIndex] = temp;
}

return arr

}

// Calling function of shuffling
var displayShuffled = shuffling(CARDS,gridSizeArr[gridSizeArr.length-1])

// Creating arrays that holds temporary chosen ID
let cardsChosenArr = [];
let cardsChosenID = [];

// Deleting cards from the gameboard when the cards are matching
function deleteCards() {

  for (var i = 0; i < cardsChosenID.length; i++) {
  cards[cardsChosenID[i]].innerHTML = "";
  }
  points ++;

        // RESETING THE GAME

  if (points/gridSizeArr[gridSizeArr.length-1] == 1/2) {

    startGameBoard.classList.remove('display');
    gameBoardStats.classList.remove('display')

    gameBoardStart.classList.add('display')
    gameBoard.classList.add('display')

    scoreEnd.textContent = points + "/" + (gridSizeArr[gridSizeArr.length-1]/2)
    timeEnd.textContent = counter + "s"
    let scoreOfMovesAndPoints = Math.floor(points/countDigitRabbit * 100)
    pointsEnd.textContent = scoreOfMovesAndPoints + "%"

    counter = 0;
    points = 0;
    countDigitRabbit = 0;

           // RESETING THE CARDS OBJECT BEFORE NEW Shuffling

      for (var i = 0; i < CARDS.length; i++) {
        CARDS[i] = copyOBJ[i]
      }

          // RESETING MAIN - GRID TABLE FROM CARDS

      gridTable.innerHTML = "";

        window.clearInterval(intervalDisplay);

    }
}

// Flipping back if the cards chosen do not match
function flipBack() {
for (var i = 0; i < cardsChosenID.length; i++) {
cards[cardsChosenID[i]].classList.toggle('flip')
}
}

// FLipping the card, getting attributes and calling from here matching cards with timeOut
function flipCard() {
this.classList.toggle('flip')
var cardBackObj = this.querySelector('.card-back')
var cardBackObjId = cardBackObj.getAttribute("data-id");
var cardBackObjName = cardBackObj.getAttribute('data-name');

cardsChosenArr.push(cardBackObjName);
cardsChosenID.push(cardBackObjId)

cards[cardsChosenID[0]].classList.add('card-pointer-event')
var matchingCards = () => {

for (var i = 0; i < cards.length; i++) {
  cards[i].classList.remove('card-pointer-event')
}

if (cardsChosenArr[0] === cardsChosenArr[1]) {
  deleteCards()
} else {
  flipBack()
}



cardsChosenArr = [];
cardsChosenID = [];
}

if (cardsChosenArr.length === 2) {

for (var i = 0; i < cards.length; i++) {
  cards[i].classList.add('card-pointer-event')
}

countDigitRabbit ++;
digitRabbit.textContent = countDigitRabbit;

setTimeout(matchingCards, timeOutArr[timeOutArr.length - 1])

}

}

var iInit = -1;

// Creating dashboard
const gridTable = document.getElementById('grid-table');



// Calling the function of grid table creation
gridTableConstruct(CARDS,gridSizeArr[gridSizeArr.length - 1]);

// When dashboard is created then the cards can be chosen
const cards = document.querySelectorAll('.card');

//Calling function of creating dashboard


function gridTableConstruct(arr,numberOfCards) {

for (var i = 0; i < numberOfCards; i++) {
// card front
let cardFront = document.createElement('div')
cardFront.className = "card-front"

//adding image
var cardImgFront = document.createElement('img')
cardImgFront.src = "/Memory Cards/Images/Karta_Color.svg"
cardFront.appendChild(cardImgFront);

// creating card Div ((MAIN))
let cardsMemory = document.createElement('div')

cardsMemory.appendChild(cardFront)

gridTable.appendChild(cardsMemory).classList = "card";


}


}

cards.forEach(card => {

//Before initialization

iInit++;


// CREATING DIVS WITH CARDS AND SETTING ATTRIBUTES

let cardBack = document.createElement('div')
cardBack.className = "card-back"
cardBack.setAttribute("data-id", iInit)

cardBack.setAttribute("data-name", CARDS[iInit].name)
var cardImgBack = document.createElement('img')

cardImgBack.setAttribute('src', CARDS[iInit].img)

cardBack.appendChild(cardImgBack)

card.appendChild(cardBack);


var cardClick = card.addEventListener('click', flipCard)


// cardClick.removeEventListener

})

} else {
    window.alert("I kindly ask you to choose all the options")
}
})




})


// PART 3 GAME ENDING DISPLAY SCORE


const changeSettings = document.querySelector('#__btn_changeSettings').addEventListener('click', () => {
  gameBoardStats.classList.add('display')
  gameBoardStart.classList.remove('display')

})

CARDS = [
  {name: "penguin",
   img:"/Memory Cards/Images/Penguin.svg"},
   {name: "penguin",
    img:"/Memory Cards/Images/Penguin.svg"},
  {name: "funia",
  img:"/Memory Cards/Images/Kot funia.svg"},
  {name: "funia",
  img:"/Memory Cards/Images/Kot funia.svg"},
  {name: "coolpi",
   img:"/Memory Cards/Images/Cool Pi.svg"},
   {name: "coolpi",
    img:"/Memory Cards/Images/Cool Pi.svg"},
  {name: "hardy",
  img:"/Memory Cards/Images/Rzulwik.svg"},
  {name: "hardy",
  img:"/Memory Cards/Images/Rzulwik.svg"},
  {name: "coco",
   img:"/Memory Cards/Images/johny coco.svg"},
   {name: "coco",
    img:"/Memory Cards/Images/johny coco.svg"},
  {name: "PC",
  img:"/Memory Cards/Images/PC_Icon.svg"},
  {name: "PC",
  img:"/Memory Cards/Images/PC_Icon.svg"},
  {name: "Rock",
  img:"/Memory Cards/Images/Rock.svg"},
  {name: "Rock",
  img:"/Memory Cards/Images/Rock.svg"},
  {name: "Paper",
  img:"/Memory Cards/Images/Paper.svg"},
  {name: "Paper",
  img:"/Memory Cards/Images/Paper.svg"},
  {name: "Scissors",
  img:"/Memory Cards/Images/Scissor.svg"},
  {name: "Scissors",
  img:"/Memory Cards/Images/Scissor.svg"},
  {name: "logo",
  img:"/Memory Cards/Images/Logo RPS.svg"},
  {name: "logo",
  img:"/Memory Cards/Images/Logo RPS.svg"}
];

const copyOBJ = Object.assign({},CARDS)

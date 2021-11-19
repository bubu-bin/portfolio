// FIRST:PHASE

imagesInStart = document.querySelectorAll(".img-in-start")
avatarsSelection = document.querySelector('.container-starter')
var gameBoard = document.querySelector(".container-in-depth-rps");
var userAvatar = document.querySelector(".user");

var detailsSection =  document.querySelector(".flexbox-details");

var descriptionId = document.getElementById("descriptionId");

//Skill 1
var skill1Name = document.getElementById("skill1Name");
var skill1Percent = document.getElementById("skill1Percent");
var topLayerSkilleOne = document.querySelector(".top-layer-skill-1");

//Skill 2
var skill2Name = document.getElementById("skill2Name");
var skill2Percent = document.getElementById("skill2Percent");
var topLayerSkilleTwo = document.querySelector(".top-layer-skill-2");

var playBtn = document.querySelector('#playThisButton')

Avatar = [
  {name: "penguin",
  src:"/RPS/Images/Penguin.svg",
  description:"Isn't he cute? Watch out for him. He may outsmart you quickly and use your flaws against you.",
  skillonename: "Cuteness",
  skillonepercent: "94%",
  skilltwoname:"Cunigness",
  skilltwopercent: "82%"},
  {name: "turtle",
  src:"/RPS/Images/Rzulwik.svg",
  description:"Hardy, hardy, hardy. Good old hardy. Very competitive boy. Never hides under the shell - only when he goes to sleep.",
  skillonename: "Hardness",
  skillonepercent: "55%",
  skilltwoname:"Rivalry",
  skilltwopercent: "79%"},
  {name: "johnycoco",
  src:"/RPS/Images/johny coco.svg",
  description: "Can you see eyes of Johny Coco? He is loco. He tries to find the treasure as he believes buried under the ground.",
  skillonename: "Insanity",
  skillonepercent: "99.99%",
  skilltwoname:"Selfish",
  skilltwopercent: "85%"},
  {name: "coolpi",
  src:"/RPS/Images/Cool Pi.svg",
  description:"Outside - gangster raper. Everyone respects him. Inside vulnerable like a feather. What he does for living? It's not your business.",
  skillonename: "Charisma",
  skillonepercent: "83%",
  skilltwoname:"Patience",
  skilltwopercent: "64%"},
  {name: "kotfunia",
  src:"/RPS/Images/kot Funia.svg",
  description:"Everyone refers to her as a mother. Dreams about blue migdals. Funia is the best!",
  skillonename: "Pride",
  skillonepercent: "100%",
  skilltwoname:"Love",
  skilltwopercent: "100%"}
]

imagesInStart.forEach(image => {

    image.addEventListener('click', () => {

      // image.classList.remove('img-in-start-active');

      const imageCircleName = image.parentElement.textContent;
      console.log(imageCircleName);

      playBtn.style.display = "block";

      const nameStart = document.querySelector('#start-name')
      nameStart.textContent = 'Play as ' + imageCircleName;

      for (var i = 0; i < image.length; i++) {
        console.log(image[i]);
      }
      const currentAvatar = image.dataset.myav;
      const objCurrentAvatar = Avatar.find(findAvatar);

      function  findAvatar(obj) {
        return obj.name === currentAvatar;
      }

      // image.style.transform = "scale(1.2)"



        // if(activeElement) {
        //   activeElement.classList.remove('img-in-start-active');
        // }
        // imageCircle.classList.add('bg-image-circle')
        // image.classList.add('img-in-start-active-1-row');



      playBtn.addEventListener('click', () =>{
        gameBoard.style.display = "flex";
        avatarsSelection.style.display = "none";
        gameBoard.style.opacity = "1";
        userAvatar.style.visibility= "visible";
        userAvatar.src = objCurrentAvatar.src;
        playBtn.style.display = "none"
      })

      descriptionId.textContent = objCurrentAvatar.description;
      skill1Name.textContent = objCurrentAvatar.skillonename;
      skill1Percent.textContent = objCurrentAvatar.skillonepercent;
      topLayerSkilleOne.style.width = objCurrentAvatar.skillonepercent;

      skill2Name.textContent = objCurrentAvatar.skilltwoname;
      skill2Percent.textContent = objCurrentAvatar.skilltwopercent;
      topLayerSkilleTwo.style.width = objCurrentAvatar.skilltwopercent;

      detailsSection.style.display = "flex";
    })
  });



//  SECOND:PHASE

optionsRPS = document.querySelectorAll(".selection");
numberLeftIncrease = document.querySelector(".number-left");
numberRightIncrease = document.querySelector(".number-right");
lifesLeftDecrease = document.querySelector('.lifes-left');
lifesRightDecrease = document.querySelector('.lifes-right');

var myLifes = lifesLeftDecrease.getElementsByTagName('i');
var pcLifes = lifesRightDecrease.getElementsByTagName('i');


var gameBoardEnd = document.querySelector(".container-the-winner");

var playAgainBtn = document.querySelector(".play-again");

RPS = [
  {name: "paper",
  beats: "rock",
  src: "/RPS/Images/Paper.svg"},
  {name: "rock",
  beats: "scissors",
  src:"/RPS/Images/Rock.svg"},
  {name: "scissors",
  beats: "paper",
  src: "/RPS/Images/Scissor.svg"},
];


optionsRPS.forEach(function(element){
  element.addEventListener('click', getName => {

    const currentSelection = element.dataset.selection;

    const objSelection = RPS.find(getObject);

    function getObject(someObj) {
      return someObj.name === currentSelection;
    }

    showSelection(objSelection);
  })

});

  var counterPC = -1;
  var counterUser = 3;

function showSelection(rockPaperScissors){

  // Rules of the game

  const randomComputer = randomSelection();
  let user = rockPaperScissors;
  const theWinnerUser = isWinner(user, randomComputer);
  const theWinnerComputer = isWinner(randomComputer,user);

  //Add images
  let displaySelectionUser = document.querySelector("#image-user-selected");
  displaySelectionUser.src = rockPaperScissors.src;
  displaySelectionUser.style.visibility = "visible";
  let displaySelectionPC = document.querySelector("#image-pc-selected");
  displaySelectionPC.src = randomComputer.src
  displaySelectionPC.style.visibility = "visible";
    // When user wins

  if (theWinnerUser === true) {
    numberRightIncrease.textContent ++;
    counterUser --;
    myLifes[counterUser].style.color = "#D4BCBC";

    // When the PC wins

  } else if (theWinnerComputer === true) {
    numberLeftIncrease.textContent ++;
    counterPC ++;
    pcLifes[counterPC].style.color ="#D4BCBC";
  }

    // Reseting the game

  if (counterPC === 2 || counterUser === 0) {


    optionsRPS.forEach(option => {
      option.disabled = true;
    })
    gameBoard.style.opacity = "0.1";
    gameBoardEnd.style.display = "flex";

    var title = document.getElementById("title-won")

    if (numberLeftIncrease.textContent > numberRightIncrease.textContent) {
      title.textContent = "You won"
    } else {
      title.textContent = "You lost"
    }

    playAgainBtn.addEventListener('click', () => {

      numberLeftIncrease.textContent = 0;
      numberRightIncrease.textContent = 0;

      for (var i = 0; i < pcLifes.length; i++) {
        pcLifes[i].style.color = "#BC0E0E";
        myLifes[i].style.color  = "#BC0E0E";
      }

      counterPC = -1;
      counterUser = 3;

      gameBoard.style.opacity = "1";
      gameBoardEnd.style.display = "none";

      displaySelectionUser.style.visibility = "hidden";
      displaySelectionPC.style.visibility = "hidden";

      optionsRPS.forEach(option => {
        option.disabled = false;
      })
    })

  }
}


function isWinner(oneSymbol, secondSymbol) {
   return oneSymbol.name === secondSymbol.beats
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * RPS.length);
  return RPS[randomIndex];
}

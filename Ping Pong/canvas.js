const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let statusEnter = '';
const breakIntro = document.querySelector(".btn-break-intro");
const intro = document.querySelector('.threed-text-push')
const displayStats = document.querySelector('.display-score')
const repeatGame = document.querySelector('#repeat')


setTimeout(() => {
  canvas.setAttribute('style', "display: block;")
  intro.setAttribute('style', 'display:none')
  displayStats.setAttribute('style', 'display:block;')

},0)

breakIntro.addEventListener('click', () => {
  canvas.setAttribute('style', "display: block;")
  intro.setAttribute('style', 'display:none')
  displayStats.setAttribute('style', 'display:block;')

})

const bgImage = document.querySelector('img')
const playAgain = document.querySelector('.hitenter')

speed = 8;
scorePlayer = document.querySelector('#score-player');
scorePC = document.querySelector("#score-PC");
mySpeed = document.querySelector('#my-speed')

playAgain.innerHTML = "Start"

playAgain.addEventListener('click', () => {

  playAgain.style.display = 'none';
  animate()

})

addScorePC = 0;
addScorePlayer = 0;


const backgroundImg = new Image();
backgroundImg.src = "Images/galaxy_black_2.jpg"

const meteor = new Image();
meteor.src = "Images/asteroid.png"

const alien = new Image()
alien.src = "Images/ufo.png"

const playerImg = new Image()
playerImg.src = "Images/player_ship.png"

// DO FOR RESIZING
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

// GET POSITION OF MOUSE
const mouse = {
  posX: undefined,
  posY: undefined
}

let status = false;

window.addEventListener('mousemove', (e) => {
  status = true;
  mouse.posX = e.x;
  mouse.posY = e.y;

})



// CREATE RECTS

  function Rect(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;



    this.createPaddle = function() {
      if (status === false) {

        this.y = innerHeight/2 - this.height/2

      }
      c.fillRect(this.x,this.y,this.width,this.height)
      c.stroke();

    }


    this.movePaddle = function() {
      c.fillStyle = "#78BFEB"



      this.y = mouse.posY - (this.height / 2)
      this.setPosition()
      this.createPaddle();
    }

    this.movePaddlePC = function() {
      c.fillStyle = "#90C789";
      this.setPosition()
      this.createPaddle();
    }

    this.createLines = () => {
      c.fillStyle = "white"
      c.fillRect((innerWidth/2) - this.width, this.y, this.width, this.height);
      c.stroke()
    }

    this.setPosition = function() {
      if (this.y + this.height > innerHeight) {
        this.y = innerHeight - this.height
      }

      if (this.y < 0) {
        this.y = 0;
      }
    }

  }

// CREATE PADDLE OF PLAYER
  const paddlePlayer = new Rect(60, 100, 4, 80)


// CREATE PADDLE OF PC
  const paddlePC = new Rect(innerWidth - 60, (innerHeight / 2) - (80/2),4,80);


  const linesArr = []

  for (var i = 0; i < innerHeight; i += 50) {



    const lines = new Rect(0,i,4,25);

    linesArr.push(lines)

  }


// CREATE BALL
  function Ball(x,y,dx,dy,radius) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.drawBall = function() {
      // c.fillStyle = "orange";
      c.strokeStyle = "white"
      c.beginPath()
      // c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
      // c.lineWidth = 2;
      c.stroke();
      c.fill()
    }

    this.moveBall = function() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.y > innerHeight - this.radius || this.y < 0) {
          this.dy = -this.dy
      }


      this.drawBall()
    }
  }

const ballRadius = 15;
const speedX = speed
const speedY = 0

const ball = new Ball(innerWidth / 2 - (ballRadius/2), innerHeight / 2 - (ballRadius/2),speedX ,speedY , ballRadius)




function collisionDetection(p,b) {

  b.x > innerWidth / 2 ? p = paddlePC : p = paddlePlayer;
  b.x > innerWidth / 2 ? direction = -1 : direction = 1;
  directionY = b.x > innerWidth /2 ? 1 : -1;


  p.right = p.x + p.width;
  p.top = p.y;
  p.bottom = p.y + p.height
  p.left = p.x
  p.middle = p.y + p.height / 2
  p.middleOfPaddle = p.height / 2

  b.right = b.x + b.radius
  b.left = b.x - b.radius
  b.top = b.y
  b.bottom = b.y

  c.hitPoint =  (b.y - p.middle) / (p.height / 2)
  c.angle =  (Math.PI/4) * c.hitPoint

  // PC PADDLE AI
  paddlePC.y = b.y - p.middleOfPaddle
  // console.log(b.y);

  if (b.left < p.right && b.top > p.top && b.bottom < p.bottom && b.right > p.left) {


    // angle

    operator = directionY > 0 ? Math.ceil : Math.floor;

    b.dx =   operator((b.dx * Math.cos(c.angle)));
    b.dy = directionY * b.dx * Math.sin(c.angle);

    const currentSpeed = b.dx * direction

    speed += 1;

    // INCREMENT SPEED:
    mySpeed.innerHTML = speed



    b.dx = Math.floor(direction * speed)
  }

    // WHEN BALL GOES BEYOND SCOPE
  if (b.x + b.radius < 0 || b.x > innerWidth + b.radius   ) {


    whoWins = directionY > 0 ? scorePlayer : scorePC;
    score = directionY > 0 ? addScorePC += 1 : addScorePlayer += 1
    whoWins.innerHTML = score
    mySpeed.innerHTML = speed;


    b.x = (innerWidth / 2) + b.radius
    b.y = (innerHeight/2) - b.radius
    b.dx = 0;
    b.dy = 0;

    paddlePC.y = innerHeight / 2 - (paddlePC.height / 2)
    repeatGame.style.display = "block";

  } else {
    reset(b,directionY)
  }


}




function reset(ball,d) {


  repeatGame.addEventListener('click', () => {
    statusEnter = true;
    mySpeed.innerHTML= 8;
  })

  if (statusEnter) {
    ball.x = (innerWidth / 2) + ball.radius
    ball.y = (innerHeight/2) - ball.radius
    speed = 8;
    ball.dx = speed * -d;
    ball.dy = 0;

    repeatGame.setAttribute('style', "display:none")

  }

  statusEnter = false;

}

function waitGame() {
  waitBeforeGame = setTimeout(()=>{

  },1000)
}


// draw meteor
function drawSprite(img,sX,sY,sW,sH,dX,dY,dW,dH) {
  c.drawImage(img,sX,sY,sW,sH,dX,dY,dW,dH)
}


// CALL FUNCTION REPLICATION
 const animate = () => {
   c.clearRect(0,0,innerWidth,innerHeight);
   requestAnimationFrame(animate)

   c.drawImage(backgroundImg,0,0,canvas.width, canvas.height)

   for (var i = 0; i < linesArr.length; i++) {
     linesArr[i].createLines()

   }

   paddlePlayer.movePaddle()
   paddlePC.movePaddlePC()
   ball.moveBall();

   drawSprite(meteor,0,0, 500,500, ball.x - ball.radius,ball.y - ball.radius , ball.radius * 2, ball.radius * 2)
   drawSprite(alien,0,0, 500,500, paddlePC.x + 5,paddlePC.y , paddlePC.width + 50 , paddlePC.height + 10)
   drawSprite(playerImg,0,0, 500,500, 0, paddlePlayer.y , paddlePlayer.width + 50, paddlePlayer.height )

   player =  ball.x > innerWidth / 2 ? paddlePC : paddlePlayer
   collisionDetection(player, ball)

 }

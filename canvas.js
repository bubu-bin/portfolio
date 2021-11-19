const canvas = document.querySelector('#canvas');

const context = canvas.getContext('2d')



function Triangle(x,y,dx, color,number) {

  this.x = x;
  this.y = y;
  this.dx = dx;
  this.color = color

  this.drawTriangle = function() {

    const startPoint = 50

    context.beginPath();
    context.moveTo(this.x,this.y);
    context.lineTo(this.x + startPoint*4, this.y);
    context.lineTo(this.x + startPoint*2, this.y - startPoint*3);
    context.closePath();

    // the fill color
    context.fillStyle = this.color
    context.fill();
  }

  this.moveTriangle = function() {
    this.x += this.dx;
    // console.log(innerWidth);
    // console.log(this.x);
    if (this.x  >= innerWidth + 200 * 2 + 50) {
      this.x = -200
    }
    this.drawTriangle()
  }

}

const triangleNr = 15;
const triangleArr = [];
const randomColorArr = ['#ED1C24', '#1B1464','#FCEE21','#F15A24'];

function createTriangles() {
let num = 50
for (var i = 0; i < triangleNr; i++) {

  num +=115
  let randomNumber =Math.random() * (150-100) + 100
  let randomX = Math.floor(Math.random() * (1800));
  let randomY = num
  let randomSpeed = Math.random() * (2-1) +.5
  let randomColor = randomColorArr[Math.floor(Math.random() * randomColorArr.length)]
  // console.log(randomColor);
  const triangle = new Triangle(randomX,randomY,randomSpeed,randomColor)
  triangleArr.push(triangle);
  }


}

createTriangles();





function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < triangleArr.length; i++) {
    triangleArr[i].moveTriangle();
  }

}

animate()

// canvas.style.background = "red"  ;

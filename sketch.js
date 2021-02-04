var backgroundImg
var balloon1;
var balloonImg, balloonImg1, balloonImg2;
var database;
var position;

function preload() {
  backgroundImg = loadImage("images/Hot Air Ballon-01.png");
  balloonImg = loadImage("images/Hot Air Ballon-02.png");
  balloonImg = loadImage("images/Hot Air Ballon-03.png");
  balloonImg1 = loadImage("images/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(1000,500);
  balloon1 = createSprite(400,250);
  balloon1.addImage(balloonImg);

}

function draw() {
  background(backgroundImg);  

  textSize(20);
  fill("black");
  text("Use arrow keys to move the balloon around.", 600,50);

  database = firebase.database();

  var position = database.ref("balloon/height");
  position.on("value",readPosition,showError());

if (keyDown(LEFT_ARROW)){
  balloon1.x = balloon1.x - 10;
}
else if (keyDown(RIGHT_ARROW)){
  balloon1.x = balloon1.x + 10;
}
else if (keyDown(UP_ARROW)){
updateHeight(0,-10);
balloon1.addImage(balloonImg1);
balloon1.scale = balloon1.scale-0.01;
}
else if (keyDown(DOWN_ARROW)){
  balloon1.y = balloon1.y + 10;
}

  drawSprites();
}

function updateHeight(x,y) {
  database.ref("balloon/height").set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data) {
  height = data.val();
  balloon1.x = height.x;
  balloon1.y = height.y;
}
function showError() {
  console.log("Error in writing to the database");
}

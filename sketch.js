var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGrp;
var fireLaserGroup;
var killSound; 
var gameState;
var PLAY = 0;
var END = 1;
var kills, killsImg, killSprite;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg")
  killSound = loadSound("salamisound-2143675-sfx-explosion-hit-2.mp3");
  killsImg = loadImage("Screenshot (342).png");
}

function setup() {

  gameState = PLAY;

  stroke("white");
    textSize(45);
    text("hiiiii",1190,50);


  kills = 0;
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
killSprite = createSprite(1170,50,10,10);
killSprite.addImage(killsImg);
killSprite.scale = 0.4;

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   //player.debug = true
   player.setCollider("rectangle",0,0,300,300);

  zombie1Grp = createGroup();
  zombie2Grp = createGroup();
  zombie3Grp = createGroup();
  fireLaserGroup = createGroup();
}

function draw() {
  background(0); 

  console.log(kills);

  if(gameState === PLAY){

    stroke("white");
    textSize(45);
    text("hiiiii",1190,50);

if(keyDown("Space")){
  fire();
  
}

if(fireLaserGroup.isTouching(zombie1Grp)){
  killSound.play();
  zombie1Grp.destroyEach();
  fireLaserGroup.destroyEach();
  kills = kills + 1;
}

if(fireLaserGroup.isTouching(zombie2Grp)){
  killSound.play();
  zombie2Grp.destroyEach();
  fireLaserGroup.destroyEach();
  kills = kills + 1;
}

if(fireLaserGroup.isTouching(zombie3Grp)){
  killSound.play();
  zombie3Grp.destroyEach();
  fireLaserGroup.destroyEach();
  kills = kills + 1;
}


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
drawSprites();

createZombie1();
createZombie2();
createZombie3();     

  }

}

function createZombie1(){

  if(frameCount % 50===0){

    zombie1 = createSprite(1070,100);
    zombie1.addImage(zombieImg);
    zombie1.scale = 0.15;
    zombie1.velocityX = -4;
    zombie1Grp.add(zombie1);

  }
}

function createZombie2(){

  if(frameCount % 50===0){

    zombie2 = createSprite(1070,300);
    zombie2.addImage(zombieImg);
    zombie2.scale = 0.15;
    zombie2.velocityX = -4;
    zombie2Grp.add(zombie2);
  }
}

function createZombie3(){

  if(frameCount % 50===0){

    zombie3 = createSprite(1070,500);
    zombie3.addImage(zombieImg);
    zombie3.scale = 0.15;
    zombie3.velocityX = -4;
    zombie3Grp.add(zombie3);
  }
}

function fire(){
  fireLaser =createSprite(player.x +110,player.y-24,100,4);
  fireLaser.shapeColor = "red";
  fireLaser.velocityX = 4;
  fireLaser.lifetime = 100;
  fireLaserGroup.add(fireLaser);
}


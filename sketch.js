
var monkey , monkey_running;
var ground, groundImage, inviG;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground, groundImage;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 groundImage = loadImage("20736275.jpg");
}



function setup() {
  
  createCanvas(700,600);
  
ground = createSprite(500,400,10,10);
 
inviG = createSprite(350,600,800,100);  

  

  monkey = createSprite(200,300,20,20);
 monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.2;
  
  foodGroup = createGroup();
obstacleGroup = createGroup();
}


function draw() {
background ("white");
   if(ground.x <200){
  ground.x = 500;
   }
  ground.addImage(groundImage); 
ground.velocityX = -10;
 
inviG.visible = false;
  
  
  monkey.debug = true;
  
  
monkey.collide(inviG);
    if(keyDown("space")&& monkey.y > 460) {
        monkey.velocityY = -20;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnObstacles();
  bNa();
  scoring();
 
  monkey.depth = monkey.depth+1;
 drawSprites();
  
  stroke("black");
  textSize(20);
  text("Score:"+score,50,560);
}

function spawnObstacles(){
if(frameCount%300 === 0){
  obstacle = createSprite(800,525,50,50);
  obstacle.velocityX = -10;
  obstacle.debug = true;
  obstacle.setCollider("circle",0,0,150);
  obstacle.addImage("obstcle", obstacleImage);
  obstacle.scale = 0.3;
  obstacleGroup.add(obstacle);
  obstacle.lifetime = 200;
}
}

function bNa(){
 
  if(frameCount%80 === 0){
  
    banana = createSprite(800,400,10,10);
    banana.velocityX = -10;
    banana.addImage("banana",bananaImage);
    banana.scale = 0.15;
    banana.y = random(200,500);
    foodGroup.add(banana);
    banana.lifetime = 200;
  }
  
}

function scoring(){

  if(foodGroup.isTouching(monkey))
  {score = score+1;
   foodGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
  score = 0;
  }
}

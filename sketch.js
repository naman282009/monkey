
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX =-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();


  
}


function draw() {
  background(280);
  
  
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }

  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
    
  
  if(obstacleGroup.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
    
    
  }
  
  food();
  obstacle();
  
  drawSprites();
  
  var survivalTime=0
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime =Math.ceil(frameCount/frameRate())
  text("survival Time: "+ survivalTime, 450,50);
  
  
  
}

function food(){
  if (frameCount % 80 === 0){
   var banana = createSprite(600,165,10,40);
   banana.addAnimation("banana",bananaImage);
   banana.scale= 0.1;
    banana.velocityX = -3;
  
    banana.y = Math.round(random(120,200));
    
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
    
}

}

function obstacle(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(400,330,10,40);
   obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale =0.1;
    obstacle.velocityX = -3;
     obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
  }
}


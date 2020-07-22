var trex,trex_running;

var PLAY=1;
var END=0;
var gamestate=PLAY;

var grnd,grndimage;

var invisible;

var cloudimg;

var o1, o2,o3,o4,o5,o6;

var cloudgrp;

var restart,r1,end,e1;

var trexcollided;

var score=1;

var die,jump,check;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  grndimage=loadImage("ground2.png");
  cloudimg=loadImage("cloud.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  restart=loadImage("restart.png");
  end=loadImage("gameOver.png");
  trexcollided=loadAnimation("trex_collided.png");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
  check=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600,200)
  grnd=createSprite(45,170);
  grnd.addImage(grndimage);
  trex=createSprite(50,170);
  trex.addAnimation("run",trex_running);
  trex.scale=0.5; 
  trex.debug=true;
  
  invisible=createSprite(45,175,1200,5)
  invisible.visible=false;
  if(grnd.x<30)
      grnd.x=45;  
  cloudgrp=new Group();
  obstaclegrp= new Group(); 
  e1=createSprite(280,50);
  e1.addImage(end);
  e1.scale=0.7;
  e1.visible=false;
  r1=createSprite(270,100);
  r1.addImage(restart);
  r1.scale=0.7
  r1.visible=false;
  trex.addAnimation("collide",trexcollided)
  
}

function draw() {
  background(180);
  drawSprites();
  text(mouseX+","+mouseY,10,10);
  //console.log(trex.y);
  text(score,523,22)
  if (gamestate===PLAY){
    grnd.velocityX=-(6+(score/100));
    if(grnd.x<30)
      grnd.x=45;  
    spawnClouds();
    if(score%100===0)
      checkPoint.play();
    if(keyDown("space")&&trex.y>149) {
      jump.play();
      trex.velocityY=-8 ;}
    trex.velocityY=trex.velocityY +0.5;
    obstacle();
    if(frameCount%5===0)
      score=score+1;
    if (obstaclegrp.isTouching(trex)){
      die.play();
      gamestate=END;}
  }
  else{
    grnd.velocityX=0;
    trex.velocityY=0;
    obstaclegrp.setVelocityXEach(0);
    cloudgrp.setVelocityXEach(0);
    obstaclegrp.setLifetimeEach(-1);
    cloudgrp.setLifetimeEach(-1);
    e1.visible=true;
    r1.visible=true;
    trex.changeAnimation("collide",trexcollided)
    if(mousePressedOver(r1))
      reset();
     
  }
  trex.collide(invisible);
}

function spawnClouds(){
  var h= Math.round(random(1,70));
  if(frameCount%50===0){
  var cloud=createSprite(600,h);
    cloud.addImage(cloudimg);
   cloud.velocityX=-4;
    cloud.lifetime=200;
    cloudgrp.add(cloud); 
  }}
  
function obstacle(){
   var h1= Math.round(random(1,6));
  if(frameCount%70===0){
  var obstacle=createSprite(600,160);
   switch(h1){
     case 1: obstacle.addImage(o1);
       break;
     case 2: obstacle.addImage(o2);
       break;
     case 3: obstacle.addImage(o3);
       break;
     case 4: obstacle.addImage(o4);
       break;
      case 5: obstacle.addImage(o5);
       break;
      case 6: obstacle.addImage(o6);
       break;
       default:
       break;
   }  
    obstacle.scale=0.4;
   obstacle.velocityX=-(6+(score/100));
    obstacle.lifetime=200;
    obstaclegrp.add(obstacle);
    
    
}}
  
function reset(){
  gamestate=PLAY;
  e1.visible=false;
  r1.visible=false;
  trex.changeAnimation("run",trex_running);
  obstaclegrp.destroyEach();
  cloudgrp.destroyEach();
  score=0;
}

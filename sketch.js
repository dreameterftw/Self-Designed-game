//const Engine = Matter.Engine;
//const World= Matter.World;
//const Bodies = Matter.Bodies;
//const Constraint = Matter.Constraint;
//const Render = Matter.Render;

//var engine, world;

var enemy;
var backgroundImg;
var gameState = "instruction";
var PLAY = 1;
var END = 0;
var score = 0;
var asteroids;

/*
var render=Render.create({
   element:document.body,
   engine:engine,
   options:{
       width:1200,
       height:600,
       wireframes:false
   }

})*/

function preload() {
 backgroundImg=loadImage ("sprites/Space bg.png");
 spaceshipimage=loadImage ("sprites/SpaceShip2.png");
 enemyimage=loadImage ("sprites/enemy.png")
 explosionimage= loadImage ("sprites/explosion.png");
 explosionsound= loadSound ("Explosion+1.mp3");
 winimage= loadImage ("sprites/1605952873949.png");
 asteroidimg =loadImage  ("sprites/asteroid.png");
 gameoverimg = loadImage ("sprites/gameover.png")
 gameStartsound = loadSound ("Short_triumphal_fanfare-John_Stracke-815794903.mp3") 
}

function setup(){
    var canvas = createCanvas(1800,1000);
    //engine = Engine.create();
    
    //world = engine.world;

    backgroundSprite=createSprite(600,300,10,10);
    backgroundSprite.addImage (backgroundImg);
    backgroundSprite.velocityY=5;

    //spaceship = new SpaceShip ();

  //enemySpaceship = new Enemy ();

    spaceship=createSprite (400,900,10,10);
    spaceship.addImage (spaceshipimage);
    spaceship.scale=0.5;

    laserGroup = createGroup();
    enemyGroup = createGroup();
    asteroidGroup = createGroup();


}

function draw(){

    if (gameState=="instruction"){

        background("cyan");
        fill ("black");
        textSize (50);
        text ("Space Fight", displayWidth/2-140,50);
        textSize (20);
        text ("Game Rules :", displayWidth/2-200,150);
        text ("1. Press SPACE to shoot", displayWidth/2-200 , 220);
        text ("2. Destroy the enemies", displayWidth/2-200,270);
        text ("3. Use the MOUSE to move YOUR spaceship ", displayWidth/2-200, 320);
        text ("4. Stay away from the ASTEROIDS", displayWidth/2-200, 370);
        text ("5. Score 50 to WIN", displayWidth/2-200, 420);
        text ("6. If the enemies or the asteroids hit you, GAME OVER", displayWidth/2-200, 470);
        textSize (40);
        text (" PRESS ENTER TO START ", displayWidth/3+90,550);

        if (keyDown("enter")) {
            gameState = PLAY;
        }

        //gameStartsound.play();
    }

    if (gameState==PLAY) {

    
     background("darkblue");

     //Engine.update(engine);
     //Render.run(render);

     if (backgroundSprite.y>600){
         backgroundSprite.y=500;
     }

       if(keyDown("space")) {
           lasers();
       }
      
     if(laserGroup.isTouching(enemyGroup)) {
         enemy.addImage (explosionimage);
         explosionsound.play();
         enemyGroup.setLifetimeEach(5);
         laserGroup.destroyEach();
         enemyGroup.setVelocityYEach(0);
         score = score + 5;
     }

     if(laserGroup.isTouching(asteroidGroup)) {
        asteroids.addImage (explosionimage);
        explosionsound.play();
        asteroidGroup.setLifetimeEach(5);
        laserGroup.destroyEach();
        asteroidGroup.setVelocityYEach(0);
        
    }

     if(enemyGroup.isTouching(spaceship)) {
        gameState = END;
         score = score - 7;
     }


     if(asteroidGroup.isTouching(spaceship)) {
        score = score - 5;
        gameState = END;
     }

     if (score < -15 ) {
        gameState = END;
      
     }

     if (score >= 50) {
         spaceship.x=width/2;
         spaceship.y=height/2;
         spaceship.addImage(winimage);
         enemyGroup.destroyEach();
         laserGroup.destroyEach();
     }
        
     if(gameState== END) {
         enemyGroup.destroyEach();
         spaceship.scale=2;
         laserGroup.destroyEach();
         asteroidGroup.destroyEach();
         spaceship.addImage(gameoverimg);
         spaceship.x=width/2;
         spaceship.y=height/2;
         //spaceship.velocityX=0;
         //spaceship.velocityY=0;
     }

     spaceship.x=mouseX;

     spawnEnemies();

     spawnAsteroids();

     drawSprites();

     textSize (20);
     fill ("white");
     text ("score :" + score, width-200, 30);
     
    }
}

function spawnEnemies () {
    if(frameCount % 100 ==0) {
        enemy=createSprite (random(100,1700),0,10,10);
    enemy.addImage (enemyimage);
    enemy.velocityY=5;
    enemy.scale=0.3;

    enemyGroup.add(enemy);
    }
}

function lasers () {
    var laser = createSprite(spaceship.x,900,5,30);
    laser.velocityY=-8;
    laser.shapeColor = "red";
    laserGroup.add(laser);
}

function spawnAsteroids () {
    if(frameCount % 150 ==0) {
        asteroids = createSprite (random(200,1600),0,10,10);
        asteroids.addImage (asteroidimg);
        asteroids.velocityY=8;
        asteroids.scale = 0.2;
        asteroidGroup.add(asteroids);
    }
}
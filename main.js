class Player{
    constructor(x, y, width, height){ // , image
        this.x = x;
        this.y = y;
        this.prevX = x;
        this.prevY = y;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.9; 
    }
}

class Mob{
    constructor(x, y, width, height, fromX, toX, smer){ // mby mob  type
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fromX = fromX;
        this.toX = toX;
        this.smer = smer;
        this.speedX = 3;
    }
}

class Platform{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Coin{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
    }
}

class Star{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
    }
}

class Sound{
    constructor(source){
        this.sound = document.createElement("audio");
        this.sound.src = source;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);

        this.play = function(){
            this.sound.play();
        }
        
        this.stop = function(){
            this.sound.pause();
        }
    }
    
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

let canvas;
let ctx;

// player
let player;

const playerImg = new Image();
playerImg.src = 'images/IdleRight (1).png';

let playerRight = [];
playerRight.length = 15;
    for(let i = 0; i < playerRight.length; i++){
        playerRight[i] = new Image();
        playerRight[i].src = 'images/RunRight (' + (i+1).toString() + ').png';
    }

let playerLeft = [];
    playerLeft.length = 15;
    for(let i = 0; i < playerLeft.length; i++){
        playerLeft[i] = new Image();
        playerLeft[i].src = 'images/RunLeft (' + (i+1).toString() + ').png';
}

let playerIdleR = [];
    playerIdleR.length = 15;
    for(let i = 0; i < playerIdleR.length; i++){
        playerIdleR[i] = new Image();
        playerIdleR[i].src = 'images/IdleRight (' + (i+1).toString() + ').png';
}

let playerIdleL = [];
    playerIdleL.length = 15;
    for(let i = 0; i < playerIdleL.length; i++){
        playerIdleL[i] = new Image();
        playerIdleL[i].src = 'images/IdleLeft (' + (i+1).toString() + ').png';
}


let playerDirection = 2; 

let onGround = 0;
let onCeiling = 0;


// health
let health = 3;

const health1Img = new Image();
health1Img.src = 'images/heart.png';

const health2Img = new Image();
health2Img.src = 'images/2hearts.png';

const health3Img = new Image();
health3Img.src = 'images/3hearts.png';

let currentHealthImg = health3Img;

/*const ozadjeImg = new Image();
ozadjeImg.src = 'background.png'; */


// mobs
let mob = [];
const mobImg = new Image();
mobImg.src = 'images/mobLeft.png';

let whichMob;

// platforms
let platforms = [];
const platformImg = new Image();
platformImg.src = 'images/platform.png';

// coins
let coins = [];
let coinImg = new Image();
coinImg.src = 'images/coin.png';

let collectedCoins = 0;
let whichCoin;

// stars
let stars = [];
const starImg = new Image();
starImg.src = 'images/star.png';

let collectedStars = 0;
let whichStar;


function keyDown(event){

    if(event.keyCode == '38' && onGround == 1){  
        player.speedY = -14;
        onGround = 0;
    }

    if(event.keyCode == '37'){
        player.speedX = -8;
        playerDirection = 1;
    }
   
    if(event.keyCode == '39'){
        player.speedX = 8;
        playerDirection = 2;
    }
}

function keyUp(event){
    if(event.keyCode == '37'){
        player.speedX = 0;
    }

    if(event.keyCode == '39'){
        player.speedX = 0;
    }
}


function drawCanvas(){

    canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 600;
    //canvas.style.border = "solid black 1px";
    //canvas.style.backgroundColor = "lightgreen"; 
    canvas.style.marginLeft = "510px";
    canvas.style.marginTop = "100px";
    // canvas.style.marginRight = "auto";
    // canvas.style.background = ozadjeImg;
    document.body.appendChild(canvas);    
    ctx = canvas.getContext("2d");
}

let playerICR = 0;
let playerICL = 0;

let playerICIdleR = 0;
let playerICIdleL = 0;

let running = false;


function drawPlayer(){

  if(playerDirection == 2){  // laufa desno
            if(running == true){
                if(epic == 2){
                    playerImg.src = playerRight[playerICR].src;
             
                    playerICR += 1;

                    if(playerICR == 15){
                        playerICR = 0;
                    }

                    epic = 0;
                }

                ctx.beginPath();
                ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }
            else{
                if(epic == 2){
                    playerImg.src = playerIdleR[playerICIdleR].src;
            
                    playerICIdleR += 1;
            
                    if(playerICIdleR == 15){
                        playerICIdleR = 0;
                    }
            
                    epic = 0;
                }
            
                ctx.beginPath();
                ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }
  }
  else if(playerDirection == 1){
    if(running == true){
        if(epic == 2){
            playerImg.src = playerLeft[playerICL].src;

            playerICL += 1;

            if(playerICL == 15){
                playerICL = 0;
            }

            epic = 0;
        }

        ctx.beginPath();
        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }
    else{
    
            if(epic == 2){
            playerImg.src = playerIdleL[playerICIdleL].src;

            playerICIdleL += 1;

            if(playerICIdleL == 15){
                playerICIdleL = 0;
            }

            epic = 0;
            }

    ctx.beginPath();
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }
  }
  
}


function drawMobs(){
    for(let i = 0; i < mob.length; i++){
        ctx.beginPath();
        if(mob[i].smer == 1)
             mobImg.src = 'images/mobLeft.png';
        else
             mobImg.src = 'images/mobRight.png';
        ctx.drawImage(mobImg, mob[i].x, mob[i].y, mob[i].width, mob[i].height);
    } 
}


function drawPlatforms(){

    for(let i = 0; i < platforms.length; i++){
        ctx.beginPath();
        ctx.drawImage(platformImg, platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}


function drawHealth(){

    ctx.clearRect(10, 10, 120, 50);

    if(health == 3){   // height = 30, widht = 90
        healthbarhWidth = 90;
        healthbarHeight = 30;
    }
    else if(health == 2){
        currentHealthImg = health2Img;
        healthbarhWidth = 58;
        healthbarHeight = 30;
    }
    else if(health == 1){
        currentHealthImg = health1Img;
        healthbarhWidth = 26;
        healthbarHeight = 30; // height = 30, widht = 30
    }

    ctx.drawImage(currentHealthImg, 10, 10, healthbarhWidth, healthbarHeight);
}

 
function drawCoins(){
    for(let i = 0; i < coins.length; i++){
        ctx.beginPath();
        ctx.drawImage(coinImg, coins[i].x, coins[i].y, coins[i].width, coins[i].height);
    } 
}


function drawStars(){
    for(let i = 0; i < stars.length; i++){
        ctx.beginPath();
        ctx.drawImage(starImg, stars[i].x, stars[i].y, stars[i].width, stars[i].height);
    } 
}


function draw(){ 
    drawCanvas();
    drawPlayer();
    drawPlatforms();
    drawMobs();
    drawHealth();
    drawCoins();
    drawStars();
}

let stop = 0;

function playerMove(){
    
    player.x += player.speedX;

    startFall();
    
    let check = checkCollision();
   
    for(let i = 0; i < check.length; i++){

        // desno
        if(player.prevX + player.width <= check[i].x){
            player.x = check[i].x - player.width;
        }

        // levo
        else if(player.prevX >= check[i].x + check[i].width){
            player.x = check[i].x + check[i].width;
        }

        // zgoraj
        else if(player.prevY >= check[i].y + check[i].height){
            player.speedY = 0;
            player.y = check[i].y + check[i].height;
        } 

        // spodaj
        else if(player.prevY + player.height <= check[i].y){   
            player.y = check[i].y - player.height;
            stopFall();
            onGround = 1;         
        }
        else{
            startFall();
        }
    }

    if(check.length == 0)
        onGround = 0;

    if(player.x <= 0){
        player.x = 1;
    }

    if(starsToPick != collectedStars && (player.x + player.width >= canvas.width)){
        player.x = canvas.width - player.width;
    }


    player.prevX = player.x;
    player.prevY = player.y;

    drawPlayer();
}

function mobMove(){

    for(let i = 0; i < mob.length; i++){

    if(mob[i].fromX > mob[i].toX){
        save = mob[i].fromX;
        mob[i].fromX = mob[i].toX;
        mob[i].toX = save;
    }

    if(mob[i].x <= mob[i].toX && mob[i].smer == 0){
        mobImg.src = 'images/mobRight.png';
        mob[i].x += mob[i].speedX;
    }else{
        mob[i].smer = 1;
    }
     
    if(mob[i].x >= mob[i].fromX && mob[i].smer == 1){
        mobImg.src = 'images/mobLeft.png';
        mob[i].x -= mob[i].speedX;
    }
    else{
        mob[i].smer = 0;
    }

}
    
}

function checkCollision(){
    
    let collidingItems = [];

    for(let i = 0; i < platforms.length; i++){
        if(player.y + player.height > platforms[i].y && player.y < platforms[i].y + platforms[i].height && player.x + player.width > platforms[i].x && player.x < platforms[i].x + platforms[i].width){
            collidingItems.push(platforms[i]);
        }
    }

    return collidingItems;
}

function checkMobCollision(){

    for(let i = 0; i < mob.length; i++){
        if(player.y + player.height > mob[i].y && player.y < mob[i].y + mob[i].height && player.x + player.width > mob[i].x && player.x < mob[i].x + mob[i].width){
            whichMob = i;
            return true;
        }
    }
}

function checkCoinCollision(){
    for(let i = 0; i < coins.length; i++){
        if(player.y + player.height > coins[i].y && player.y < coins[i].y + coins[i].height && player.x + player.width > coins[i].x && player.x < coins[i].x + coins[i].width){
            whichCoin = i;
            return true;
        }
    }
}

function checkStarCollision(){
    for(let i = 0; i < stars.length; i++){
        if(player.y + player.height > stars[i].y && player.y < stars[i].y + stars[i].height && player.x + player.width > stars[i].x && player.x < stars[i].x + stars[i].width){
            whichStar = i;
            return true;
        }
    }
}

function startFall(){
    player.speedY += player.gravity;
    player.y += player.speedY;
}

function stopFall(){
    player.speedY = 0;
    player.y += player.speedY;
}


function nextLevel(){

    let msg;

    if(starsToPick - collectedStars == 1)
      msg = "You have to collect " + (starsToPick - collectedStars) + " more star to continue.";
    else
      msg = "You have to collect " + (starsToPick - collectedStars) + " more stars to continue.";    

    if(player.x + player.width >= canvas.width){
        if(collectedStars == starsToPick){
             return true;
        }
        else{
            
            ctx.fillStyle = "white";
            ctx.fillText(msg, 170, 35);

            setTimeout(function(){
                ctx.clearRect(160, 10, 600, 38);
            }, 3000);

            player.x = player.x - 1;

            return false;
        }
    
    }
}


function voidFall(){
    if(player.y > canvas.height){
        return true;
    }
}

function updateCoins(){
    if(checkCoinCollision() == true){
        coinCollect.stop();
        coinCollect.play();
        ctx.beginPath();
        ctx.clearRect(coins[whichCoin].x, coins[whichCoin].y, coins[whichCoin].width, coins[whichCoin].height);
        coins.splice(whichCoin, 1);
        collectedCoins += 1;
    }

    ctx.clearRect(canvas.width - 100, 15, 18, 30);

    ctx.fillStyle = "white";
    ctx.fillText(collectedCoins, canvas.width - 100, 40);
    ctx.fillText("x", canvas.width - 80, 37);
    ctx.drawImage(coinImg,  canvas.width - 60, 15, 25, 25);
   
    drawCoins();
}

function updateStars(){
    if(checkStarCollision() == true){
        starCollect.play();
        ctx.beginPath();
        ctx.clearRect(stars[whichStar].x, stars[whichStar].y, stars[whichStar].width, stars[whichStar].height);
        stars.splice(whichStar, 1);
        collectedStars += 1;
    }

    ctx.clearRect(canvas.width - 110, 57, 18, 25);

    ctx.fillStyle = "white";
    ctx.fillText(collectedStars, canvas.width - 110, 80);
    ctx.fillText("/"+starsToPick, canvas.width - 90, 80);
    ctx.drawImage(starImg,  canvas.width - 60, 50, 30, 30);

    drawStars();
}


let epic = 0;


function update(){

    if(konec == false){

    requestAnimationFrame(update);

    if(player.speedX != 0)
        running = true;
    else
        running = false;

    if(health > 0){

    if(nextLevel() == true){
        level += 1;
        player.x = 1;
        player.y = 100;
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loadLevel();
        drawPlatforms();
        drawStars();
    }


    if(voidFall() == true){
        player.x = 10;
        player.y = 300;
        health -= 1;
    }


    ctx.beginPath();
    ctx.clearRect(player.x, player.y, player.width, player.height);
    playerMove();

    if(checkMobCollision() == true){
        ctx.beginPath();
        ctx.clearRect(mob[whichMob].x, mob[whichMob].y, mob[whichMob].width, mob[whichMob].height);
        mob.splice(whichMob, 1);
        health -= 1;
    }


    if(mob.length > 0){
        for(let i = 0; i < mob.length; i++){
            ctx.beginPath();
            ctx.clearRect(mob[i].x, mob[i].y, mob[i].width, mob[i].height);
        } 

        mobMove();
        drawMobs();   
    }

    ctx.font = "30px Arial";

    if(coins.length > 0){
        updateCoins();
    }

    if(stars.length > 0){
        updateStars();
    }

    drawHealth();

    epic = (epic+1)%21; 
    }

     else{
        ctx.clearRect(10, 10, 120, 50);
        ctx.font = "90px Arial";
        ctx.strokeStyle = 'black';
        ctx.fillText("GAME OVER", 150, 200);
        ctx.strokeText("GAME OVER", 150, 200);
        music.stop();
        gameover.play();
        konec = true;
    }
    }else if(health > 0){
        ctx.font = "90px Arial";
        ctx.strokeStyle = 'black';
        ctx.fillText("YOU WON", 230, 200);

        ctx.font = "60px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(collectedCoins, 370, 320);
        ctx.fillText("x", 410, 315);
        ctx.drawImage(coinImg,  450, 275, 50, 50);
    }
}

let konec = false;

let level = 1;
let starsToPick;

function loadLevel(){

    platforms = [];
    mob = [];
    coins = [];
    stars = [];

    collectedStars = 0;

    if(level == 1){

                                    // x, y, width, height
        platforms[0] = new Platform(0, 500, 150, 50);
        platforms[1] = new Platform(250, 500, 150, 50);
        platforms[2] = new Platform(500, 500, 150, 50);
        platforms[3] = new Platform(750, 500, 150, 50);

                // x, y, width, height, fromX, toX, direction
       // mob[0] = new Mob(400, 440, 50, 50, 350, 500, 1);

        coins[0] = new Coin(550, 460);

    
        stars[0] = new Star(200, 420);
        stars[1] = new Star(810, 460);

    }

    if(level == 2){
        
        platforms[0] = new Platform(0, 500, 150, 50);
        platforms[1] = new Platform(490, 270, 150, 50);
        platforms[2] = new Platform(350, 340, 50, 20);
        platforms[3] = new Platform(250, 430, 50, 20);
        platforms[4] = new Platform(240, 100, 50, 50);
        platforms[5] = new Platform(370, 170, 50, 20);
        platforms[6] = new Platform(750, 500, 150, 50);
        
        coins[0] = new Coin(385, 140);
        coins[1] = new Coin(265, 360);

        stars[0] = new Star(250, 50);
     }

    if(level == 3){
        
        platforms[0] = new Platform(0, 420, 150, 40);
        platforms[1] = new Platform(300, 420, 150, 40);
        platforms[2] = new Platform(200, 500, 50, 20);
        platforms[3] = new Platform(600, 420, 150, 40);
        platforms[4] = new Platform(500, 500, 50, 20);
 
        mob[0] = new Mob(200, 470, 30, 30, 450, 600, 0);
    
        coins[0] = new Coin(100, 370);
        coins[1] = new Coin(800, 330);

        stars[0] = new Star(210, 450);
        stars[1] = new Star(510, 450);
    }

    if(level == 4){
        
        platforms[0] = new Platform(0, 500, 150, 50); //floor
        platforms[1] = new Platform(280, 420, 150, 40);
        platforms[2] = new Platform(600, 250, 150, 40);
        platforms[3] = new Platform(480, 330, 50, 20);
        platforms[4] = new Platform(750, 500, 150, 20);
        platforms[5] = new Platform(600, 420, 30, 20);
 
        mob[0] = new Mob(300, 200, 50, 50, 300, 700, 0);
        mob[1] = new Mob(50, 300, 50, 50, 100, 300, 0);
    
        coins[0] = new Coin(810, 450);

        stars[0] = new Star(210, 350);
        stars[1] = new Star(720, 200);
        stars[2] = new Star(600, 380);
    }

    if(level == 5){
        konec = true;
        music.stop();
        completed.play();
    }

    starsToPick = stars.length;

}

let coinCollect;
let starCollect;
let gameover;
let completed;
let music;

function addSounds(){
    coinCollect = new Sound("sounds/coinSound.mp3");
    starCollect = new Sound("sounds/s.wav");
    gameover = new Sound("sounds/gameover.wav"); 
    completed = new Sound("sounds/completed.wav")
    
    music = new Sound("sounds/music.mp3");
    music.muted = true;
    music.play(); 
}

function myGame(){

    document.getElementsByTagName("body")[0].style.backgroundColor = "grey";
    document.getElementById("startMenu").remove();
   
    player = new Player(10, 100, 50, 60);

  
    loadLevel();
    addSounds();
    draw();

    requestAnimationFrame(update);
}
var can1, can2;   //canvas1画布 ,   canvas2画布
var ctx1, ctx2;   //两个画笔

var canWidth, canHeight;  //画布的宽高

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;

var wave;
var halo;

var dust;
var dustPic = [];

// document.body.onload = game;
function game(){
        init();
        lastTime = Date.now();
        deltaTime = 0;

        // gameloop();
}

function init(){
        can1 = document.getElementById('canvas1');//fishes,dust,UI,circle
        ctx1 = can1.getContext('2d');  //上面的canvas
        can2 = document.getElementById('canvas2');//background,ane,fruits
        ctx2 = can2.getContext('2d');   //下面的canvas

        can1.addEventListener('mousemove',onMouseMove);

        bgPic.src = "./images/background.jpg";

        canWidth = can1.width;
        canHeight = can1.height; 

        ane = new aneObj();
        ane.init();

        fruit = new fruitObj();
        fruit.init();

        mom = new momObj();
        mom.init();
        baby = new babyObj();
        baby.init();

        for (var i = 0; i < 7; i++) {
            dustPic[i] = new Image();
            dustPic[i].src = "./images/dust" + i + ".png";
        }
        dust = new dustObj();
        dust.init();

        mx = canWidth*0.5;
        my = canHeight*0.5;

        for (var i = 0; i < 8; i++) {
            babyTail[i] = new Image();
            babyTail[i].src = "./images/babyTail"+ i + ".png";

        };
        for (var i = 0; i < 2; i++) {
            babyEye[i] = new Image();
            babyEye[i].src = "./images/babyEye"+ i + ".png";

        };
        for (var i = 0; i < 20; i++) {
            babyBody[i] = new Image();
            babyBody[i].src = "./images/babyFade"+ i + ".png";

        };

        for (var i = 0; i < 8; i++) {
            momTail[i] = new Image();
            momTail[i].src = "./images/bigTail"+ i + ".png";

        };
        for (var i = 0; i < 2; i++) {
            momEye[i] = new Image();
            momEye[i].src = "./images/bigEye"+ i + ".png";

        };
        
        data = new dataObj();
         for(var i = 0;i  < 8;i++){
            momBodyOra[i] = new Image();
            momBodyBlue[i] = new Image();
            momBodyOra[i].src = "./images/bigSwim" + i +".png";
            momBodyBlue[i].src = "./images/bigSwimBlue" + i +".png";
         }

        ctx1.font = "30px Verdana";
        ctx1.textAlign = "center";

        wave = new waveObj();
        wave.init();
        halo = new haloObj();
        halo.init();
}
function gameloop(){
    console.log(data.gameOver);
    if(!data.gameOver){
     window.requestAnimFrame(gameloop);
    }
  
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
   // if(deltaTime >40) deltaTime = 40;

    drawBackground();
    ane.draw();
    fruitMoniter();
    fruit.draw();

    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();

    data.draw();
    
    wave.draw();
    halo.draw();
    dust.draw();

}

function onMouseMove(e){
    if(!data.gameOver){
            if(e.offsetX||e.layerX){
            mx = e.offsetX == undefined?e.layerX:e.offsetX;
            my = e.offsetY == undefined?e.layerY:e.offsetY;
      
        }
    }
    
}
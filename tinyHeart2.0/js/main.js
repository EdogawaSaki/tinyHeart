var can1, can2;   //canvas1画布 ,   canvas2画布
var ctx1, ctx2;   //两个画笔（canvas内容）

var canWidth, canHeight;  //画布的宽高

var lastTime;
var deltaTime;//两帧间隔的时间差 毫秒

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

document.body.onload = game;
function game(){
        init();
        lastTime = Date.now();
        deltaTime = 0;
        gameloop();
}

function init(){
        can1 = document.getElementById('canvas1');//fishes,dust,UI,circle
        ctx1 = can1.getContext('2d');  //前面的canvas
        can2 = document.getElementById('canvas2');//background,ane,fruits
        ctx2 = can2.getContext('2d');   //后面的canvas

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
function drawRect(x, y, width, height, radius, color, type){
    ctx1.beginPath();
    ctx1.moveTo(x, y+radius);
    ctx1.lineTo(x, y+height-radius);
    ctx1.quadraticCurveTo(x, y+height, x+radius, y+height);
    ctx1.lineTo(x+width-radius, y+height);
    ctx1.quadraticCurveTo(x+width, y+height, x+width, y+height-radius);
    ctx1.lineTo(x+width, y+radius);
    ctx1.quadraticCurveTo(x+width, y, x+width-radius, y);
    ctx1.lineTo(x+radius, y);
    ctx1.quadraticCurveTo(x, y, x, y+radius);
    ctx1[type + 'Style'] = color || params.color;
    ctx1.closePath();
    ctx1[type]();
}

var isFirst = 1;
function gameloop(){
    window.requestAnimFrame(gameloop);
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
    if(data.gameOver && isFirst == 1){
       if(localStorage.getItem('data')){
           showphb(localStorage.getItem('username'),data.score);
            $.ajax({
                url:'http://localhost/myPHP/save.php',
                data:{username:localStorage.getItem('username'),score:data.score},
                type:'post',
                dataType:'json',
                success:function(data){
                    localStorage.setItem('data',JSON.stringify(data));
                }
            });
            
            $.ajax({
                url:'http://localhost/myPHP/getHigh.php',
                data:{username:localStorage.getItem('username')},
                type:'post',
                dataType:'json',
                success:function(res){
                    if(res['score']<data.score){
                        $('.highestScore').html(data.score);
                     }else{
                        $('.highestScore').html(res.score);
                     }
                }
            });

       }else{
        $.ajax({
            url:'http://localhost/myPHP/save.php',
            data:{username:localStorage.getItem('username'),score:data.score},
            type:'post',
            dataType:'json',
            success:function(data){

                    localStorage.setItem('data',JSON.stringify(data));
                    var lis = '';
                    $.each(data,function(index,val){
                        switch(index){
                            case 0:lis += '<li><i class="first"></i> '+val.username+'：<span class="listScore">'+val.score+'</span></li>';break;
                            case 1:lis += '<li><i class="second"></i> '+val.username+'：<span class="listScore">'+val.score+'</span></li>';break;
                            case 2:lis += '<li><i class="third"></i> '+val.username+'：<span class="listScore">'+val.score+'</span></li>';break;
                            default: lis += '<li><i>&nbsp;'+(index+1)+'</i>'+val.username+'：<span class="listScore">'+val.score+'</span></li>';break;
                        }
                        if(val.username == localStorage.getItem('username')){
                            $('.highestScore').html(val.score);
                        }else{
                            $('.highestScore').html(data.score);
                        }
                     
                    });
                   $('.listli').empty();
                   $('.listli').append(lis);
                  
              
                
            }

        }) ;
    
       }
        
       //等待两秒在显示排行榜
       setTimeout(function(){
            $("#zoom").show();
           
       },2000);
       
       $('.yourScore').html(data.score);
       
      
       isFirst = 0;

       
    }
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
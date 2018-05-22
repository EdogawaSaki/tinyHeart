var babyObj = function(){
    this.x;
    this.y;
    this.angle;
    this.babyEye = new Image();
    this.babyBody = new Image();
    this.babyTail = new Image();

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;//当前这张图片需要间隔多长时间

    this.babyBodyTimer = 0; //计时器
    this.babyBodyCount = 0; //序号，即当前图片第几帧

}
babyObj.prototype.init = function(){
    this.x = canWidth*0.5-50;
    this.y = canHeight*0.5+50;
    this.angle = 0;
    //this.babyEye.src = "./images/babyEye0.png";
    this.babyBody.src = "./images/babyFade0.png";
    //3this.babyTail.src = "./images/babyTail0.png";
}
babyObj.prototype.draw = function(){
    //lerp x,y
    this.x = lerpDistance(mom.x,this.x,0.98);
    this.y = lerpDistance(mom.y,this.y,0.98);
    //delta angle    让xiao鱼的角度倾向于big的角度
    //Math.atan2(y,x)返回点(x,y)和原点(0,0)之间直线的倾斜角.
    var deltaX = mom.x - this.x;  //横坐标差
    var deltaY = mom.y - this.y;  //纵坐标差
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;    //-PI,PI

    //lerp angle
    this.angle = lerpAngle(beta, this.angle, 0.6);    //获得每一次旋转的角度
    
    //baby tail count
    this.babyTailTimer +=deltaTime;
    if(this.babyTailTimer> 50){//每隔50毫秒绘制一张图
        this.babyTailCount = (this.babyTailCount +1) % 8;
        this.babyTailTimer %= 50; //计时器清零
    }

    //babby eye
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if(this.babyEyeCount == 0)//睁着眼睛
        {
            this.babyEyeInterval = Math.random()*1500 +2000;
        }else//闭眼睛
        {
           this.babyEyeInterval = 200; 
        }
    }

    //baby body
    this.babyBodyTimer  += deltaTime;
    if(this.babyBodyTimer > 300){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19){
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
            
        }
    }


    //ctx1
    ctx1.save();
    //traslate
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5+23, -babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
}
var momObj = function(){
        this.x;
        this.y;
        this.angle;
        //this.bigEye = new Image();
        //this.bigBody = new Image();
        //this.bigTail = new Image();

        this.momTailTimer = 0;
        this.momTailCount = 0;

        this.momEyeTimer = 0;
        this.momEyeCount = 0;
        this.momEyeInterval = 1000;

        this.momBodyCount = 0;
}
momObj.prototype.init = function(){
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    //this.bigEye.src = "./images/bigEye0.png";
    //this.bigBody.src = "./images/bigSwim0.png";
    //this.bigTail.src = "./images/bigTail0.png";
    
}
momObj.prototype.draw = function(){
    //lerp x,y   让大鱼的坐标值倾向于鼠标位置，然后绘制大鱼
    this.x = lerpDistance(mx, this.x, 0.96);
    this.y = lerpDistance(my, this.y, 0.98);

    //delta angle    让大鱼的角度倾向于鼠标的角度
    //Math.atan2(y,x) 反 正切
    var deltaX = mx - this.x;  //横坐标差
    var deltaY = my - this.y;  //纵坐标差
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;    //-PI,PI

    //lerp angle
    this.angle = lerpAngle(beta, this.angle, 0.6);    //获得每一次旋转的角度
    
    //tail
    this.momTailTimer +=deltaTime;
    if(this.momTailTimer> 50){
        this.momTailCount = (this.momTailCount +1) % 8;
        this.momTailTimer %= 50;
    }
    //mom eye
    this.momEyeTimer += deltaTime;
    if(this.momEyeTimer > this.momEyeInterval){
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer %= this.momEyeInterval;
        if(this.momEyeCount == 0)
        {
            this.momEyeInterval = Math.random()*1500 +2000;
        }else
        {
           this.momEyeInterval = 200; 
        }
    }

    ctx1.save();     //保存之前的画布
    ctx1.translate(this.x, this.y);      //把原点变成(this.x , this.y);
    ctx1.rotate(this.angle);
    var momTailCount = this.momTailCount;
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5+30, -momTail[momTailCount].height * 0.5);
    var momBodyCount=this.momBodyCount;
    if(data.double == 1){//ora
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    }else
    {
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);   
    }
    var momEyeCount = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
    ctx1.restore();   //操作完后返回到之前的画布
}
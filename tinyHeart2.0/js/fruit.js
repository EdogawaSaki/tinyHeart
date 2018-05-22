var fruitObj = function(){
    this.alive = [];//bool
    this.x = [];
    this.y = [];
    this.aneNO = [];
    this.l = [];   //果实大小（直径）
    this.spd = [];
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();

}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
    for(var i = 0; i< this.num; i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = 0;
        this.spd[i]= Math.random()*0.017+0.003;//[0.003,0.02)
        this.fruitType[i] = "";
        //this.born(i);
    }
    this.orange.src = "./images/fruit.png";
    this.blue.src = "./images/blue.png";

}
fruitObj.prototype.draw = function(){
    for(var i =0;i< this.num; i++){
        //draw
        //find an ane, grow, fly up
        if(this.alive[i]){
            var pic = this.orange;
                if(this.fruitType[i] == 'blue')   pic = this.blue;
            if(this.l[i]<=14){ //当果实还在grow的时候，它跟着海葵摆动
                var NO = this.aneNO[i];
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i]+=this.spd[i]*deltaTime;
                ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            }
            else{

                this.y[i]-=this.spd[i]*6*deltaTime;
                ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            }
            
            if(this.y[i]<10){
                this.alive[i] = false;
            }
        }
        
        
    }
}
fruitObj.prototype.born = function(i){
        this.aneNO[i] = Math.floor(Math.random() * ane.num);
        this.l[i] = 0;
        this.alive[i] = true;
        var flag = Math.random();
        if(flag < 0.1){
            this.fruitType[i] = "blue";
        }//蓝色果实的概率是0.1
        else{
            this.fruitType[i] = "orange";
        }
    }

fruitObj.prototype.dead = function(i){
    this.alive[i] = false;
}

function fruitMoniter(){
    var num = 0;
    for(var i = 0;i< fruit.num; i++){
        if(fruit.alive[i])
            num++;
    }
    if(num<15){
        //send fruit
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(var i = 0;i< fruit.num; i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}
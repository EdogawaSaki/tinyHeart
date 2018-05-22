var aneObj = function(){
    //start point=this.rootx(this.x),control point,end point(sin)
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    //this.len = [];
    this.alpha = 0;//正弦函数的角度
    this.amp = [];//振幅
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
    for(var i =0;i < this.num; i++){
        this.rootx[i] = i * 16 + Math.random() * 20;//[0,1) 每隔一段距离就长出一株海葵
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        //this.len[i] = 200 + Math.random() * 50;
       this.amp[i] = Math.random() *50 + 40;

    }

}
aneObj.prototype.draw = function(){
    this.alpha += deltaTime * 0.0008; 
    var l = Math.sin(this.alpha);//[-1,1]
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = 'round';
    ctx2.strokeStyle = '#3b154e';
    for(var i = 0; i< this.num; i++){
            //beginPath, moveTo,lineTo, strokeStyle, stroke,lineWidth, lineCap,globalAlpha;
            ctx2.beginPath();
            ctx2.moveTo(this.rootx[i], canHeight);     //起始点
            this.headx[i] = this.rootx[i] + l * this.amp[i];
            ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100,this.headx[i],this.heady[i]);
            ctx2.stroke();
        }
        ctx2.restore();
}
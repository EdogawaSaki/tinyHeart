function momFruitsCollision(){     //判断果实和大鱼之间的距离，小于30说明被吃掉
    if(!data.gameOver){
            for(var i = 0;i < fruit.num; i++ ){
            if(fruit.alive[i]){
                //calculate lenth
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if(l < 30){
                    //fruit eaten
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.momBodyCount++;
                    if(mom.momBodyCount > 7) //大鱼身体的颜色
                        mom.momBodyCount = 7;
                    if(fruit.fruitType[i]=="blue"){
                        data.double = 2;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }
    
}

//mom baby collision
function momBabyCollision(){
    if(data.fruitNum > 0 && !data.gameOver){
       var l = calLength2(mom.x,mom.y,baby.x,baby.y);
        if(l < 30){
            //baby recover
            baby.babyBodyCount = 0;
            //mom recover
            mom.momBodyCount = 0;
            //score updata
            data.addScore();
            //darw halo
            halo.born(baby.x,baby.y);
        }
    }
}
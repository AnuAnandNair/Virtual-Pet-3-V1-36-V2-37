class Food{
    constructor(){        
        this.foodStock=0;
        this.lastFed=null;
        this.image = loadImage("images/Milk.png");
    }


    getFoodStock(){
       var foodStockRef=database.ref('Food');   
        foodStockRef.on("value",(data)=>{
         //bottle image will not be displayed in the beginning  
        //foodStock=data.val();//uncomment if function(data) is to be used in line 11 and comment 14
        this.foodStock=data.val();//bottle image will be displayed in the beginning             
        });
        //this.foodStock=foodStock;//uncomment if function(data) is to be used in line 11       
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
      }

    bedRoom(){
        background(bedRoomImg,550,500);
    }

    washRoom(){
        background(washRoomImg,550,500);
    }
        
    garden(){
        background(gardenImg,550,500);
    }  

    updateFoodStock(foodStock){
        database.ref('/').update({
            Food:foodStock
        })
    }
    
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
           } 
    }

    display(){
        background(46,139,87); 

        fill(255,255,254);
        textSize(15);
        if(lastFed>=12){
          text("Last Feed : "+lastFed%12+ " PM",150,30);//time is in 24 hoyr format  > 12 means PM like 13 to 24
          //to display it in 12 hour format, 13 = 1 PM that is remainder of 13 /12
          //14=2 PM that is remainder of 14/12
          //15=3 PM that is remainder of 15/12
        }else if(lastFed===0){
          text("Last Feed : 12 AM",150,30);
        }else{
          text("Last Feed : "+lastFed + " AM",150,30);
        }
      
        var x=70;
        var y=100;

        imageMode(CENTER);
        //image(this.image,720,220,70,70);
        //bottle near dog

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=70;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
}
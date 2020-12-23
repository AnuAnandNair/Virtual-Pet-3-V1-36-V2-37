//nodes: Food, FeedTime, gameState

var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feedButton, addFoodButton;
var fedTime, lastFed;
var food;
var gameState,bedRoomImg, gardenImg,washRoomImg;

function preload(){
   dogImg=loadImage("images/dogImg.png");
   dogImg1=loadImage("images/dogImg1.png");
   bedRoomImg=loadImage("images/BedRoom.png");
   gardenImg=loadImage("images/Garden.png");
   washRoomImg=loadImage("images/WashRoom.png");
  }

//Function to set initial environment
function setup() {

  database=firebase.database();
  
  createCanvas(400,500);

  food=new Food();
  food.getFoodStock();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  dog=createSprite(200,400,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  //foodStock=database.ref('Food');
  //foodStock.on("value",readStock);

  //read gameState from db
  gameStateRef=database.ref('gameState');
  gameStateRef.on("value", function(data){
    gameState=data.val();
  })
  textSize(20);  

  feedButton=createButton("Feed the dog");
  feedButton.position(500,95);
  feedButton.mousePressed(feedDog);

  addFoodButton=createButton("Add Food");
  addFoodButton.position(600,95);
  addFoodButton.mousePressed(addFood);
}

// function to display UI
function draw() {
  
  
  //food.display(); 
 
  currentTime=hour();
  if(currentTime===(lastFed+1)){
    
    //gameState="playing";
    //updategameState(gameState);    
    updategameState("playing");
    food.garden();
    
  }else if(currentTime===(lastFed+2)){
    
    //gameState="sleeping";
    //updategameState(gameState);    
    updategameState("sleeping");
    food.bedRoom();
    
  }else if((currentTime-lastFed>=2) &&(currentTime-lastFed<=4)){
    
    //gameState="bathing";
    //updategameState(gameState);    
    updategameState("bathing");
    food.washRoom();
    
  }else{
    //gameState="hungry";
    //updategameState(gameState);
    updategameState("hungry");
    food.display();
    //feedDog();//dont call inside function draw. 
    //It will keep calling feedDog and bottles will go on decreasing
  }

  if(gameState!=="hungry"){
    feedButton.hide();
    addFoodButton.hide();
    dog.remove();
  }else{
    feedButton.show();
    addFoodButton.show();    
    dog.addImage(dogImg1);
   
  
  }

  drawSprites();
}
  
function updategameState(state){
  database.ref('/').update({
    gameState:state
  });
}

//Function to read values from DB
/*function readStock(data){
  foodS=data.val();
}*/



function addFood(){
food.getFoodStock();
food.foodStock+=1;//foodS++;
//foodS=food.foodStock;
database.ref('/').update({
  Food:food.foodStock
})

}

function feedDog(){
  
  dog.addImage(dogImg1);
  food.getFoodStock();
  food.deductFood();//food.updateFoodStock(food.getFoodStock()-1); 
  //food.updateFoodStock(food.foodStock);
  database.ref('/').update({    
    Food:food.foodStock,//Food:food.getFoodStock(),
    FeedTime:hour(),
    gameState:"hungry"//give this if feedDog is not called in else part of function draw
      //update foodStock and fedTime
    })
  
  
}


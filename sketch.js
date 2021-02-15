var dog,happyDog
var iogImg
var food,foodStock;
var databaase;
var foodS;
var fedthePet,addfood;
var feedTime,lastfed;
var foodObj;
var food=20;
function preload()
{
 dogImg=loadImage("images/dogImg.png")	
 happyDog=loadImage("images/dogImg1.png")
}
function setup() {
  database = firebase.database();
  foodStock=database.ref("food")
  foodStock.on("value",readStock)
  feedTime=database.ref("feedTime");
  feedTime.on("value",function(data){
    lastfed=data.val();
  })
  createCanvas(1000,500);
  foodObj=new Food();
  dog=createSprite(800,250,30,20)
  dog.addImage(dogImg)
  dog.scale=0.2;

  feed=createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDogs)
 
  addFood=createButton("add food")
 addFood.position(800,95);
 addFood.mousePressed(addfood)
}

function draw() {  
background("green")
foodObj.display();

   
  drawSprites();
  fill("black")
  textSize(16)

  if(lastfed>=12){
    text("Last feed: "+lastfed%12 +"PM",150,50)
  }else if(lastfed == 0){
    text("Last feed: 12AM",150,30)
  }else{
    text("Last feed: "+lastfed +"AM",150,50)
  }

}

function readStock(data){
  foodS=data.val()
}
function addfood(){
foodS++
database.ref("/").update({
  food:foodS
})
  dog.addImage(dogImg)
  foodObj.updateFoodStock(foodS);
}
function feedDogs(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodS-1);
  database.ref("/").update({
    food : foodObj.getFoodStock(),
    feedTime : hour()
  })
}
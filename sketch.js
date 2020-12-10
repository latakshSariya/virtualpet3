var dogImg, happyDogImg, dog, database, foodS, foodStock, canvas, 
lastFed, fedTime, foodObj, feed, addFood, food1, foodCount, input,
milk, milkImg;
var readState;
var updateState;


var bedroom, garden , washroom;


var currentTime;

function preload() {
  dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png');
  milkImg = loadImage('images/Milk.png');
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup() {
  database = firebase.database();
  canvas = createCanvas(800, 400);
  dog = createSprite(650, 250);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  milk = createSprite(565, 300);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 55;
  
  food1 = new Food();
  
  food1.start();

  addFood = createButton("Add food");
  addFood.position(width/2+410, height/2-130);
  addFood.mousePressed(addFoods);

  input = createInput("Your Dog's Name");
  input.position(width/2+300, height/2-50);

  feed = createButton("Feed your Dog");
  feed.position(width/2+300, height/2-130);
  feed.mousePressed(feedDog);

}

function draw() {  
  background(46, 139, 87);
  currentTime = hour();

  food1.display();

  drawSprites();

  if(currentTime === lastFed+1){
    food1.updateState("garden")
    food1.Garden();
  }
  else if(currentTime === lastFed+2){
    food1.updateState("Bedroom")
    food1.Bedroom();
  }
  else if(currentTime>=2&&currentTime<=4){
    food1.updateState("Washroom")
    food1.Washroom()
  }
  else{
    food1.updateState("hungry")
    food1.display();
  }






}

function feedDog() {
  food1.getFoodStock();
  food1.updateFedTime();

  if(foodCount === 0) {
    foodCount = 0;
    milk.visible = false;
    dog.addImage(dogImg);
  } else {
    food1.updateFoodStock(foodCount - 1);
    milk.visible = true;
    dog.addImage(happyDogImg);
  }
}

function addFoods() {
 food1.getFoodStock();

 food1.updateFoodStock(foodCount + 1); 
}


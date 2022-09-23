const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var fruit_con_4;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2,rope3,rope4;

var button1,button2,button3

var canH,canW;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

var empty_star, one_star, two_star, star_image;
var starzero, starone, startwo, star;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

star = loadImage('star.png')

  empty_star = loadAnimation("empty.png");
  one_star = loadAnimation("one_star.png");
  two_star = loadAnimation("stars.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
createCanvas(600,700)
/*  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  }else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }*/

  frameRate(80);

  

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(50,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button1 = createImg('cut_btn.png');
  button1.position(220,30);
  button1.size(50,50);
  button1.mouseClicked(drop2);

  button2 = createImg('cut_btn.png');
  button2. position(380,220);
  button2.size(50,50);
  button2.mouseClicked(drop3);

  button3 = createImg('cut_btn.png');
  button3.position(60,340);
  button3.size(50,50);
  button3.mouseClicked(drop4);

  blower = createImg('balloon.png');
  blower.position(-20,240);
  blower.size(150,100);
  blower.mouseClicked(blow);

  mute_btn = createImg('mute.png');
  mute_btn.position(4);
  mute_btn.size(40,40);
  mute_btn.mouseClicked(mute);

  
  rope = new Rope(7,{x:75,y:30});
  rope2 = new Rope(7,{x:245,y:30});
  rope3 = new Rope(6,{x:425,y:250});
  rope4 = new Rope(6,{x:75,y:370});
  ground = new Ground(300,height+270,width,600,20);
  console.log(height);
  console.log(width);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(230,height-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  fruit_con = new Link(rope,fruit);

  fruit_con_2 = new Link(rope2,fruit);

  fruit_con_3 = new Link(rope3,fruit);

  fruit_con_4 = new Link(rope4,fruit);

  //sprite estrellas
  starone = createSprite(300,350);
  starone.addImage(one_star);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  //image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
    eating_sound.setVolume(1.8);
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    sad_sound.play();
    sad_sound.setVolume(1.8);
    fruit=null;
    bk_song.stop();
     
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut_sound.play();
  cut_sound.setVolume(1.8); 
}

function drop2()
{
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
  cut_sound.play();
  cut_sound.setVolume(1.8); 
}

function drop3()
{
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
  cut_sound.play();
  cut_sound.setVolume(1.8); 
}

function drop4()
{
  rope4.break();
  fruit_con_4.detach();
  fruit_con_4 = null;
  cut_sound.play();
  cut_sound.setVolume(1.8); 
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function blow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  air.play();
  //Matter.Body.applyForce(body,{posicion x,y},{fuerza x,y})
}

function mute()
{
  if(bk_song.isPlaying()){
    bk_song.stop();
  }else{
    bk_song.play();
  }
}
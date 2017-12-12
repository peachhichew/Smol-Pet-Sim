// Testing if pixi is loaded properly
var type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type);

// aliases for various pixi commands
var Container = PIXI.Container,
autoDetectRenderer = PIXI.autoDetectRenderer,
loader = PIXI.loader,
resources = PIXI.loader.resources,
TextureCache = PIXI.utils.TextureCache,
Texture = PIXI.Texture,
Sprite = PIXI.Sprite,
Graphics = PIXI.Graphics
Rectangle = PIXI.Rectangle,
BaseTexture = PIXI.BaseTexture,
extras = PIXI.extras;

// width and height of the canvas
var canvasWidth = 500;
var canvasHeight = 500;

// texture and sprite for walking dog 
var walkTexture, walkingDog;
// texture and sprite for sitting dog
var sitTexture, sittingDog;
// texture and sprite for barking dog
var barkTexture, barkingDog;

// container to hold the sprites
var dogScene;

const app = new PIXI.Application(canvasWidth,canvasHeight);
// renderer = autoDetectRenderer(500, 500);

// add the canvas to the HTML document
document.body.appendChild(app.view);

let stage;

// renderer.render(stage);

loader
    .add("dogWalking", "../images/pupper/shiba.png")
    .add("dogSitting", "../images/pupper/shiba.png")
    .load(setup);

function setup() {
    stage = app.stage;
    dogScene = new Container();
    stage.addChild(dogScene);
    changeBackground(0xFFFFFF);
    // load the sprite sheets into the window 
    walkTexture = loadSpriteSheet();
    sitTexture = loadSittingSprite();
    barkTexture = loadBarkingSprite();
    // call the animation functions
    walkAnim(randomInt(0, 465), randomInt(0, 475));
    walkAnim(randomInt(0, 465), randomInt(0, 475));
    sitAnim(100, 100);
    barkAnim(50, 50);
    // call the gameLoop function to make the animation work 
    app.ticker.add(gameLoop);
}

//  load sprite sheet for walking 
function loadSpriteSheet() {
    let dogWalkSheet = BaseTexture.fromImage("dogWalking");
    let dogWalkWidth = 35;
    let dogWalkHeight = 25;
    let numFrames = 12;
    let walk = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogWalkSheet, new Rectangle(i * dogWalkWidth, 240, dogWalkWidth, dogWalkHeight));
        walk.push(frame);
    }
    return walk;
}

// load sprite sheet for sitting 
function loadSittingSprite() {
    let dogSitSheet = BaseTexture.fromImage("dogSitting");
    let dogSitWidth = 35;
    let dogSitHeight = 25;
    let numFrames = 15;
    let sit = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogSitSheet, new Rectangle(i * dogSitWidth, 28, dogSitWidth, dogSitHeight));
        sit.push(frame);
    }
    return sit;
}

// load sprite sheet for barking
function loadBarkingSprite() {
    let dogBarkSheet = BaseTexture.fromImage("dogSitting");
    let dogBarkWidth = 35;
    let dogBarkHeight = 25;
    let numFrames = 13;
    let bark = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogBarkSheet, new Rectangle(i * dogBarkWidth, 60, dogBarkWidth, dogBarkHeight));
        bark.push(frame);
    }
    return bark;
}

// walking animation
function walkAnim(x, y) {
    walkingDog = new extras.AnimatedSprite(walkTexture);
    walkingDog.x = x;
    walkingDog.y = y;
    walkingDog.animationSpeed = 1/3;
    walkingDog.loop = true;

    // add the texture into the stage 
    dogScene.addChild(walkingDog);
    walkingDog.play();
}

// sitting animation
function sitAnim(x, y) {
    sittingDog = new extras.AnimatedSprite(sitTexture);
    sittingDog.x = x;
    sittingDog.y = y;
    sittingDog.animationSpeed = 1/5;
    sittingDog.loop = true;

    // add the texture onto the stage
    dogScene.addChild(sittingDog);
    sittingDog.play();
}

function barkAnim(x, y) {
    barkingDog = new PIXI.extras.AnimatedSprite(barkTexture);
    barkingDog.x = x;
    barkingDog.y = y;
    barkingDog.animationSpeed = 1/5;
    barkingDog.loop = true;

    // add texture onto stage
    dogScene.addChild(barkingDog);
    barkingDog.play();
}

function randomInt(min, max) {
    // Math.ceil returns the smallest int greater than or equal to the given number
    min = Math.ceil(min);
    max = Math.floor(max);

    // [min, max)
    let num = Math.floor(Math.random() * (max - min)) + min;
    
    return num;
}

// changes the background color by drawing a rectangle
function changeBackground(color){
    const bg = new Graphics();
    bg.beginFill(color);
    bg.lineStyle(1, color, 1);  // stroke width, color, alpha
    bg.drawRect(0, 0, canvasWidth, canvasHeight);
    bg.endFill();
    bg.x = 0;
    bg.y = 0;
    dogScene.addChild(bg);
}

function gameLoop() {
    // calculate how much time has passed since the last update and adjust sprites
    // accordingly
    let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt = 1/12;
}
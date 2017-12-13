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
extras = PIXI.extras,
text = PIXI.Text;

// width and height of the canvas
var canvasWidth = 500;
var canvasHeight = 500;

// texture and sprite for walking dog 
var walkTexture, walkingDog;
// texture and sprite for sitting dog
var sitTexture, sittingDog;
// texture and sprite for barking dog
var barkTexture, barkingDog;

// variable for the bg
const bg = new Graphics();

// container to hold the sprites
var dogPage, startPage, bunPage, catPage;

const app = new PIXI.Application(canvasWidth,canvasHeight);
// renderer = autoDetectRenderer(500, 500);

// add the canvas to the HTML document
document.body.appendChild(app.view);

let stage;

// renderer.render(stage);

loader
    .add("dog", "../images/pupper/shiba.png")
    .add("dogWalking", "../images/pupper/shiba.png")
    // .add("dogSitting", "../images/pupper/shiba.png")
    .load(setup);

function setup() {
    stage = app.stage;
    // START PAGE
    startPage = new Container();
    stage.addChild(startPage);

    // DOG PAGE
    dogPage = new Container();
    dogPage.visible = false;
    stage.addChild(dogPage);

    // BUN PAGE
    bunPage = new Container();
    bunPage.visible = false;
    stage.addChild(bunPage);

    // CAT PAGE
    catPage = new Container();
    catPage.visible = false;
    stage.addChild(catPage);

    changeBackground(0xFFFFFF, 0x000000);
    startPage.addChild(bg);

    createStartPage();
    
    // // load the sprite sheets into the window 
    // walkTexture = loadWalkingSprite();
    // sitTexture = loadSittingSprite();
    // barkTexture = loadBarkingSprite();
    // // call the animation functions
    // walkAnim(randomInt(0, 465), randomInt(0, 475));
    // walkAnim(randomInt(0, 465), randomInt(0, 475));
    // sitAnim(100, 100);
    // barkAnim(50, 50);

    // makeButton(5, 5, 60, 25, 0xcccccc, 0x000000, "test");
    // call the gameLoop function to make the animation work 
    app.ticker.add(gameLoop);
}

function createStartPage() {
    startPage.visible = true;
    dogPage.visible = false;
    bunPage.visible = false;
    catPage.visible = true;

    let buttonWidth = 60;
    let buttonHeight = 25;

    changeBackground(0xFFFFFF, 0x000000);
    startPage.addChild(bg);

    // DOG BUTTON
    let dogButton = new Graphics();
    dogButton.beginFill(0xcccccc);
    dogButton.lineStyle(1, 0x000000, 0.6); // stroke width, color, alpha
    dogButton.drawRect(0, 0, buttonWidth, buttonHeight);
    dogButton.endFill();
    dogButton.x = (canvasWidth/2)-(buttonWidth/2);
    dogButton.y = 300;
    dogButton.interactive = true;
    dogButton.buttonMode = true;
    dogButton.on("pointerup", createDogPage);
    // dogButton.on('pointerover', e => e.target.alpha = 0.7);
    // dogButton.on('pointerout', e => e.target.alpha = 1.0);
    
    startPage.addChild(dogButton);

    let textStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 20,
        fontFamily: "VT323",   // changing later
    });

    let dogButtonText = new PIXI.Text("Dog");
    dogButtonText.style = textStyle;
    dogButtonText.x = dogButton.x + 5;
    dogButtonText.y = dogButton.y + 5;
    dogButtonText.interactive = true;
    dogButtonText.buttonMode = true;
    dogButtonText.on("pointerup", createDogPage);
    // dogButtonText.on('pointerover', e => e.target.alpha = 0.7);
    // dogButtonText.on('pointerout', e => e.target.alpha = 1.0);
    startPage.addChild(dogButtonText);

    // BUN BUTTON
    let bunButton = new Graphics();
    bunButton.beginFill(0xcccccc);
    bunButton.lineStyle(1, 0x000000, 0.6); // stroke width, color, alpha
    bunButton.drawRect(0, 0, buttonWidth, buttonHeight);
    bunButton.endFill();
    bunButton.x = (canvasWidth/2)-(buttonWidth/2);
    bunButton.y = dogButton.y + 35;
    bunButton.on("pointerup", createDogPage);
    startPage.addChild(bunButton);

    let bunButtonText = new PIXI.Text("Bun");
    bunButtonText.style = textStyle;
    bunButtonText.x = (canvasWidth/2)-(buttonWidth/2);
    bunButtonText.y = bunButton.y + 5;
    bunButtonText.interactive = true;
    bunButtonText.buttonMode = true;
    // functions to make this part interactive?
    // bunButtonText.on("pointerup", createDogPage);
    // bunButtonText.on('pointerover', e => e.target.alpha = 0.7);
    // bunButtonText.on('pointerout', e => e.target.alpha = 1.0);
    startPage.addChild(bunButtonText);
}

function createDogPage() {
    startPage.visible = false;
    dogPage.visible = true;
    bunPage.visible = false;
    catPage.visible = false;

    changeBackground(0xFFFFFF, 0x000000);
    dogPage.addChild(bg);
    // load the sprite sheets into the window 
    walkTexture = loadWalkingSprite();
    sitTexture = loadSittingSprite();
    barkTexture = loadBarkingSprite();
    // call the animation functions
    walkAnim(randomInt(0, 465), randomInt(0, 475));
    walkAnim(randomInt(0, 465), randomInt(0, 475));
    sitAnim(100, 100);
    barkAnim(50, 50);

    makeButton(5, 5, 60, 25, 0xcccccc, 0x000000, "test");
}

//  load sprite sheet for walking 
function loadWalkingSprite() {
    let dogWalkSheet = BaseTexture.fromImage("dog");
    let dogWalkWidth = 35;
    let dogWalkHeight = 24;
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
    let dogSitSheet = BaseTexture.fromImage("dog");
    let dogSitWidth = 39;   // alter between 38 and 39?
    let dogSitHeight = 28;
    let numFrames = 15; // 15 frames
    let sit = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogSitSheet, new Rectangle(i * dogSitWidth, 27, dogSitWidth, dogSitHeight));
        sit.push(frame);
    }
    return sit;
}

// load sprite sheet for barking
function loadBarkingSprite() {
    let dogBarkSheet = BaseTexture.fromImage("dog");
    let dogBarkWidth = 37;  // originally 35
    let dogBarkHeight = 28; // originally 25
    let numFrames = 13;
    let bark = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogBarkSheet, new Rectangle(i * dogBarkWidth, 58, dogBarkWidth, dogBarkHeight));
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
    walkingDog.interactive = true;
    walkingDog.button = true;
    // walkingDog.on("pointerup", sitAnim(x, y));

    // add the texture into the stage 
    dogPage.addChild(walkingDog);
    walkingDog.play();
    // dogPage.removeChild(walkingDog);
    // walkingDog.on("pointerup", sitAnim(x, y));
}

// sitting animation
function sitAnim(x, y) {
    sittingDog = new extras.AnimatedSprite(sitTexture);
    sittingDog.x = x;
    sittingDog.y = y;
    sittingDog.animationSpeed = 1/5;
    sittingDog.loop = true;

    // add the texture onto the stage
    dogPage.addChild(sittingDog);
    sittingDog.play();
}

function barkAnim(x, y) {
    barkingDog = new PIXI.extras.AnimatedSprite(barkTexture);
    barkingDog.x = x;
    barkingDog.y = y;
    barkingDog.animationSpeed = 1/5;
    barkingDog.loop = true;

    // add texture onto stage
    dogPage.addChild(barkingDog);
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
function changeBackground(color, stroke){
    // bg = new Graphics();
    bg.beginFill(color);
    bg.lineStyle(1, stroke, 1);  // stroke width, color, alpha
    bg.drawRect(1, 0, canvasWidth - 1, canvasHeight - 1);
    bg.endFill();
    bg.x = 0;
    bg.y = 0;
    // dogPage.addChild(bg);
}

function makeButton(x, y, width, height, color, stroke, text) {
    // let button = new Graphics();
    // button.beginFill(color);
    // button.lineStyle(1, stroke, 0.6); // stroke width, color, alpha
    // button.drawRect(x, y, width, height);
    // button.endFill();
    // button.x = x;
    // button.y = y;
    // dogPage.addChild(button);

    let backButton = new PIXI.Graphics();
    backButton.lineStyle(1, stroke, 1); // stroke width, color, alpha
    backButton.beginFill(0x000000);
    backButton.moveTo(0, 20);
    backButton.lineTo(20, 0);
    backButton.lineTo(20, 10);
    backButton.lineTo(45, 10);
    backButton.lineTo(45, 30);
    backButton.lineTo(20, 30);
    backButton.lineTo(20, 40);
    backButton.endFill();
    backButton.x = x;
    backButton.y = y;
    backButton.scale.x = 0.7;
    backButton.scale.y = 0.7;
    backButton.interactive = true;
    backButton.buttonMode = true;
    backButton.on("pointerup", createStartPage);
    // backButton.on('pointerover', e => e.target.alpha = 0.7);
    // backButton.on('pointerout', e => e.target.alpha = 1.0);
    dogPage.addChild(backButton);

    let textStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 18,
        fontFamily: "VT323",   // changing later
    });

//     let buttonText = new PIXI.Text(text);
//     buttonText.style = textStyle;
//     buttonText.x = x + 10;
//     buttonText.y = y + 5;
//     buttonText.interactive = true;
//     buttonText.buttonMode = true;
//     // functions to make this part interactive?
//     dogPage.addChild(buttonText);
}

function gameLoop() {
    // calculate how much time has passed since the last update and adjust sprites
    // accordingly
    let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt = 1/12;
}
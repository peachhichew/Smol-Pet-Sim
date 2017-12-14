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
var walkTexture, wd1, wd2;
// texture and sprite for sitting dog
var sitTexture, sittingDog;
// texture and sprite for barking dog
var barkTexture, barkingDog;
// texture and sprite for bunny
var hopTexture, hoppingBun;

// variable for the bg
const bg = new Graphics();

// container to hold the sprites
var dogPage, startPage, bunPage, catPage;

let sit;

let dogs;

let buttonWidth = 90; // originally 60, 25
let buttonHeight = 30;

const app = new PIXI.Application(canvasWidth,canvasHeight);
// renderer = autoDetectRenderer(500, 500);

// add the canvas to the HTML document
document.body.appendChild(app.view);

let stage;

// renderer.render(stage);

loader
    .add("dog", "../images/pupper/shiba1.png")
    .add("dogWalking", "../images/pupper/shiba.png")
    .add("bunny", "../images/bun/bun.png")
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

    // CREDITS PAGE
    creditsPage = new Container();
    creditsPage.visible = false;
    stage.addChild(creditsPage);

    // NOTES PAGE
    notesPage = new Container();
    notesPage.visible = false;
    stage.addChild(notesPage);

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

/*****************************
  CREATE START PAGE 
****************************/

function createStartPage() {
    startPage.visible = true;
    dogPage.visible = false;
    bunPage.visible = false;
    catPage.visible = true;
    creditsPage.visible = false;
    notesPage.visible = false;

    changeBackground(0xFFFFFF, 0x000000);
    startPage.addChild(bg);

    // TITLE TEXT
    let titleStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 35,
        fontFamily: "VT323",   // changing later
    });

    let titleText1 = new PIXI.Text("Welcome to");
    titleText1.style = titleStyle;
    titleText1.x = 180;
    titleText1.y = 100;
    startPage.addChild(titleText1);

    let titleText2 = new PIXI.Text("Smol Pet Simulator");
    titleText2.style = titleStyle;
    titleText2.x = 125;
    titleText2.y = 250;
    startPage.addChild(titleText2);

    // CREDITS + NOTES TEXT
    let infoStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 20,
        fontFamily: "VT323",   // changing later
    });

    let credits = new PIXI.Text("Credits");
    credits.style = infoStyle;
    credits.x = 10;
    credits.y = 478;
    credits.interactive = true;
    credits.buttonMode = true;
    credits.on("pointerup", createCreditsPage);
    startPage.addChild(credits);

    let notes = new PIXI.Text("Notes");
    notes.style = infoStyle;
    notes.x = 450;
    notes.y = 478;
    notes.interactive = true;
    notes.buttonMode = true;
    notes.on("pointerup", createNotesPage);
    startPage.addChild(notes);

    // ANIMAL IMAGES
    let bunWidth = 500;  // originally 35
    let bunHeight = 270;
    let bunStart = TextureCache["bunny"];
    let clipBun = new Rectangle(0, 0, bunWidth, bunHeight);
    bunStart.frame = clipBun;
    let bunStartSprite = new Sprite(bunStart);
    bunStartSprite.x = 100;
    bunStartSprite.y = 143;
    bunStartSprite.scale.x = 0.25;
    bunStartSprite.scale.y = 0.25;
    bunStartSprite.interactive = true;
    bunStartSprite.buttonMode = true;
    bunStartSprite.on("pointerup", createBunPage);
    startPage.addChild(bunStartSprite);

    let dogStart = TextureCache["dog"];
    let dogWidth = 40.12;   // alter between 38 and 39? 39.6
    let dogHeight = 28;
    let clipDog = new Rectangle(6 * dogWidth, 27, dogWidth, dogHeight);
    dogStart.frame = clipDog;
    let dogStartSprite = new Sprite(dogStart);
    dogStartSprite.x = 190;
    dogStartSprite.y = 160;
    dogStartSprite.scale.x = 1.8;
    dogStartSprite.scale.y = 1.8;
    dogStartSprite.interactive = true;
    dogStartSprite.buttonMode = true;
    dogStartSprite.on("pointerup", createDogPage);
    startPage.addChild(dogStartSprite);

    makeButton((canvasWidth/2)-(buttonWidth/2), 350, 23, 0x7db4dd, "Start", startPage, createDogPage);

    // // DOG BUTTON
    // let dogButton = new Graphics();
    // dogButton.beginFill(0xcccccc);
    // dogButton.lineStyle(1, 0x000000, 0.6); // stroke width, color, alpha
    // dogButton.drawRect(0, 0, buttonWidth, buttonHeight);
    // dogButton.endFill();
    // dogButton.x = (canvasWidth/2)-(buttonWidth/2);
    // dogButton.y = 300;
    // dogButton.interactive = true;
    // dogButton.buttonMode = true;
    // dogButton.on("pointerup", createDogPage);
    // // dogButton.on('pointerover', e => e.target.alpha = 0.7);
    // // dogButton.on('pointerout', e => e.target.alpha = 1.0);
    
    // startPage.addChild(dogButton);

    // let textStyle = new PIXI.TextStyle({
    //     fill: 0x000000,
    //     fontSize: 20,
    //     fontFamily: "VT323",   // changing later
    // });

    // let dogButtonText = new PIXI.Text("Dog");
    // dogButtonText.style = textStyle;
    // dogButtonText.x = dogButton.x + 5;
    // dogButtonText.y = dogButton.y + 5;
    // dogButtonText.interactive = true;
    // dogButtonText.buttonMode = true;
    // dogButtonText.on("pointerup", createDogPage);
    // // dogButtonText.on('pointerover', e => e.target.alpha = 0.7);
    // // dogButtonText.on('pointerout', e => e.target.alpha = 1.0);
    // startPage.addChild(dogButtonText);

    // // BUN BUTTON
    // let bunButton = new Graphics();
    // bunButton.beginFill(0xcccccc);
    // bunButton.lineStyle(1, 0x000000, 0.6); // stroke width, color, alpha
    // bunButton.drawRect(0, 0, buttonWidth, buttonHeight);
    // bunButton.endFill();
    // bunButton.x = (canvasWidth/2)-(buttonWidth/2);
    // bunButton.y = dogButton.y + 35;
    // bunButton.interactive = true;
    // bunButton.buttonMode = true;
    // bunButton.on("pointerup", createBunPage);   // change function later
    // startPage.addChild(bunButton);

    // let bunButtonText = new PIXI.Text("Bun");
    // bunButtonText.style = textStyle;
    // bunButtonText.x = bunButton.x + 5;
    // bunButtonText.y = bunButton.y + 5;
    // bunButtonText.interactive = true;
    // bunButtonText.buttonMode = true;
    // bunButtonText.on("pointerup", createBunPage);
    // // bunButtonText.on('pointerover', e => e.target.alpha = 0.7);
    // // bunButtonText.on('pointerout', e => e.target.alpha = 1.0);
    // startPage.addChild(bunButtonText);
}

/*****************************
  CREATE DOG PAGE 
****************************/

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
    wd1 = walkAnim(randomInt(0, 465), randomInt(0, 475));
    wd2 = walkAnim(randomInt(0, 465), randomInt(0, 475));

    dogs = [wd1, wd2];

    sitAnim(100, 100);
    barkAnim(50, 50);

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", dogPage, createStartPage);
}

/*****************************
  CREATE BUN PAGE
******************************/

function createBunPage() {
    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = true;
    creditsPage.visible = false;
    notesPage.visible = false;

    changeBackground(0xFFFFFF, 0x000000);
    bunPage.addChild(bg);

    hopTexture = loadBunSprite();

    // start with one bun on the page
    hopAnim(randomInt(0, 380), randomInt(80, 430));

    // let increase = grow(hoppingBun, 0.25, 0.8);

    // create the menu, more buns!, and grow buttons
    makeButton(10, 10, 8, 0x58C4C6, "Main Menu", bunPage, createStartPage);
    makeButton(400, 10, 5, 0xFD4B65, "More buns!", bunPage, newBun);
    makeButton(205, 10, 18, 0xFFC43C, "Resize", bunPage, resize);
}

/*****************************
  CREATE CAT PAGE
******************************/

/*****************************
  CREATE CREDITS PAGE
******************************/

function createCreditsPage() {
    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    creditsPage.visible = true;
    notesPage.visible = false;

    changeBackground(0xFFFFFF, 0x000000);
    creditsPage.addChild(bg);

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", creditsPage, createStartPage);
}

/*****************************
  CREATE NOTES PAGE
******************************/

function createNotesPage() {
    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    creditsPage.visible = false;
    notesPage.visible = true;

    changeBackground(0xFFFFFF, 0x000000);
    notesPage.addChild(bg);

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", notesPage, createStartPage);
}

/*****************************
  LOAD VARIOUS DOG SPRITES 
****************************/

//  load sprite sheet for walking 
function loadWalkingSprite() {
    let dogWalkSheet = BaseTexture.fromImage("dog");
    let dogWalkWidth = 42;  // originally 35
    let dogWalkHeight = 24;
    let numFrames = 12;
    let walk = [];
    for (let i = 0; i < numFrames; i++) {
        // let frame = new Texture(dogWalkSheet, new Rectangle(i * dogWalkWidth, 240, dogWalkWidth, dogWalkHeight));
        let frame = new Texture(dogWalkSheet, new Rectangle(i * dogWalkWidth, 240, dogWalkWidth, dogWalkHeight));
        walk.push(frame);
    }
    return walk;
}

// load sprite sheet for sitting 
function loadSittingSprite() {
    let dogSitSheet = BaseTexture.fromImage("dog");
    let dogSitWidth = 40.12;   // alter between 38 and 39? 39.6
    let dogSitHeight = 28;
    let numFrames = 15; // 15 frames
    sit = [];
    for (let i = 0; i < numFrames; i++) {
        // let frame = new Texture(dogSitSheet, new Rectangle(i * dogSitWidth, 27, dogSitWidth, dogSitHeight));
        let frame = new Texture(dogSitSheet, new Rectangle(i * dogSitWidth, 27, dogSitWidth, dogSitHeight));
        sit.push(frame);
    }
    return sit;
}

// load sprite sheet for barking
function loadBarkingSprite() {
    let dogBarkSheet = BaseTexture.fromImage("dog");
    let dogBarkWidth = 42.2;  // originally 35, 37
    let dogBarkHeight = 28; // originally 25
    let numFrames = 13;
    let bark = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogBarkSheet, new Rectangle(i * dogBarkWidth, 58, dogBarkWidth, dogBarkHeight));
        bark.push(frame);
    }
    return bark;
}

/*****************************
  DOG ANIMATIONS
****************************/

// walking animation
function walkAnim(x, y) {
    let walkingDog = new extras.AnimatedSprite(walkTexture);
    walkingDog.x = x;
    walkingDog.y = y;
    walkingDog.animationSpeed = 1/3;
    walkingDog.loop = true;
    walkingDog.interactive = true;
    walkingDog.button = true;
    // walkingDog.on("pointerup", sitAnim(x, y));   // add event to sprite
    walkingDog.on("pointerup", function(){walkingDog.textures = sit; walkingDog.play();});   // add event to sprite

    // add the texture into the stage 
    dogPage.addChild(walkingDog);
    walkingDog.play();
    // dogPage.removeChild(walkingDog);
    // walkingDog.on("pointerup", sitAnim(x, y));
    return walkingDog;
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

/*****************************
  LOAD BUN SPRITE
****************************/

function loadBunSprite() {
    let bunSheet = BaseTexture.fromImage("bunny");
    let bunWidth = 500;  // originally 35
    let bunHeight = 270;
    let hop = [];
    hop.push(
        new Texture(bunSheet, new Rectangle(0, 0, bunWidth, bunHeight)), // frame 0
        new Texture(bunSheet, new Rectangle(bunWidth, 0, bunWidth, bunHeight)), // frame 1
        new Texture(bunSheet, new Rectangle(0, 270, bunWidth, bunHeight)), // frame 2
        new Texture(bunSheet, new Rectangle(bunWidth, 270, bunWidth, bunHeight)), // frame 3
        new Texture(bunSheet, new Rectangle(0, 540, bunWidth, bunHeight)), // frame 4
        new Texture(bunSheet, new Rectangle(bunWidth, 540, bunWidth, bunHeight)), // frame 5
        new Texture(bunSheet, new Rectangle(0, 810, bunWidth, bunHeight)), // frame 6
        new Texture(bunSheet, new Rectangle(bunWidth, 810, bunWidth, bunHeight)), // frame 7
        new Texture(bunSheet, new Rectangle(0, 1080, bunWidth, bunHeight)), // frame 8
        new Texture(bunSheet, new Rectangle(bunWidth, 1080, bunWidth, bunHeight)), // frame 9
        new Texture(bunSheet, new Rectangle(0, 1350, bunWidth, bunHeight)), // frame 10
        new Texture(bunSheet, new Rectangle(bunWidth, 1350, bunWidth, bunHeight)), // frame 11
        new Texture(bunSheet, new Rectangle(0, 1620, bunWidth, bunHeight)) // frame 12
        // new Texture(bunSheet, new Rectangle(270, 1620, bunWidth, bunHeight)) // frame 13
    );

    return hop;
}

/*****************************
  LOAD BUN SPRITE
****************************/

function hopAnim(x, y) {
    hoppingBun = new extras.AnimatedSprite(hopTexture);
    hoppingBun.x = x;
    hoppingBun.y = y;
    hoppingBun.scale.x = 0.25;
    hoppingBun.scale.y = 0.25;
    hoppingBun.animationSpeed = 1/10;
    hoppingBun.loop = true;

    // add the texture onto the stage
    bunPage.addChild(hoppingBun);
    hoppingBun.play();
}

/*****************************
  OTHER FUNCTIONS
****************************/

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

function makeButton(x, y, xOffset, color, text, pageName, targetFunction) {
    // MENU BUTTON
    let menuButton = new Graphics();
    // menuButton.beginFill(0xa6cfd5);  // turquoise
    // menuButton.beginFill(0x565254);  // dark grey
    menuButton.beginFill(color); // jet black
    menuButton.lineStyle(1, 0x000000, 0.9); // stroke width, color, alpha
    menuButton.drawRect(0, 0, buttonWidth, buttonHeight);
    menuButton.endFill();
    menuButton.x = x;
    menuButton.y = y;
    menuButton.interactive = true;
    menuButton.buttonMode = true;
    menuButton.on("pointerup", targetFunction);
    // dogButton.on('pointerover', e => e.target.alpha = 0.7);
    // dogButton.on('pointerout', e => e.target.alpha = 1.0);
    
    pageName.addChild(menuButton);

    let textStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        strokeThickness: 1,
        // stroke: 0x000000,
        dropShadow: true,
        dropShadowBlur: 0,
        dropShadowDistance: 2,
        fontSize: 20,
        fontFamily: "VT323",   // changing later
    });

    let menuButtonText = new PIXI.Text(text);
    menuButtonText.style = textStyle;
    menuButtonText.x = menuButton.x + xOffset;
    menuButtonText.y = menuButton.y + 10;
    menuButtonText.interactive = true;
    menuButtonText.buttonMode = true;
    menuButtonText.on("pointerup", targetFunction);
    // dogButtonText.on('pointerover', e => e.target.alpha = 0.7);
    // dogButtonText.on('pointerout', e => e.target.alpha = 1.0);
    pageName.addChild(menuButtonText);
}

// spawn a new bun at a random location
function newBun() {
    let xVal = randomInt(0, 380);
    let yVal = randomInt(80, 430);
    hopAnim(xVal, yVal);
    console.log("x: " + xVal + ", y: " + yVal);
}

// NEED HELP
function resize() {
    let limit = randomInt(1, 4);
    hoppingBun.scale.x = limit*0.25;
    hoppingBun.scale.y = limit*0.25;
    console.log(limit);
}

/*****************************
  GAME LOOP 
****************************/

function gameLoop() {
    // calculate how much time has passed since the last update and adjust sprites
    // accordingly
    let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt = 1/12;

    if (dogPage.visible) {
        for (let dog of dogs) {
            dog.x += 50 * dt;

            if (dog.x >= canvasWidth) {
                dog.x += 0 * dt;
            }
        }
    }
}
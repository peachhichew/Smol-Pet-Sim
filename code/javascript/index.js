import {randomInt, changeBackground, makeButton} from './utilities.js';
export {setup, gameLoop};

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
Graphics = PIXI.Graphics,
Rectangle = PIXI.Rectangle,
BaseTexture = PIXI.BaseTexture,
extras = PIXI.extras;

// width and height of the canvas
let canvasWidth = 500;
let canvasHeight = 500;

// texture and sprite for walking dog + flipped versions
let walkTexture, wd1, wd2, walkFlippedTexture, walkingDogFlipped, wdF1, wdF2;
// texture and sprite for sitting dog + flipped versions
let sitTexture, sittingDog, sitFlippedTexture, sittingDogFlipped;
// texture and sprite for barking dog + flipped versions
let barkTexture, barkingDog, barkFlippedTexture, barkingDogFlipped;
// texture and sprite for bunny
let hopTexture, hoppingBun;
// texture for walking cat and the cat sprites
let catWalkRightTexture, catWalkLeftTexture, catL1, catL2, catL3, catL4, catR1, catR2, catR3, catR4;

// arrays to keep track of the sprite textures
let walk, walkFlipped, sit, sitFlipped, bark, barkFlipped, catWalkLeft, catWalkRight;

// variable for the background
const bg = new Graphics();

// container to hold the different pages
let dogPage, startPage, bunPage, catPage, creditsPage, notesPage, notesPage2;

// arrays that hold the cat + dog sprites
let dogs, dogs2, cats, cats2;

// width of each button on the project
let buttonWidth = 90;
let buttonHeight = 30;

const app = new PIXI.Application(canvasWidth, canvasHeight);

// add the canvas to the HTML document
document.body.appendChild(app.view);

let stage;

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

    // NOTES PAGES
    notesPage = new Container();
    notesPage.visible = false;
    stage.addChild(notesPage);

    notesPage2 = new Container();
    notesPage2.visible = false;
    stage.addChild(notesPage2);

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    startPage.addChild(bg);

    createStartPage();
    
    app.ticker.add(gameLoop);
}

/*****************************
  CREATE START PAGE 
****************************/

function createStartPage() {
    // make every other page invisible except the start page
    startPage.visible = true;
    dogPage.visible = false;
    bunPage.visible = false;
    catPage.visible = false;
    creditsPage.visible = false;
    notesPage.visible = false;
    notesPage2.visible = false;

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
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

    // HIDE FOR NOW -- ADD INSTRUCTIONS LATER?
    // let notes = new PIXI.Text("Notes");
    // notes.style = infoStyle;
    // notes.x = 450;
    // notes.y = 478;
    // notes.interactive = true;
    // notes.buttonMode = true;
    // notes.on("pointerup", createNotesPage);
    // startPage.addChild(notes);

    let directions = new PIXI.Text("(Click each animal to visit its page!)");
    directions.style = infoStyle;
    directions.x = 100;
    directions.y = 300;
    startPage.addChild(directions);

    // ANIMAL IMAGES
    let bunWidth = 500;  // originally 35
    let bunHeight = 270;
    let bunStart = TextureCache["bunny"];
    let clipBun = new Rectangle(0, 0, bunWidth, bunHeight);
    bunStart.frame = clipBun;   // doesn't work??
    let bunStartSprite = new Sprite(bunStart);
    bunStartSprite.x = 230; //100
    bunStartSprite.y = 143;
    bunStartSprite.scale.x = 0.25;
    bunStartSprite.scale.y = 0.25;
    bunStartSprite.interactive = true;
    bunStartSprite.buttonMode = true;
    bunStartSprite.on("pointerup", createBunPage);
    startPage.addChild(bunStartSprite);

    let dogStart = TextureCache["dog"];
    let dogWidth = 80.24;   // 40.12 x 28
    let dogHeight = 56;
    let clipDog = new Rectangle(12 * dogWidth, 54, dogWidth, dogHeight); // 6, 27
    dogStart.frame = clipDog;
    let dogStartSprite = new Sprite(dogStart);
    dogStartSprite.x = 135; //220
    dogStartSprite.y = 157;
    // dogStartSprite.scale.x = 1.8;
    // dogStartSprite.scale.y = 1.8;
    dogStartSprite.interactive = true;
    dogStartSprite.buttonMode = true;
    dogStartSprite.on("pointerup", createDogPage);
    startPage.addChild(dogStartSprite);

    let catStart = TextureCache["cat"];
    let catWidth = 60;  // 30
    let catHeight = 66; // 33
    let clipCat = new Rectangle(434, 0, catWidth, catHeight); // 217, 0
    catStart.frame = clipCat;
    let catStartSprite = new Sprite(catStart);
    catStartSprite.x = 214; //300
    catStartSprite.y = 153;
    // catStartSprite.scale.x = 2;
    // catStartSprite.scale.y = 2;
    catStartSprite.interactive = true;
    catStartSprite.buttonMode = true;
    catStartSprite.on("pointerup", createCatPage);
    startPage.addChild(catStartSprite);

    makeButton((canvasWidth/2)-(buttonWidth/2), 360, 23, 0x7db4dd, "Start", startPage, createDogPage, buttonWidth, buttonHeight);
}

/*****************************
  CREATE DOG PAGE 
****************************/

function createDogPage() {
    startPage.visible = false;
    dogPage.visible = true;
    bunPage.visible = false;
    catPage.visible = false;
    creditsPage.visible = false;
    notesPage.visible = false;
    notesPage2.visible = false;

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    dogPage.addChild(bg);
    // load the sprite sheets into the window 
    walkTexture = loadWalkingSprite();
    sitTexture = loadSittingSprite();
    barkTexture = loadBarkingSprite();
    // call the animation functions
    wd1 = walkAnim(randomInt(0, 465), randomInt(80, 475));
    wd2 = walkAnim(randomInt(0, 465), randomInt(80, 475));

    walkFlippedTexture = loadWalkingReversedSprite();
    wdF1 = walkFlippedAnim(randomInt(0, 465), randomInt(80, 475));
    wdF2 = walkFlippedAnim(randomInt(0, 465), randomInt(80, 475));

    // insert the sprites into the arrays
    dogs2 = [wdF1, wdF2];
    dogs = [wd1, wd2];

    sitAnim(randomInt(0, 465), randomInt(80, 475));

    sitFlippedTexture = loadSittingFlippedSprite();
    sitAnimFlipped(randomInt(0, 465), randomInt(80, 475));

    barkFlippedTexture = loadBarkingFlippedSprite();

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", dogPage, createStartPage, buttonWidth, buttonHeight);
}

/*****************************
  CREATE BUN PAGE
******************************/

function createBunPage() {
    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = true;
    catPage.visible = false;
    creditsPage.visible = false;
    notesPage.visible = false;
    notesPage2.visible = false;

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    bunPage.addChild(bg);

    // load the bun sprite
    hopTexture = loadBunSprite();

    // start with one bun on the page
    hopAnim(randomInt(0, 380), randomInt(80, 430));

    // create the menu, more buns!, and resize buttons
    makeButton(10, 10, 8, 0x58C4C6, "Main Menu", bunPage, createStartPage, buttonWidth, buttonHeight);
    makeButton(400, 10, 5, 0xFD4B65, "More buns!", bunPage, newBun, buttonWidth, buttonHeight);
    makeButton(205, 10, 18, 0xFFC43C, "Resize", bunPage, resize, buttonWidth, buttonHeight);
}

/*****************************
  CREATE CAT PAGE
******************************/

function createCatPage() {
    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    catPage.visible = true;
    creditsPage.visible = false;
    notesPage.visible = false;
    notesPage2.visible = false;

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    catPage.addChild(bg);

    catWalkRightTexture = loadCatWalkRightSprite();
    catR1 = catWalkRightAnim(randomInt(0, 465), randomInt(80, 475));
    catR2 = catWalkRightAnim(randomInt(0, 465), randomInt(80, 475));
    catR3 = catWalkRightAnim(randomInt(0, 465), randomInt(80, 475));
    catR4 = catWalkRightAnim(randomInt(0, 465), randomInt(80, 475));

    catWalkLeftTexture = loadCatWalkLeftSprite();
    catL1 = catWalkLeftAnim(randomInt(0, 465), randomInt(80, 475));
    catL2 = catWalkLeftAnim(randomInt(0, 465), randomInt(80, 475));
    catL3 = catWalkLeftAnim(randomInt(0, 465), randomInt(80, 475));
    catL4 = catWalkLeftAnim(randomInt(0, 465), randomInt(80, 475));

    cats = [catR1, catR2, catR3, catR4];
    cats2 = [catL1, catL2, catL3, catL4];

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", catPage, createStartPage, buttonWidth, buttonHeight);
}

/*****************************
  CREATE CREDITS PAGE
******************************/

function createCreditsPage() {
    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    createCatPage.visible = false;
    creditsPage.visible = true;
    notesPage.visible = false;
    notesPage2.visible = false;

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    creditsPage.addChild(bg);

    // text style for paragraphs
    let paraStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 20,
        fontFamily: "VT323",
        wordWrap: true,
        wordWrapWidth: 470,
        leading: 8
    });

    let spriteTitle = new PIXI.Text("Sprites", {
        fill: 0xFFC43C,
        fontSize: 25,
        fontFamily: "VT323"
    });
    spriteTitle.x = 20;
    spriteTitle.y = 100;
    creditsPage.addChild(spriteTitle);

    let spriteText = new PIXI.Text(" • Cat: Biofunk95 @ DeviantArt (https://goo.gl/CUgsek) \n • Dog: Davidalix @ Spriters-Resource \n       (https://goo.gl/aKfHHF) \n • Bunny: Pastella @ Rebloggy (https://goo.gl/FRa4r6)");
    spriteText.style = paraStyle;
    spriteText.x = 30;
    spriteText.y = 130;
    creditsPage.addChild(spriteText);

    let resourcesTitle = new PIXI.Text("Resources", {
        fill: 0xFD4B65,
        fontSize: 25,
        fontFamily: "VT323"
    });
    resourcesTitle.x = 20;
    resourcesTitle.y = 240;
    creditsPage.addChild(resourcesTitle);

    let resourcesText = new PIXI.Text("   The following resources were used to learn more about Pixi.js: \n • Pixi.js (http://www.pixijs.com/)\n • Kittykatattack's Pixi Tutorial on GitHub \n  (https://goo.gl/fHJfFL) \n • Tonethar's Circle Blast Tutorial \n  (https://goo.gl/x896Vg)");
    resourcesText.style = paraStyle;
    resourcesText.x = 30;
    resourcesText.y = 270;
    creditsPage.addChild(resourcesText);

    let titleStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 35,
        fontFamily: "VT323",   // changing later
    });

    let title = new PIXI.Text("Credits");
    title.style = titleStyle;
    title.x = 200;
    title.y = 65;
    creditsPage.addChild(title);

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", creditsPage, createStartPage, buttonWidth, buttonHeight);
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
    notesPage2.visible = false;

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    notesPage.addChild(bg);

    let titleStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 35,
        fontFamily: "VT323",
    });

    let title = new PIXI.Text("Notes");
    title.style = titleStyle;
    title.x = 220;
    title.y = 65;
    notesPage.addChild(title);

    let inspirationTitle = new PIXI.Text("Inspiration", {
        fill: 0xFFC43C,
        fontSize: 25,
        fontFamily: "VT323"
    });
    inspirationTitle.x = 20;
    inspirationTitle.y = 100;
    notesPage.addChild(inspirationTitle);

    let paraStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 20,
        fontFamily: "VT323",   // changing later
        wordWrap: true,
        wordWrapWidth: 450,
        leading: 8
    });

    let inspiration = new PIXI.Text("   After looking at many pixelated animal gifs and sprites during my free time, I was suddenly " +  
    "inspired to create a pet simulator (hence the name 'Smol Pet Sim'). I remembered how I always wanted a " + 
    "pet when I was younger and was heavily drawn to online games such as Webkinz or Neopets. After bugging my mum " + 
    "for years, we finally got a cat (her name is Cookie!) in 2010 and that was one of the happiest days of my life.\n" + 
    "   In this project, I wanted to recreate some of the online pet interaction experience and to see how far " + 
    "I could get with the programming knowledge I accumulated in three semesters of college. Although the idea " +
    "behind Smol Pet Sim wasn't terribly complicated, the execution process was more than challenging. ");
    inspiration.style = paraStyle;
    inspiration.x = 30;
    inspiration.y = 130;
    notesPage.addChild(inspiration);

    // drawing the arrow at the bottom of the page using PIXI.Graphics
    let arrow = new Graphics();
    arrow.lineStyle(1, 0x7db4dd, 1);
    arrow.beginFill(0x7db4dd);
    arrow.moveTo(0, 20);
    arrow.lineTo(15, 0);
    arrow.lineTo(15, 10);
    arrow.lineTo(40, 10);
    arrow.lineTo(40, 30);
    arrow.lineTo(15, 30);
    arrow.lineTo(15, 40);
    arrow.endFill();
    arrow.x = 490;
    arrow.y = 465;
    arrow.scale.x = -0.65;
    arrow.scale.y = 0.65;
    arrow.buttonMode = true;
    arrow.interactive = true;
    arrow.on("pointerup", createNotesPage2);
    notesPage.addChild(arrow);
    
    makeButton(10, 10, 8, 0x58C4C6, "Main menu", notesPage, createStartPage, buttonWidth, buttonHeight);
}

function createNotesPage2() {
    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    creditsPage.visible = false;
    notesPage.visible = false;
    notesPage2.visible = true;

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    notesPage2.addChild(bg);

    let learnedTitle = new PIXI.Text("Process + Above & Beyond", {
        fill: 0xFD4B65,
        fontSize: 25,
        fontFamily: "VT323"
    });
    learnedTitle.x = 20;
    learnedTitle.y = 70;
    notesPage2.addChild(learnedTitle);

    let paraStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 20,
        fontFamily: "VT323",   // changing later
        wordWrap: true,
        wordWrapWidth: 450,
        leading: 8
    });

    let learnedText = new PIXI.Text("   I wanted the outcome to look exactly like how I pictured it in my head, or as close to it as possible. To do this, I had to: \n" + 
    " • Get more comfortable with JavaScript and learn\n   Pixi.js syntax \n" + 
    " • Learn different methods for animating sprites from\n   sprite sheets using Pixi.js \n" +
    " • Learn to display Pixi objects without an actual\n   renderer object, which was confusing at first\n" +  
    " • Make all sprites, Graphics, and Text objects\n   interactive using the mouse \n" + 
    " • Create multiple states/scenes whose visibility could\n   be turned on/off");
    learnedText.style = paraStyle;
    learnedText.x = 30;
    learnedText.y = 100;
    notesPage2.addChild(learnedText);

    let learnedText2 = new PIXI.Text("   To learn more about the resources I used to create this project, please visit the Credits page.");
    learnedText2.style = paraStyle;
    learnedText2.x = 30;
    learnedText2.y = 405;
    notesPage2.addChild(learnedText2);

    // drawing a back arrow on the page
    let arrow = new Graphics();
    arrow.lineStyle(1, 0x7db4dd, 1);
    arrow.beginFill(0x7db4dd);
    arrow.moveTo(0, 20);
    arrow.lineTo(15, 0);
    arrow.lineTo(15, 10);
    arrow.lineTo(40, 10);
    arrow.lineTo(40, 30);
    arrow.lineTo(15, 30);
    arrow.lineTo(15, 40);
    arrow.endFill();
    arrow.x = 10;
    arrow.y = 465;
    arrow.scale.x = 0.65;
    arrow.scale.y = 0.65;
    arrow.buttonMode = true;
    arrow.interactive = true;
    arrow.on("pointerup", createNotesPage);
    notesPage2.addChild(arrow);

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", notesPage2, createStartPage, buttonWidth, buttonHeight);
}

/*****************************
  LOAD VARIOUS DOG SPRITES 
****************************/

//  load sprite sheet for walking 
function loadWalkingSprite() {
    let dogWalkSheet = BaseTexture.fromImage("dog");
    let dogWalkWidth = 84;  // originally 42
    let dogWalkHeight = 48; // 24
    let numFrames = 12;
    walk = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogWalkSheet, new Rectangle(i * dogWalkWidth, 480, dogWalkWidth, dogWalkHeight)); // 240
        walk.push(frame);
    }
    return walk;
}

function loadWalkingReversedSprite() {
    let dogWalk2 = BaseTexture.fromImage("dogFlipped");
    let dogWalk2Width = 84; // originally 42
    let dogWalk2Height = 48;    // 24
    let numFrames = 12;
    walkFlipped = [];
    // manually "crop" out each sprite due to the different spacings in between each of them
    walkFlipped.push(
        new Texture(dogWalk2, new Rectangle(1672, 480, dogWalk2Width, dogWalk2Height)), // last frame, 836, 240
        new Texture(dogWalk2, new Rectangle(1588, 480, dogWalk2Width, dogWalk2Height)),  // frame 9, 794
        new Texture(dogWalk2, new Rectangle(1504, 480, dogWalk2Width, dogWalk2Height)),  // frame 8, 752
        new Texture(dogWalk2, new Rectangle(1420, 480, dogWalk2Width, dogWalk2Height)),  // frame 7, 710
        new Texture(dogWalk2, new Rectangle(1336, 480, dogWalk2Width, dogWalk2Height)),  // frame 6, 668
        new Texture(dogWalk2, new Rectangle(1252, 480, dogWalk2Width, dogWalk2Height)),  // frame 5, 626
        new Texture(dogWalk2, new Rectangle(1168, 480, dogWalk2Width, dogWalk2Height)),  // frame 4, 584
        new Texture(dogWalk2, new Rectangle(1084, 480, dogWalk2Width, dogWalk2Height)),  // frame 3, 542
        new Texture(dogWalk2, new Rectangle(1000, 480, dogWalk2Width, dogWalk2Height)),  // frame 2, 500
        new Texture(dogWalk2, new Rectangle(916, 480, dogWalk2Width, dogWalk2Height)),  // frame 1, 458
        new Texture(dogWalk2, new Rectangle(832, 480, dogWalk2Width, dogWalk2Height))  // frame 0, 416
    );
    return walkFlipped;
}

// load sprite sheet for sitting 
function loadSittingSprite() {
    let dogSitSheet = BaseTexture.fromImage("dog");
    let dogSitWidth = 84;   // 48
    let dogSitHeight = 56;  // 28
    // let numFrames = 15; // 15 frames
    sit = [];
    sit.push(
        new Texture(dogSitSheet, new Rectangle(644, 54, dogSitWidth, dogSitHeight)),    // start here, originally 322, 27
        new Texture(dogSitSheet, new Rectangle(724, 54, dogSitWidth, dogSitHeight)),    // 362, 27
        new Texture(dogSitSheet, new Rectangle(802, 54, dogSitWidth, dogSitHeight)),    // 401, 27
        new Texture(dogSitSheet, new Rectangle(882, 54, dogSitWidth, dogSitHeight)),    // 441, 27
    );
    return sit;
}

function loadSittingFlippedSprite() {
    let dogSit2 = BaseTexture.fromImage("dogFlipped");
    let dogSit2Width = 84;  // 42
    let dogSit2Height = 56; // 28
    sitFlipped = [];
    sitFlipped.push(
        new Texture(dogSit2, new Rectangle(1192, 54, dogSit2Width, dogSit2Height)),  // 596, 27
        new Texture(dogSit2, new Rectangle(1270, 54, dogSit2Width, dogSit2Height)),  // 635
        new Texture(dogSit2, new Rectangle(1348, 54, dogSit2Width, dogSit2Height)),  // 674
        new Texture(dogSit2, new Rectangle(1426, 54, dogSit2Width, dogSit2Height)),  // 713
    );
    return sitFlipped;
}

// load sprite sheet for barking
function loadBarkingSprite() {
    let dogBarkSheet = BaseTexture.fromImage("dog");
    let dogBarkWidth = 84.4;  // originally 42.2
    let dogBarkHeight = 56; // originally 28
    let numFrames = 13;
    bark = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogBarkSheet, new Rectangle(i * dogBarkWidth, 116, dogBarkWidth, dogBarkHeight)); // originally 58
        bark.push(frame);
    }
    return bark;
}

// load flipped sprite sheet for barking
function loadBarkingFlippedSprite() {
    let dogBark2 = BaseTexture.fromImage("dogFlipped");
    let dogBark2Width = 84; // 42
    let dogBark2Height = 56;    // 28
    barkFlipped = [];
    barkFlipped.push(
        new Texture(dogBark2, new Rectangle(1744, 116, dogBark2Width, dogBark2Height)), // last frame, 872, 58
        new Texture(dogBark2, new Rectangle(1660, 116, dogBark2Width, dogBark2Height)),   // 830
        new Texture(dogBark2, new Rectangle(1576, 116, dogBark2Width, dogBark2Height)),   // 788
        new Texture(dogBark2, new Rectangle(1490, 116, dogBark2Width, dogBark2Height)),   // 745
        new Texture(dogBark2, new Rectangle(1406, 116, dogBark2Width, dogBark2Height)),   // 703
        new Texture(dogBark2, new Rectangle(1322, 116, dogBark2Width, dogBark2Height)),   // 661
        new Texture(dogBark2, new Rectangle(1238, 116, dogBark2Width, dogBark2Height)),   // 619
        new Texture(dogBark2, new Rectangle(1154, 116, dogBark2Width, dogBark2Height)),   // 577
        new Texture(dogBark2, new Rectangle(1070, 116, dogBark2Width, dogBark2Height)),   // 535
        new Texture(dogBark2, new Rectangle(982, 116, dogBark2Width, dogBark2Height)),   // 491
        new Texture(dogBark2, new Rectangle(898, 116, dogBark2Width, dogBark2Height)),   // 449
        new Texture(dogBark2, new Rectangle(814, 116, dogBark2Width, dogBark2Height)),   // 407
        new Texture(dogBark2, new Rectangle(730, 116, dogBark2Width, dogBark2Height)), // first, 365
    );
    return barkFlipped;
}

/*****************************
  DOG ANIMATIONS
****************************/

// walking animation
function walkAnim(x, y) {
    let speed = 1.5;
    let direction = 1;
    let clicked = false;    // keeps track of the first click, which makes the dog sit
    // clickedSit keeps track of the second click, which makes the dog walk again but in the 
    // same direction it was walking before
    let clickedSit = false; 
    let walkingDog = new extras.AnimatedSprite(walkTexture);
    walkingDog.x = x;
    walkingDog.y = y;
    walkingDog.vy = speed * direction;
    walkingDog.animationSpeed = 1/3;
    walkingDog.loop = true;
    walkingDog.interactive = true;
    walkingDog.buttonMode = true;
    walkingDog.on("pointerup", function(){
        if (!clicked) {
            walkingDog.textures = sit; 
            walkingDog.animationSpeed = 1/5;
            walkingDog.vy = 0;  // make the velocity = 0 so the sprite stops moving
            walkingDog.play();
            clicked = true;
            clickedSit = true;
        }

        else {
            walkingDog.textures = walk;
            walkingDog.animationSpeed = 1/3;
            walkingDog.vy = speed * -direction; // make the velocity negative so the dog walks in the opposite direction
            walkingDog.play();
            clicked = false;
            // if clickedSit is false, change the velocity back to positive
            // this allows the sprite to keep walking in the same direction it originally
            // was before it started sitting
            if (clickedSit && walkingDog.scale.x == 1) {
                walkingDog.vy = speed * direction;  
                clickedSit = false;
            }

            // if clickedSit is true, change the velocity back to negative 
            else {
                walkingDog.vy = speed * -direction;
                clickedSit = true;
            }
        }
    });

    // add the sprite into the stage 
    dogPage.addChild(walkingDog);
    walkingDog.play();
    return walkingDog;
}

function walkFlippedAnim(x, y) {
    let speed = 1.5;
    let direction = 1;
    let clicked = false;
    let clickedSit = false;
    let walkingDogFlipped = new extras.AnimatedSprite(walkFlippedTexture);
    walkingDogFlipped.x = x;
    walkingDogFlipped.y = y;
    walkingDogFlipped.vy = speed * direction;
    walkingDogFlipped.animationSpeed = 1/3;
    walkingDogFlipped.loop = true;
    walkingDogFlipped.anchor.set(0.5);
    walkingDogFlipped.interactive = true;
    walkingDogFlipped.buttonMode = true;
    walkingDogFlipped.on("pointerup", function(){
        if (!clicked) {
            walkingDogFlipped.textures = sitFlipped; 
            walkingDogFlipped.animationSpeed = 1/5;
            walkingDogFlipped.vy = 0;
            walkingDogFlipped.play();
            clicked = true;
            clickedSit = true;
        }

        else {
            walkingDogFlipped.textures = walkFlipped;
            walkingDogFlipped.animationSpeed = 1/3;
            walkingDogFlipped.vy = speed * -direction;
            walkingDogFlipped.play();
            clicked = false;
            if (clickedSit && walkingDogFlipped.scale.x == 1) {
                walkingDogFlipped.vy = speed * direction;  
                clickedSit = false;
            }

            else {
                walkingDogFlipped.vy = speed * -direction;
                clickedSit = true;
            }
        }
    }); 

    // add the texture into the stage 
    dogPage.addChild(walkingDogFlipped);
    walkingDogFlipped.play();
    return walkingDogFlipped;
}

// sitting animation
function sitAnim(x, y) {
    let clicked = false;
    sittingDog = new extras.AnimatedSprite(sitTexture);
    sittingDog.x = x;
    sittingDog.y = y;
    sittingDog.animationSpeed = 1/5;
    sittingDog.loop = true;
    sittingDog.interactive = true;
    sittingDog.buttonMode = true;
    sittingDog.on("pointerup", function(){
        // if clicked is true, run the barking animation
        if (!clicked) {
            sittingDog.textures = bark;
            sittingDog.animationSpeed = 1/5;
            sittingDog.play();
            clicked = true;
        }

        else {
            sittingDog.textures = sit;
            sittingDog.animationSpeed = 1/5;
            sittingDog.play();
            clicked = false;
        }
    });
    // add the sprite onto the stage
    dogPage.addChild(sittingDog);
    sittingDog.play();
}

// sitting animation flipped
function sitAnimFlipped(x, y) {
    let clicked = false;
    sittingDogFlipped = new extras.AnimatedSprite(sitFlippedTexture);
    sittingDogFlipped.x = x;
    sittingDogFlipped.y = y;
    sittingDogFlipped.animationSpeed = 1/5;
    sittingDogFlipped.loop = true;
    sittingDogFlipped.interactive = true;
    sittingDogFlipped.buttonMode = true;
    sittingDogFlipped.on("pointerup", function(){
        if (!clicked) {
            sittingDogFlipped.textures = barkFlipped;
            sittingDogFlipped.animationSpeed = 1/5;
            sittingDogFlipped.play();
            clicked = true;
        }

        else {
            sittingDogFlipped.textures = sitFlipped;
            sittingDogFlipped.animationSpeed = 1/5;
            sittingDogFlipped.play();
            clicked = false;
        }
    });

    // add the texture onto the stage
    dogPage.addChild(sittingDogFlipped);
    sittingDogFlipped.play();
}

function barkAnim(x, y) {
    barkingDog = new PIXI.extras.AnimatedSprite(barkTexture);
    barkingDog.x = x;
    barkingDog.y = y;
    barkingDog.animationSpeed = 1/5;
    barkingDog.loop = true;

    dogPage.addChild(barkingDog);
    barkingDog.play();
}

function barkAnimFlipped(x, y) {
    barkingDogFlipped = new PIXI.extras.AnimatedSprite(barkFlippedTexture);
    barkingDogFlipped.x = x;
    barkingDogFlipped.y = y;
    barkingDogFlipped.animationSpeed = 1/5;
    barkingDogFlipped.loop = true;

    dogPage.addChild(barkingDogFlipped);
    barkingDogFlipped.play();
}

/*****************************
  LOAD BUN SPRITE
****************************/

function loadBunSprite() {
    let bunSheet = BaseTexture.fromImage("bunny");
    let bunWidth = 500;
    let bunHeight = 270;
    let hop = [];
    hop.push(
        new Texture(bunSheet, new Rectangle(0, 0, bunWidth, bunHeight)), // frame 0
        new Texture(bunSheet, new Rectangle(bunWidth, 0, bunWidth-2, bunHeight)), // frame 1
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
    );
    return hop;
}

/*****************************
  BUN ANIMATION
****************************/

function hopAnim(x, y) {
    hoppingBun = new extras.AnimatedSprite(hopTexture);
    // hoppingBun.x = x;
    // hoppingBun.y = y;
    hoppingBun.scale.x = 0.25;
    hoppingBun.scale.y = 0.25;
    hoppingBun.anchor.set(0.5);
    hoppingBun.animationSpeed = 1/10;
    hoppingBun.loop = true;
    hoppingBun.interactive = true;
    hoppingBun.buttonMode = true;
    hoppingBun.on('pointerdown', onDragStart)
    hoppingBun.on('pointerup', onDragEnd)
    hoppingBun.on('pointerupoutside', onDragEnd)
    hoppingBun.on('pointermove', onDragMove);
    // hoppingBun.on("pointerup", function() {
    //     console.log("clicked");
    //     // use boolean to check whether it's been clicked on and if the button has been clicked?
    //     // OR click and drag rabbits around?
    // });
    hoppingBun.x = x;
    hoppingBun.y = y;

    bunPage.addChild(hoppingBun);
    hoppingBun.play();
}

// DRAGGING: http://pixijs.io/examples/#/demos/dragging.js
function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

/*****************************
  LOAD CAT SPRITE
****************************/

function loadCatWalkRightSprite() {
    let catWalkRightSheet = BaseTexture.fromImage("cat");
    let catWalkRightWidth = 60; // originally 30
    let catWalkRightHeight = 66; // originally 33
    catWalkRight = [];
    catWalkRight.push(
        new Texture(catWalkRightSheet, new Rectangle(374, 138, catWalkRightWidth, catWalkRightHeight)), // frame 0, 187, 69
        new Texture(catWalkRightSheet, new Rectangle(440, 138, catWalkRightWidth, catWalkRightHeight)),  // 220
        new Texture(catWalkRightSheet, new Rectangle(506, 138, catWalkRightWidth, catWalkRightHeight))   // 253
    );
    return catWalkRight;
}

function loadCatWalkLeftSprite() {
    let catWalkLeftSheet = BaseTexture.fromImage("cat");
    let catWalkLeftWidth = 60; // originally 30
    let catWalkLeftHeight = 66; // originally 33
    catWalkLeft = [];
    catWalkLeft.push(
        new Texture(catWalkLeftSheet, new Rectangle(374, 76, catWalkLeftWidth, catWalkLeftHeight)), // frame 0, 187, 38
        new Texture(catWalkLeftSheet, new Rectangle(440, 76, catWalkLeftWidth, catWalkLeftHeight)), // 220
        new Texture(catWalkLeftSheet, new Rectangle(506, 76, catWalkLeftWidth, catWalkLeftHeight))  // 253
    );
    return catWalkLeft;
}

/*****************************
  CATS WALK ANIMATION
****************************/

function catWalkRightAnim(x, y) {
    let speed = 1.5;
    let direction = 1;
    let clicked = false;
    let walkingRightCat = new extras.AnimatedSprite(catWalkRightTexture);
    walkingRightCat.x = x;
    walkingRightCat.y = y;
    // walkingRightCat.scale.x = 2;
    // walkingRightCat.scale.y = 2;
    walkingRightCat.vy = speed * direction;
    walkingRightCat.animationSpeed = 1/10;
    walkingRightCat.loop = true;
    walkingRightCat.anchor.set(0.5);
    walkingRightCat.interactive = true;
    walkingRightCat.buttonMode = true;
    walkingRightCat.on("pointerup", function() {
        // if clicked is true + the cat is facing towards the right, flip the 
        // sprite horizontally and make it walk in the opposite direction (neg velocity)
        if (!clicked && walkingRightCat.scale.x == 1) {
            walkingRightCat.scale.x = -1;   // originally -2
            walkingRightCat.vy = speed * -direction;
            walkingRightCat.play();
        }
    
        else {
            walkingRightCat.scale.x = 1;
            walkingRightCat.vy = speed * direction;
            walkingRightCat.play();
        }
    });
    catPage.addChild(walkingRightCat);
    walkingRightCat.play();
    return walkingRightCat;
}

function catWalkLeftAnim(x, y) {
    let speed = 1.5;
    let direction = 1;
    let clicked = false; 
    let walkingLeftCat = new extras.AnimatedSprite(catWalkLeftTexture);
    walkingLeftCat.x = x;
    walkingLeftCat.y = y;
    // walkingLeftCat.scale.x = 2;
    // walkingLeftCat.scale.y = 2;
    // createCatDepth(walkingLeftCat);
    walkingLeftCat.animationSpeed = 1/10;
    walkingLeftCat.vy = speed * direction;
    walkingLeftCat.anchor.set(0.5);
    walkingLeftCat.loop = true;
    walkingLeftCat.interactive = true;
    walkingLeftCat.buttonMode = true;
    walkingLeftCat.on("pointerup", function(){
        // use the same boolean check in catWalkRightAnim to flip the cat sprite
        if (!clicked && walkingLeftCat.scale.x == 1) {
            walkingLeftCat.scale.x = -1;
            walkingLeftCat.vy = speed * -direction;
            walkingLeftCat.play();
        }

        else  {
            walkingLeftCat.scale.x = 1;
            walkingLeftCat.vy = speed * direction;
            walkingLeftCat.play();
        }
    });
    catPage.addChild(walkingLeftCat);
    walkingLeftCat.play();
    return walkingLeftCat;
}

/*****************************
  OTHER FUNCTIONS
****************************/

// // creating a Random function so we can use it to spawn sprites at random locations
// function randomInt(min, max) {
//     // Math.ceil returns the smallest int greater than or equal to the given number
//     min = Math.ceil(min);
//     max = Math.floor(max);

//     // [min, max)
//     let num = Math.floor(Math.random() * (max - min)) + min;
    
//     return num;
// }

// // changes the background color by drawing a white rectangle
// function changeBackground(color, stroke){
//     // bg = new Graphics();
//     bg.beginFill(color);
//     bg.lineStyle(1, stroke, 1);  // stroke width, color, alpha
//     bg.drawRect(1, 0, canvasWidth - 1, canvasHeight - 1);
//     bg.endFill();
//     bg.x = 0;
//     bg.y = 0;
// }

// // adding a makeButton function so we can easily create a button by giving it
// // certain parameter info
// function makeButton(x, y, xOffset, color, text, pageName, targetFunction) {
//     let menuButton = new Graphics();
//     menuButton.beginFill(color);
//     menuButton.lineStyle(1, 0x000000, 0.9); // stroke width, color, alpha
//     menuButton.drawRect(0, 0, buttonWidth, buttonHeight);
//     menuButton.endFill();
//     menuButton.x = x;
//     menuButton.y = y;
//     menuButton.interactive = true;
//     menuButton.buttonMode = true;
//     menuButton.on("pointerup", targetFunction); // targetFunction = function of the page you want to go to
//     pageName.addChild(menuButton); // add the button on to the specific page

//     // text style for the button text
//     let textStyle = new PIXI.TextStyle({
//         fill: 0xFFFFFF,
//         strokeThickness: 1,
//         dropShadow: true,
//         dropShadowBlur: 0,
//         dropShadowDistance: 2,
//         fontSize: 20,
//         fontFamily: "VT323",
//     });

//     let menuButtonText = new PIXI.Text(text);
//     menuButtonText.style = textStyle;
//     menuButtonText.x = menuButton.x + xOffset;
//     menuButtonText.y = menuButton.y + 10;
//     menuButtonText.interactive = true;
//     menuButtonText.buttonMode = true;
//     menuButtonText.on("pointerup", targetFunction);
//     pageName.addChild(menuButtonText);
// }

// spawn a new bun at a random location
function newBun() {
    let xVal = randomInt(0, 380);
    let yVal = randomInt(80, 430);
    hopAnim(xVal, yVal);
    console.log("x: " + xVal + ", y: " + yVal);
}

// uses the randomInt() function to randomly resize the buns on the page
function resize() {
    // reset back to original size once it hits 4, get original size first
    let limit = randomInt(1, 4);
    hoppingBun.scale.x = limit*0.25;
    hoppingBun.scale.y = limit*0.25;
}

// used kittykatattack's contain() function as reference, but is heavily modified
function contain(sprite, container, velocity, flipVal1, flipVal2, fromEdge) {
    let collision = undefined;

    // checks whether or not the sprite has hit the left edge
    if (sprite.x < container.x + (sprite.width - fromEdge)) { // fromEdge is used since sometimes the white space between the actual sprite + wall varies
        sprite.scale.x = flipVal1;  // if there is collision, horizontally flip the sprite
        sprite.x += 50 * velocity;  // increment the sprite's x position so it moves towards the right edge
        collision = "left";
    }

    // checks whether or not the sprite has hit the right edge
    if (sprite.x + (sprite.width - fromEdge) > container.width) {
        sprite.scale.x = flipVal2;  // if there is collision, horizontally flip the sprite 
        sprite.x -= 50 * velocity;  // decrement the sprite's x position so it moves towards the left
        collision = "right";
    }

    //Return the `collision` value
    return collision;
}

// loops through an array and checks the ORIGINAL direction of the sprite upon being spawned
// also calls the contain function so we can make the sprite move AND check for collision
function loopArray(array, velocity, flipVal1, flipVal2, dir, fromEdge) {
    for (let sprite of array) {
        if (dir == 1) {
            sprite.x += sprite.vy;
        }

        else if (dir == 2) {
            sprite.x -= sprite.vy;
        }

        let hitEdge = contain(sprite, bg, velocity, flipVal1, flipVal2, fromEdge);

        if (hitEdge === "left" || hitEdge === "right") {
            sprite.vy *= -1;    // negate the velocities to make the sprites go in the opposite direction
        }
    }
}

/*****************************
  GAME LOOP 
****************************/

function gameLoop() {
    // calculate how much time has passed since the last update and adjust sprites
    // accordingly
    let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt = 1/12;

    // if these pages are visible, loop through the arrays to check for collision + to change
    // the velocities of the sprites + x positions
    if (dogPage.visible) {
        loopArray(dogs, dt, 1, -1, 1, 7);
        loopArray(dogs2, dt, -1, 1, 2, 22);
    }

    if (catPage.visible) {
        loopArray(cats, dt, 1, -1, 1, 25);
        loopArray(cats2, dt, -1, 1, 2, 25);
    }
}
import {randomInt, changeBackground, makeButton, keyboard, hitTestRectangle} from './utilities.js';
import {Dog} from './Dog.js';
import {Bun} from './Bun.js';
import {Cat} from './Cat.js';
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
let walkTexture, wd1, wd2, walkFlippedTexture, wdF1, wdF2;
// texture and sprite for sitting dog + flipped versions
let sitTexture, sittingDog, sitFlippedTexture;
// texture and sprite for barking dog + flipped versions
let barkTexture, barkingDog, barkFlippedTexture, barkingDogFlipped;
// texture and sprite for bunny
let hopTexture, hoppingBun;
// texture for walking cat and the cat sprites
let catDownTexture, catDown, catUp, catUpTexture, catLeft, catLeftTexture, catRightTexture, catRight;
// texture and array to hold the fish
let fishTexture, fishArray;

// arrays to keep track of the sprite textures
let walk, walkFlipped, sit, sitFlipped, bark, barkFlipped, catWalkLeft, catWalkRight;
let newCat;

let barking = false;

// constant for the bg music, button presses, dog barking, and the munch sound
const bgMusic = new Howl({
    src: ['../audio/random_silly_chip_song.ogg'],
    autoplay: true, 
    loop: true, 
    volume: 0.6
 }); ;

const buttonPressed = new Howl({
    src: ['../audio/toggle_switch_2.mp3']
});

const dogBarking = new Howl({
    src: ['../audio/animals_dog_bark_springer_spaniel_003.mp3'],
    loop: true, 
    autoplay: true, 
    volume: 0.4
});

const munchSound = new Howl({
    src: ['../audio/munch.mp3'],
    loop: false
});

// variable for the background
const bg = new Graphics();

// container to hold the different pages
let dogPage, startPage, bunPage, catPage, creditsPage, instructionsPage, pausedPage;

// arrays that hold the cat + dog sprites
let dogs, dogs2, cats, cats2;

// array to hold the fish sprites
let addFishToArray = [];

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

    // INSTRUCTIONS PAGES
    instructionsPage = new Container();
    instructionsPage.visible = false;
    stage.addChild(instructionsPage);

    // PAUSED PAGE
    pausedPage = new Container();
    pausedPage.visible = false;
    stage.addChild(pausedPage);

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    startPage.addChild(bg);

    createStartPage();

    bgMusic.play();
    
    app.ticker.add(gameLoop);
}

window.onfocus = setup;

// paused method
// params: none
// returns: none
// purpose: brings up the paused screen
function paused() {
    bgMusic.pause();
    pausedPage.visible = true;
    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    catPage.visible = false;
    creditsPage.visible = false;
    instructionsPage.visible = false;

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    pausedPage.addChild(bg);

    let titleStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 35,
        fontFamily: "VT323",   // changing later
    });

    let titleText1 = new PIXI.Text("Currently paused");
    titleText1.style = titleStyle;
    titleText1.x = 140;
    titleText1.y = 250;
    pausedPage.addChild(titleText1);
}

window.onblur = paused;

/*****************************
  CREATE START PAGE 
****************************/

function createStartPage() {
    buttonPressed.play();

    // make every other page invisible except the start page
    startPage.visible = true;
    dogPage.visible = false;
    bunPage.visible = false;
    catPage.visible = false;
    creditsPage.visible = false;
    instructionsPage.visible = false;
    pausedPage.visible = false;

    // sets the barking boolean to false, so we don't hear the barking
    barking = false;

    if (barking == false) {
        dogBarking.mute();
        dogBarking.stop();
    }

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

    let instructions = new PIXI.Text("Instructions");
    instructions.style = infoStyle;
    instructions.x = 395;
    instructions.y = 478;
    instructions.interactive = true;
    instructions.buttonMode = true;
    instructions.on("pointerup", createInstructionsPage);
    startPage.addChild(instructions);

    let directions = new PIXI.Text("(Click each animal to visit its page!)");
    directions.style = infoStyle;
    directions.x = 100;
    directions.y = 300;
    startPage.addChild(directions);

    // ANIMAL IMAGES
    hopTexture = loadBunSprite();
    let bunStartSprite = new Sprite(hopTexture[0]);
    bunStartSprite.x = 230; //100
    bunStartSprite.y = 143;
    bunStartSprite.scale.x = 0.25;
    bunStartSprite.scale.y = 0.25;
    bunStartSprite.interactive = true;
    bunStartSprite.buttonMode = true;
    bunStartSprite.on("pointerup", createBunPage);
    startPage.addChild(bunStartSprite);

    walkTexture = loadWalkingSprite();
    sitTexture = loadSittingSprite();
    barkTexture = loadBarkingSprite();
    let dogStartSprite = new Sprite(sitTexture[0]);
    dogStartSprite.x = 135; //220
    dogStartSprite.y = 157;
    dogStartSprite.interactive = true;
    dogStartSprite.buttonMode = true;
    dogStartSprite.on("pointerup", createDogPage);
    startPage.addChild(dogStartSprite);

    let catWidth = 60;  // 30
    let catHeight = 66; // 33
    let clipCat = new Rectangle(434, 0, catWidth, catHeight); // 217, 0
    let catStartSprite = new Sprite(new Texture(BaseTexture.fromImage("cat"), clipCat));
    catStartSprite.x = 214; //300
    catStartSprite.y = 153;
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
    buttonPressed.play();

    startPage.visible = false;
    dogPage.visible = true;
    bunPage.visible = false;
    catPage.visible = false;
    creditsPage.visible = false;
    instructionsPage.visible = false;
    pausedPage.visible = false;    

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    dogPage.addChild(bg);

    barking = true;

    // load the sprite sheets into the window 
    walkTexture = loadWalkingSprite();
    sitTexture = loadSittingSprite();
    barkTexture = loadBarkingSprite();

    walkFlippedTexture = loadWalkingReversedSprite();
    sitFlippedTexture = loadSittingFlippedSprite();
    barkFlippedTexture = loadBarkingFlippedSprite();    

    // create new Dog objects and play them (so they animate)
    let wd1 = new Dog(walkTexture, 1/5, 1.5, 1, randomInt(0, 465), randomInt(80, 475), 1);
    let wd2 = new Dog(barkTexture, 1/4, 0, 0, randomInt(0, 465), randomInt(80, 475), 1);
    wd1.play();
    wd2.play();

    // anonymous functions that call the Dog class's dogSit method to enable interactivity for the dogs
    let makeSit = function() {
        wd1.dogSit(sitTexture, walkTexture);
    };

    let makeSitFromBark = function() {
        wd2.dogSit(sitTexture, barkTexture);
    };

    // adding a "pointerup" event to the two dogs
    wd1.on("pointerup", makeSit);
    wd2.on("pointerup", makeSitFromBark);

    dogPage.addChild(wd1);
    dogPage.addChild(wd2);

    // creatign more Dog objects and enabling interactivity
    let wdF1 = new Dog(walkTexture, 1/5, 1.5, 1, randomInt(0, 465), randomInt(80, 475), 1);
    let wdF2 = new Dog(barkFlippedTexture, 1/4, 0, 0, randomInt(0, 465), randomInt(80, 475), 1);  
    
    wdF1.on("pointerup", function() {wdF1.dogSit(sitTexture, walkTexture);});
    wdF2.on("pointerup", function() {wdF2.dogSit(sitFlippedTexture, barkFlippedTexture);});
    
    wdF1.play();
    wdF2.play();
    dogPage.addChild(wdF1);
    dogPage.addChild(wdF2);

    // insert the Dog sprites into the arrays
    dogs2 = [wdF2];
    dogs = [wd1, wd2, wdF1];

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", dogPage, createStartPage, buttonWidth, buttonHeight);
}

/*****************************
  CREATE BUN PAGE
******************************/

function createBunPage() {
    buttonPressed.play();

    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = true;
    catPage.visible = false;
    creditsPage.visible = false;
    instructionsPage.visible = false;
    pausedPage.visible = false;    

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    bunPage.addChild(bg);

    // load the bun sprite
    hopTexture = loadBunSprite();

    // start with one bun on the page
    // hopAnim(randomInt(0, 380), randomInt(80, 430));
    hoppingBun = new Bun(hopTexture, 1/10, randomInt(0, 380), randomInt(80, 430), 0.25);
    hoppingBun.updatePos(hoppingBun.x, hoppingBun.y);
    hoppingBun.anchor.set(0.5);
    hoppingBun.on('pointerdown', onDragStart);
    hoppingBun.on('pointerup', onDragEnd);
    hoppingBun.on('pointerupoutside', onDragEnd);
    hoppingBun.on('pointermove', onDragMove);
    hoppingBun.play();
    bunPage.addChild(hoppingBun);
    
    // create the menu, more buns!, and resize buttons
    makeButton(10, 10, 8, 0x58C4C6, "Main Menu", bunPage, createStartPage, buttonWidth, buttonHeight);
    makeButton(400, 10, 5, 0xFD4B65, "More buns!", bunPage, generateBun, buttonWidth, buttonHeight);
    makeButton(205, 10, 18, 0xFFC43C, "Resize", bunPage, resize, buttonWidth, buttonHeight);
}

/*****************************
  CREATE CAT PAGE
******************************/

function createCatPage() {
    buttonPressed.play();

    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    catPage.visible = true;
    creditsPage.visible = false;
    instructionsPage.visible = false;
    pausedPage.visible = false;    

    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    catPage.addChild(bg);

    // catWalkRightTexture = loadCatWalkRightSprite();
    // catR1 = catWalkRightAnim(randomInt(0, 465), randomInt(80, 475));
    // catR2 = catWalkRightAnim(randomInt(0, 465), randomInt(80, 475));
    // catR3 = catWalkRightAnim(randomInt(0, 465), randomInt(80, 475));
    // catR4 = catWalkRightAnim(randomInt(0, 465), randomInt(80, 475));

    // catWalkLeftTexture = loadCatWalkLeftSprite();
    // catL1 = catWalkLeftAnim(randomInt(0, 465), randomInt(80, 475));
    // catL2 = catWalkLeftAnim(randomInt(0, 465), randomInt(80, 475));
    // catL3 = catWalkLeftAnim(randomInt(0, 465), randomInt(80, 475));
    // catL4 = catWalkLeftAnim(randomInt(0, 465), randomInt(80, 475));

    // cats = [catR1, catR2, catR3, catR4];
    // cats2 = [catL1, catL2, catL3, catL4];

    // load the cat sprites
    catDownTexture = loadCatDown();
    catUpTexture = loadCatUp();
    catLeftTexture = loadCatLeft();
    catRightTexture = loadCatRight();

    // create a new Cat object and set its vx and vy to 0 so it doesn't move
    newCat = new Cat(catRightTexture, 1/12, randomInt(0, 465), randomInt(80, 475), 1);
    newCat.vx = 0;
    newCat.vy = 0;

    // create an anonymous function that has a Howl object constant for the cat's meow
    let meow = function() {
        const catMeow = new Howl({
            src: ['../audio/Blastwave_FX_CatMeow_SFXB.203.mp3']
        });

        catMeow.play();
    }
    // when the cat is clicked on, make it meow
    newCat.on("pointerdown", meow);

    // Arrow controls reference kittykatattack's keyboard movement section
    //Capture the keyboard arrow keys
    let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        newCat.textures = catLeftTexture;
        newCat.vx = -1;
        newCat.vy = 0;
        newCat.play();
    };

    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && newCat.vy === 0) {
            newCat.textures = catLeftTexture;
            newCat.vx = 0;
            newCat.stop();
        }
    };

    //Up
    up.press = () => {
        newCat.textures = catUpTexture;
        newCat.vy = -1;
        newCat.vx = 0;
        newCat.play();
    };
    up.release = () => {
        if (!down.isDown && newCat.vx === 0) {
            newCat.textures = catUpTexture;
            newCat.vy = 0;
            newCat.stop();
        }
    };

    //Right
    right.press = () => {
        newCat.textures = catRightTexture;
        newCat.vx = 1;
        newCat.vy = 0;
        newCat.play();
    };
    right.release = () => {
        if (!left.isDown && newCat.vy === 0) {
            newCat.textures = catRightTexture;
            newCat.vx = 0;
            newCat.stop();
        }
    };

    //Down
    down.press = () => {
        newCat.textures = catDownTexture;
        newCat.vy = 1;
        newCat.vx = 0;
        newCat.play();
    };
    down.release = () => {
        if (!up.isDown && newCat.vx === 0) {
            newCat.textures = catDownTexture;
            newCat.vy = 0;
            newCat.stop();
        }
    };

    // load the fish sprite
    let fishBunch = loadFishSprite();

    // add 5 fish onto the page and add each fish into the addFishToArray array
    for (let i = 0; i < 5; i++) {
        let fishSprite = new Sprite(fishBunch[0]);
        fishSprite.x = randomInt(0, 465);
        fishSprite.y = randomInt(80, 475);
        fishSprite.scale.x = 0.12;
        fishSprite.scale.y = 0.12;
        catPage.addChild(fishSprite);
        addFishToArray.push(fishSprite);
    }

    // animate the cat and add him onto the stage
    newCat.play();
    catPage.addChild(newCat);

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", catPage, createStartPage, buttonWidth, buttonHeight);
}

/*****************************
  CREATE CREDITS PAGE
******************************/

function createCreditsPage() {
    buttonPressed.play();

    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    createCatPage.visible = false;
    creditsPage.visible = true;
    instructionsPage.visible = false;
    pausedPage.visible = false;

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

    let spriteText = new PIXI.Text(" • Cat: Biofunk95 @ DeviantArt (https://goo.gl/CUgsek) \n • Dog: Davidalix @ Spriters-Resource \n       (https://goo.gl/aKfHHF) \n • Bunny: Pastella @ Rebloggy (https://goo.gl/FRa4r6) \n • Fish: Reddit/Minecraft (http://i.imgur.com/KjDDO.gif)");
    spriteText.style = paraStyle;
    spriteText.x = 30;
    spriteText.y = 130;
    creditsPage.addChild(spriteText);

    // text regarding the resources used
    let resourcesTitle = new PIXI.Text("Resources", {
        fill: 0xFD4B65,
        fontSize: 25,
        fontFamily: "VT323"
    });
    resourcesTitle.x = 20;
    resourcesTitle.y = 250;
    creditsPage.addChild(resourcesTitle);

    let resourcesText = new PIXI.Text("   The following resources were used for the creation of this project: \n • Pixi.js (http://www.pixijs.com/)\n • Kittykatattack's Pixi Tutorial on GitHub \n  (https://goo.gl/fHJfFL) \n • Tonethar's Circle Blast Tutorial \n  (https://goo.gl/x896Vg) \n • HowlerJS (https://howlerjs.com/) \n • Sound effects: OpenGameArt, Zapsplat, FreeSFX");
    resourcesText.style = paraStyle;
    resourcesText.x = 30;
    resourcesText.y = 280;
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

/********************************
    CREATE INSTRUCTIONS PAGE
********************************/

function createInstructionsPage() {
    buttonPressed.play();

    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    creditsPage.visible = false;
    instructionsPage.visible = true;
    pausedPage.visible = false;
    
    changeBackground(bg, 0xFFFFFF, 0x000000, canvasWidth, canvasHeight);
    instructionsPage.addChild(bg);

    let titleStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 35,
        fontFamily: "VT323",
    });

    let title = new PIXI.Text("Instructions");
    title.style = titleStyle;
    title.x = 175;
    title.y = 65;
    instructionsPage.addChild(title);

    let dogTitle = new PIXI.Text("Dog Page", {
        fill: 0xFFC43C,
        fontSize: 25,
        fontFamily: "VT323"
    });
    dogTitle.x = 20;
    dogTitle.y = 100;
    instructionsPage.addChild(dogTitle);

    let paraStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 20,
        fontFamily: "VT323",   // changing later
        wordWrap: true,
        wordWrapWidth: 450,
        leading: 8
    });

    let dogInstructions = new PIXI.Text("   Click on the initially walking dogs to make them sit or continue walking. Click on the " +
    "already barking ones to make them sit as well!");
    dogInstructions.style = paraStyle;
    dogInstructions.x = 30;
    dogInstructions.y = 130;
    instructionsPage.addChild(dogInstructions);

    let catTitle = new PIXI.Text("Cat Page", {
        fill: 0xFD4B65,
        fontSize: 25,
        fontFamily: "VT323"
    });
    catTitle.x = 20;
    catTitle.y = 220;
    instructionsPage.addChild(catTitle);

    let catInstructions = new PIXI.Text("   Use the arrow keys to make the cat move around the screen and collect fish. Click on the cat to make her meow.");
    catInstructions.style = paraStyle;
    catInstructions.x = 30;
    catInstructions.y = 250;
    instructionsPage.addChild(catInstructions);

    let bunTitle = new PIXI.Text("Rabbit Page", {
        fill: 0x7db4dd,
        fontSize: 25,
        fontFamily: "VT323"
    });
    bunTitle.x = 20;
    bunTitle.y = 340;
    instructionsPage.addChild(bunTitle);

    let bunInstructions = new PIXI.Text("   Click and drag on the rabbit to move to a new location on the " + 
    "screen. Resize the rabbit by using the 'Resize' button. Clicking on the 'More buns!' button will spawn" + 
    " a new rabbit on the screen.");
    bunInstructions.style = paraStyle;
    bunInstructions.x = 30;
    bunInstructions.y = 370;
    instructionsPage.addChild(bunInstructions);
    
    makeButton(10, 10, 8, 0x58C4C6, "Main menu", instructionsPage, createStartPage, buttonWidth, buttonHeight);
}

/*****************************
  LOAD VARIOUS DOG SPRITES 
****************************/

//  load sprite sheets for walking 
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

// load sprite sheets for sitting 
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
    // according to the value of the boolean, play or mute the barking sound
    if (barking == true) {
        dogBarking.play();
    }

    else {
        dogBarking.mute();
        dogBarking.stop();
    }

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
    // according to the value of the boolean, play or mute the barking sound
    if (barking == true) {
        dogBarking.play();
    }

    else {
        dogBarking.mute();
        dogBarking.stop();
    }

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
  LOAD BUN SPRITE
****************************/

// load the bun textures and crop the frames out from the spritesheet
function loadBunSprite() {
    let bunSheet = BaseTexture.fromImage("bunny");
    let bunWidth = 500;
    let bunHeight = 268;    // originally 270
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

// DRAGGING: http://pixijs.io/examples/#/demos/dragging.js
// references PixiJS's dragging behavior example
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
        // update the position of the object
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

/*****************************
  LOAD CAT + FISH SPRITE
****************************/

// load the cat textures for each of the directions
function loadCatDown() {
    let catDownSheet = BaseTexture.fromImage("cat");
    let catDownWidth = 60; // originally 30
    let catDownHeight = 66; // originally 33
    catDown = [];
    catDown.push(
        new Texture(catDownSheet, new Rectangle(554, 258, catDownWidth, catDownHeight)), // frame 0, 187, 69
        new Texture(catDownSheet, new Rectangle(614, 258, catDownWidth, catDownHeight)),  // 220
        new Texture(catDownSheet, new Rectangle(674, 258, catDownWidth, catDownHeight)),   // 253
        new Texture(catDownSheet, new Rectangle(614, 258, catDownWidth, catDownHeight)),   // 253
        new Texture(catDownSheet, new Rectangle(554, 258, catDownWidth, catDownHeight))   // 253
    );

    return catDown;
}

function loadCatUp() {
    let catUpSheet = BaseTexture.fromImage("cat");
    let catUpWidth = 60; // originally 30
    let catUpHeight = 66; // originally 33
    catUp = [];
    catUp.push(
        new Texture(catUpSheet, new Rectangle(554, 446, catUpWidth, catUpHeight)), // frame 0, 187, 69
        new Texture(catUpSheet, new Rectangle(614, 446, catUpWidth, catUpHeight)),  // 220
        new Texture(catUpSheet, new Rectangle(674, 446, catUpWidth, catUpHeight)),   // 253
        new Texture(catUpSheet, new Rectangle(614, 446, catUpWidth, catUpHeight)),   // 253
        new Texture(catUpSheet, new Rectangle(554, 446, catUpWidth, catUpHeight))   // 253
    );

    return catUp;
}

function loadCatLeft() {
    let catLeftSheet = BaseTexture.fromImage("cat");
    let catLeftWidth = 60; // originally 30
    let catLeftHeight = 66; // originally 33
    catLeft = [];
    catLeft.push(
        new Texture(catLeftSheet, new Rectangle(563, 324, catLeftWidth, catLeftHeight)), // frame 0, 187, 69
        new Texture(catLeftSheet, new Rectangle(623, 324, catLeftWidth, catLeftHeight)),  // 220
        new Texture(catLeftSheet, new Rectangle(690, 324, catLeftWidth, catLeftHeight)),   // 253
    );

    return catLeft;
}

function loadCatRight() {
    let catRightSheet = BaseTexture.fromImage("cat");
    let catRightWidth = 60; // originally 30
    let catRightHeight = 66; // originally 33
    catRight = [];
    catRight.push(
        new Texture(catRightSheet, new Rectangle(563, 390, catRightWidth, catRightHeight)), // frame 0, 187, 69
        new Texture(catRightSheet, new Rectangle(626, 390, catRightWidth, catRightHeight)),  // 220
        new Texture(catRightSheet, new Rectangle(690, 390, catRightWidth, catRightHeight)),   // 253
    );

    return catRight;
}

//  load sprite sheet and make textures for the fish 
function loadFishSprite() {
    let fishSheet = BaseTexture.fromImage("../images/fish.png");
    let fishWidth = 240;  // originally 42
    let fishHeight = 220; // 24
    let numFrames = 1;
    fishArray = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(fishSheet, new Rectangle(i * fishWidth, 0, fishWidth, fishHeight)); // 240
        fishArray.push(frame);
    }
    return fishArray;
}

/*****************************
  OTHER FUNCTIONS
****************************/

// generateBun method
// params: none
// returns none
// purpose: spawn a new bun at a random location. every time a new bun spawns, play a thumping sound
function generateBun() {
    const thump = new Howl({
        src: ['../audio/zapsplat_foley_feet_jump_land_carpeted_wood_floor_hard_003_16317.mp3']
    });

    thump.play();

    let xVal = randomInt(0, 380);
    let yVal = randomInt(80, 430);
    hoppingBun = new Bun(hopTexture, 1/10, xVal, yVal, 0.25);
    hoppingBun.play();
    hoppingBun.updatePos(hoppingBun.x, hoppingBun.y);
    hoppingBun.anchor.set(0.5);
    hoppingBun.on('pointerdown', onDragStart);
    hoppingBun.on('pointerup', onDragEnd);
    hoppingBun.on('pointerupoutside', onDragEnd);
    hoppingBun.on('pointermove', onDragMove);
    hoppingBun.play();
    bunPage.addChild(hoppingBun);
}

// resize method
// params: none
// returns: none
// purpose: uses the randomInt() function to resize the buns on the page. when the buns are 
// resized, play the spoink sound.
function resize() {
    // reset back to original size once it hits close to 0.6, get original size first
    const spoink = new Howl({
        src: ['../audio/cartoon_spring_bounce_twang_008.mp3']
    });

    spoink.play();

    let limit = 0.6;
    let currentSize = 0.25;
    // if the scale is less than the limit, increase the size by 1.25
    if (hoppingBun.scale.x < limit) {
        hoppingBun.scale.x *= 1.25;
        hoppingBun.scale.y *= 1.25;
    }

    // when the bun reaches a certain size, reset the size back to currentSize
    else {
        currentSize = 0.25;
        hoppingBun.scale.x = currentSize;
        hoppingBun.scale.y = currentSize;
    }
}

// used kittykatattack's contain() function as reference, but is heavily modified
// contain method
// params: sprite to check, screen container, velocity, opposite direction values, how far from edge
// returns: collision value
// purpose: checks to see whether or not the sprite has hit the edge of the screen
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

// loopArray method
// params: array to loop through, sprite velocity, opposite direction values, how far from edge
// returns: none
// purpose: loops through an array and checks the ORIGINAL direction of the sprite upon being spawned.
// also calls the contain function so we can make the sprite move AND check for collision
function loopArray(array, velocity, flipVal1, flipVal2, direction, fromEdge) {
    for (let sprite of array) {
        if (sprite.direction == 1) {
            sprite.x += sprite.vx;
        }

        else if (sprite.direction == 2) {
            sprite.x -= sprite.vx;
        }

        let hitEdge = contain(sprite, bg, velocity, flipVal1, flipVal2, fromEdge);

        if (hitEdge === "left" || hitEdge === "right") {
            sprite.vx *= -1;    // negate the velocities to make the sprites go in the opposite direction
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

    // if the dog page is visible, loop through the dog arrays to check for collision + to change
    // the velocities of the sprites + x positions
    if (dogPage.visible) {
        loopArray(dogs, dt, 1, -1, 1, 7);
        loopArray(dogs2, dt, -1, 1, 2, 22);
    }

    // if the cat page is visible, update the x and y positions and check for collision detection 
    // between the fish and cat
    if (catPage.visible) {
        newCat.x += newCat.vx;
        newCat.y += newCat.vy;
        for (let fish of addFishToArray) {
            if (hitTestRectangle(fish, newCat)) {
                // munchSound.play();
                catPage.removeChild(fish);
            }
        }
    }
}
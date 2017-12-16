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
let canvasWidth = 500;
let canvasHeight = 500;

// texture and sprite for walking dog 
let walkTexture, wd1, wd2;
// flipped versions
let walkFlippedTexture, walkingDogFlipped, wdF1, wdF2;
// texture and sprite for sitting dog
let sitTexture, sittingDog;
// flipped versions
let sitFlippedTexture, sittingDogFlipped;
// texture and sprite for barking dog
let barkTexture, barkingDog;
// flipped versions
let barkFlippedTexture, barkingDogFlipped;
// texture and sprite for bunny
let hopTexture, hoppingBun;
// texture and sprite for walking cat
let catWalkRightTexture, catWalkLeftTexture, catL1, catL2, catL3, catL4, catR1, catR2, catR3, catR4;

// arrays to keep track of the cats + their direction
let catWalkLeft, catWalkRight;

// variable for the background
const bg = new Graphics();

// container to hold the sprites' pages
let dogPage, startPage, bunPage, catPage;

let walk, walkFlipped, sit, sitFlipped, bark, barkFlipped;

let dogs, dogs2, cats, cats2;

let buttonWidth = 90; // originally 60, 25
let buttonHeight = 30;

const app = new PIXI.Application(canvasWidth,canvasHeight);

// add the canvas to the HTML document
document.body.appendChild(app.view);

let stage;

loader
    .add("dog", "../images/pupper/shiba1.png")
    .add("dogFlipped", "../images/pupper/shiba1-flipped.png")
    .add("bunny", "../images/bun/bun.png")
    .add("cat", "../images/catses/catses2.png")
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
    
    app.ticker.add(gameLoop);
}

/*****************************
  CREATE START PAGE 
****************************/

function createStartPage() {
    startPage.visible = true;
    dogPage.visible = false;
    bunPage.visible = false;
    catPage.visible = false;
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
    dogStartSprite.x = 220;
    dogStartSprite.y = 162;
    dogStartSprite.scale.x = 1.8;
    dogStartSprite.scale.y = 1.8;
    dogStartSprite.interactive = true;
    dogStartSprite.buttonMode = true;
    dogStartSprite.on("pointerup", createDogPage);
    startPage.addChild(dogStartSprite);

    makeButton((canvasWidth/2)-(buttonWidth/2), 350, 23, 0x7db4dd, "Start", startPage, createDogPage);
    makeButton((canvasWidth/2)-(buttonWidth/2), 390, 23, 0x7db4dd, "cat", startPage, createCatPage);
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

    changeBackground(0xFFFFFF, 0x000000);
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

    dogs2 = [wdF1, wdF2];
    dogs = [wd1, wd2];

    sitAnim(randomInt(0, 465), randomInt(80, 475));
    // barkAnim(50, 50);

    sitFlippedTexture = loadSittingFlippedSprite();
    sitAnimFlipped(randomInt(0, 465), randomInt(80, 475));

    barkFlippedTexture = loadBarkingFlippedSprite();
    // barkAnimFlipped(20, 310);

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", dogPage, createStartPage);
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

function createCatPage() {
    startPage.visible = false;
    dogPage.visible = false;
    bunPage.visible = false;
    catPage.visible = true;
    creditsPage.visible = false;
    notesPage.visible = false;

    changeBackground(0xFFFFFF, 0x000000);
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

    // cats = [catR1, catR2, catR3, catR4];
    cats = [catR1];
    cats2 = [catL1, catL2, catL3, catL4];
    // cats2 = [catL1];

    makeButton(10, 10, 8, 0x58C4C6, "Main menu", catPage, createStartPage);
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

    changeBackground(0xFFFFFF, 0x000000);
    creditsPage.addChild(bg);

    let titleStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 20,
        fontFamily: "VT323",   // changing later
        wordWrap: true,
        wordWrapWidth: 490,
        // lineHeight: 20,
        leading: 8
    });

    let titleText1 = new PIXI.Text("     Lorem ipsum dolor sit amet, ludus commodo lucilius ius et, et quot definitionem sit. Mazim insolens maiestatis an vix, te mea nullam commodo appetere. Eu dolor corrumpit eos. Tollit conclusionemque ei mei. Deleniti cotidieque concludaturque te sea, eu vel aliquam reprehendunt.");
    titleText1.style = titleStyle;
    titleText1.x = 10;
    titleText1.y = 100;
    // titleText1.wordWrap = true;
    // titleText1.wordWrapWidth = 100;
    creditsPage.addChild(titleText1);

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
    walk = [];
    for (let i = 0; i < numFrames; i++) {
        // let frame = new Texture(dogWalkSheet, new Rectangle(i * dogWalkWidth, 240, dogWalkWidth, dogWalkHeight));
        let frame = new Texture(dogWalkSheet, new Rectangle(i * dogWalkWidth, 240, dogWalkWidth, dogWalkHeight));
        walk.push(frame);
    }
    return walk;
}

function loadWalkingReversedSprite() {
    let dogWalk2 = BaseTexture.fromImage("dogFlipped");
    let dogWalk2Width = 42;
    let dogWalk2Height = 24;
    let numFrames = 12; // somehow 10 
    walkFlipped = [];
    // for (let i = 0; i < numFrames; i++) {
    //     // let frame = new Texture(dogWalkSheet, new Rectangle(i * dogWalkWidth, 240, dogWalkWidth, dogWalkHeight));
    //     let frame = new Texture(dogWalk2, new Rectangle(416 + (dogWalk2Width * i), 240, dogWalk2Width, dogWalk2Height));
    //     walkFlipped.push(frame);
    // }
    walkFlipped.push(
        new Texture(dogWalk2, new Rectangle(836, 240, dogWalk2Width, dogWalk2Height)), // last frame
        new Texture(dogWalk2, new Rectangle(794, 240, dogWalk2Width, dogWalk2Height)),  // frame 9
        new Texture(dogWalk2, new Rectangle(752, 240, dogWalk2Width, dogWalk2Height)),  // frame 8
        new Texture(dogWalk2, new Rectangle(710, 240, dogWalk2Width, dogWalk2Height)),  // frame 7
        new Texture(dogWalk2, new Rectangle(668, 240, dogWalk2Width, dogWalk2Height)),  // frame 6
        new Texture(dogWalk2, new Rectangle(626, 240, dogWalk2Width, dogWalk2Height)),  // frame 5
        new Texture(dogWalk2, new Rectangle(584, 240, dogWalk2Width, dogWalk2Height)),  // frame 4
        new Texture(dogWalk2, new Rectangle(542, 240, dogWalk2Width, dogWalk2Height)),  // frame 3
        new Texture(dogWalk2, new Rectangle(500, 240, dogWalk2Width, dogWalk2Height)),  // frame 2
        new Texture(dogWalk2, new Rectangle(458, 240, dogWalk2Width, dogWalk2Height)),  // frame 1
        new Texture(dogWalk2, new Rectangle(416, 240, dogWalk2Width, dogWalk2Height))  // frame 0
    );
    return walkFlipped;
}

// load sprite sheet for sitting 
function loadSittingSprite() {
    let dogSitSheet = BaseTexture.fromImage("dog");
    let dogSitWidth = 42;   // alter between 38 and 39? 39.6, 40.12
    let dogSitHeight = 28;
    // let numFrames = 15; // 15 frames
    sit = [];
    // for (let i = 0; i < numFrames; i++) {
    //     let frame = new Texture(dogSitSheet, new Rectangle(i * dogSitWidth, 27, dogSitWidth, dogSitHeight));
    //     sit.push(frame);
    // }
    sit.push(
        // new Texture(dogSitSheet, new Rectangle(4, 27, dogSitWidth, dogSitHeight)), // frame 0
        // new Texture(dogSitSheet, new Rectangle(42, 27, dogSitWidth, dogSitHeight)),
        // new Texture(dogSitSheet, new Rectangle(84, 27, dogSitWidth, dogSitHeight)),
        // new Texture(dogSitSheet, new Rectangle(126, 27, dogSitWidth, dogSitHeight)),
        // new Texture(dogSitSheet, new Rectangle(167, 27, dogSitWidth, dogSitHeight)),
        // new Texture(dogSitSheet, new Rectangle(205, 27, dogSitWidth, dogSitHeight)),
        // new Texture(dogSitSheet, new Rectangle(245, 27, dogSitWidth, dogSitHeight)),
        // new Texture(dogSitSheet, new Rectangle(285, 27, dogSitWidth, dogSitHeight)),
        new Texture(dogSitSheet, new Rectangle(322, 27, dogSitWidth, dogSitHeight)),    // start here
        new Texture(dogSitSheet, new Rectangle(362, 27, dogSitWidth, dogSitHeight)),
        new Texture(dogSitSheet, new Rectangle(401, 27, dogSitWidth, dogSitHeight)),
        new Texture(dogSitSheet, new Rectangle(441, 27, dogSitWidth, dogSitHeight)),
        // new Texture(dogSitSheet, new Rectangle(481, 27, dogSitWidth, dogSitHeight)),
        // new Texture(dogSitSheet, new Rectangle(521, 27, dogSitWidth, dogSitHeight)),
        // new Texture(dogSitSheet, new Rectangle(563, 27, dogSitWidth, dogSitHeight))
    );
    return sit;
}

function loadSittingFlippedSprite() {
    let dogSit2 = BaseTexture.fromImage("dogFlipped");
    let dogSit2Width = 42;
    let dogSit2Height = 28;
    sitFlipped = [];
    sitFlipped.push(
        // new Texture(dogSit2, new Rectangle(315, 27, dogSit2Width, dogSit2Height)),   // frame 0
        // new Texture(dogSit2, new Rectangle(357, 27, dogSit2Width, dogSit2Height)),
        // new Texture(dogSit2, new Rectangle(399, 27, dogSit2Width, dogSit2Height)),
        // new Texture(dogSit2, new Rectangle(439, 27, dogSit2Width, dogSit2Height)),
        // new Texture(dogSit2, new Rectangle(477, 27, dogSit2Width, dogSit2Height)),
        // new Texture(dogSit2, new Rectangle(517, 27, dogSit2Width, dogSit2Height)),
        // new Texture(dogSit2, new Rectangle(517, 27, dogSit2Width, dogSit2Height)),
        // new Texture(dogSit2, new Rectangle(557, 27, dogSit2Width, dogSit2Height)),
        new Texture(dogSit2, new Rectangle(596, 27, dogSit2Width, dogSit2Height)),
        new Texture(dogSit2, new Rectangle(635, 27, dogSit2Width, dogSit2Height)),
        new Texture(dogSit2, new Rectangle(674, 27, dogSit2Width, dogSit2Height)),
        new Texture(dogSit2, new Rectangle(713, 27, dogSit2Width, dogSit2Height)),
        // new Texture(dogSit2, new Rectangle(752, 27, dogSit2Width, dogSit2Height)),
        // new Texture(dogSit2, new Rectangle(794, 27, dogSit2Width, dogSit2Height)),
        // new Texture(dogSit2, new Rectangle(836, 27, dogSit2Width, dogSit2Height)),
    );
    return sitFlipped;
}

// load sprite sheet for barking
function loadBarkingSprite() {
    let dogBarkSheet = BaseTexture.fromImage("dog");
    let dogBarkWidth = 42.2;  // originally 35, 37
    let dogBarkHeight = 28; // originally 25
    let numFrames = 13;
    bark = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogBarkSheet, new Rectangle(i * dogBarkWidth, 58, dogBarkWidth, dogBarkHeight));
        bark.push(frame);
    }
    return bark;
}

// load flipped sprite sheet for barking
function loadBarkingFlippedSprite() {
    let dogBark2 = BaseTexture.fromImage("dogFlipped");
    let dogBark2Width = 42;
    let dogBark2Height = 28;
    barkFlipped = [];
    barkFlipped.push(
        new Texture(dogBark2, new Rectangle(872, 58, dogBark2Width, dogBark2Height)), // last frame
        new Texture(dogBark2, new Rectangle(830, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(788, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(745, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(703, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(661, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(619, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(577, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(535, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(491, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(449, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(407, 58, dogBark2Width, dogBark2Height)),
        new Texture(dogBark2, new Rectangle(365, 58, dogBark2Width, dogBark2Height)), // first
    );
    return barkFlipped;
}

/*****************************
  DOG ANIMATIONS
****************************/

// walking animation
function walkAnim(x, y) {
    let clickedSit = false;
    let speed = 1.5;
    let direction = 1;
    let clicked = false;
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
            walkingDog.vy = 0;
            walkingDog.play();
            clicked = true;
            clickedSit = true;
        }

        else {
            walkingDog.textures = walk;
            walkingDog.animationSpeed = 1/3;
            walkingDog.vy = speed * -direction;
            walkingDog.play();
            clicked = false;
            if (clickedSit && walkingDog.scale.x == 1) {
                walkingDog.vy = speed * direction;  
                clickedSit = false;
            }

            else {
                walkingDog.vy = speed * -direction;
                clickedSit = true;
            }
        }
    });

    // add the texture into the stage 
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
    // add the texture onto the stage
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

    // add texture onto stage
    dogPage.addChild(barkingDog);
    barkingDog.play();
}

function barkAnimFlipped(x, y) {
    barkingDogFlipped = new PIXI.extras.AnimatedSprite(barkFlippedTexture);
    barkingDogFlipped.x = x;
    barkingDogFlipped.y = y;
    barkingDogFlipped.animationSpeed = 1/5;
    barkingDogFlipped.loop = true;

    // add texture onto stage
    dogPage.addChild(barkingDogFlipped);
    barkingDogFlipped.play();
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
    );

    return hop;
}

/*****************************
  BUN ANIMATION
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
  LOAD CAT SPRITE
****************************/

function loadCatWalkRightSprite() {
    let catWalkRightSheet = BaseTexture.fromImage("cat");
    let catWalkRightWidth = 30; // originally 40
    let catWalkRightHeight = 33; // originally 40
    catWalkRight = [];
    catWalkRight.push(
        new Texture(catWalkRightSheet, new Rectangle(187, 69, catWalkRightWidth, catWalkRightHeight)), // frame 0
        new Texture(catWalkRightSheet, new Rectangle(220, 69, catWalkRightWidth, catWalkRightHeight)),
        new Texture(catWalkRightSheet, new Rectangle(253, 69, catWalkRightWidth, catWalkRightHeight))
    );

    return catWalkRight;
}

function loadCatWalkLeftSprite() {
    let catWalkLeftSheet = BaseTexture.fromImage("cat");
    let catWalkLeftWidth = 30; // originally 40
    let catWalkLeftHeight = 33; // originally 40
    catWalkLeft = [];
    catWalkLeft.push(
        new Texture(catWalkLeftSheet, new Rectangle(187, 38, catWalkLeftWidth, catWalkLeftHeight)), // frame 0
        new Texture(catWalkLeftSheet, new Rectangle(220, 38, catWalkLeftWidth, catWalkLeftHeight)),
        new Texture(catWalkLeftSheet, new Rectangle(253, 38, catWalkLeftWidth, catWalkLeftHeight))
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
    let clickedOnce;
    let walkingRightCat = new extras.AnimatedSprite(catWalkRightTexture);
    walkingRightCat.x = x;
    walkingRightCat.y = y;
    walkingRightCat.scale.x = 2;
    walkingRightCat.scale.y = 2;
    walkingRightCat.vy = speed * direction;
    // createCatDepth(walkingRightCat);
    walkingRightCat.animationSpeed = 1/10;
    walkingRightCat.loop = true;
    walkingRightCat.anchor.set(0.5);
    walkingRightCat.interactive = true;
    walkingRightCat.buttonMode = true;
    walkingRightCat.on("pointerup", function() {
        if (!clicked && walkingRightCat.scale.x == 2) {
            // walkingRightCat.textures = catWalkLeft; 
            walkingRightCat.scale.x = -2;
            walkingRightCat.vy = speed * -direction;
            walkingRightCat.play();
            // clicked = true;
            console.log(clicked + " " + walkingRightCat.scale.x);
        }
    
        else {
            // walkingRightCat.textures = catWalkRight; 
            walkingRightCat.scale.x = 2;
            walkingRightCat.vy = speed * direction;
            walkingRightCat.play();
            // clicked = false;
            console.log(clicked + " " + walkingRightCat.scale.x);
        }
    });

    // add the texture onto the stage
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
    walkingLeftCat.scale.x = 2;
    walkingLeftCat.scale.y = 2;
    // createCatDepth(walkingLeftCat);
    walkingLeftCat.animationSpeed = 1/10;
    walkingLeftCat.vy = speed * direction;
    walkingLeftCat.anchor.set(0.5);
    walkingLeftCat.loop = true;
    walkingLeftCat.interactive = true;
    walkingLeftCat.buttonMode = true;
    console.log(walkingLeftCat.scale.x);
    // TOGGLE BACK AND FORTH BETWEEN LEFT AND RIGHT ANIM
    walkingLeftCat.on("pointerup", function(){
        if (!clicked && walkingLeftCat.scale.x == 2) { //2
            // walkingLeftCat.textures = catWalkRight; 
            walkingLeftCat.scale.x = -2; //-2
            walkingLeftCat.vy = speed * -direction;
            walkingLeftCat.play();
            // clicked = true;
            // console.log(clicked + " x " + walkingLeftCat.scale.x);
            console.log("a " + walkingLeftCat.scale.x);
        }

        else  {
            // walkingLeftCat.textures = catWalkLeft; 
            walkingLeftCat.scale.x = 2; //2
            walkingLeftCat.vy = speed * direction;
            walkingLeftCat.play();
            // clicked = false;
            // console.log(clicked + " " + walkingLeftCat.scale.x);
            console.log("b " + walkingLeftCat.scale.x);
        }
    });

    // add the texture onto the stage
    catPage.addChild(walkingLeftCat);
    walkingLeftCat.play();
    return walkingLeftCat;
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
    pageName.addChild(menuButtonText);
}

// spawn a new bun at a random location
function newBun() {
    let xVal = randomInt(0, 380);
    let yVal = randomInt(80, 430);
    hopAnim(xVal, yVal);
    console.log("x: " + xVal + ", y: " + yVal);
}

function resize() {
    let limit = randomInt(1, 4);
    hoppingBun.scale.x = limit*0.25;
    hoppingBun.scale.y = limit*0.25;
    // console.log(limit);
}

function contain(sprite, container, velocity, flipVal1, flipVal2, fromEdge) {
    let collision = undefined;

    //Left
    if (sprite.x < container.x + (sprite.width - fromEdge)) {
        // sprite.x = container.x; //22
        sprite.scale.x = flipVal1; // -1 for Flipped
        sprite.x += 50 * velocity;
        collision = "left";
        console.log("hit wall L " + sprite.scale.x);
    }

    //Right
    if (sprite.x + (sprite.width - fromEdge) > container.width) {
        // sprite.x = container.width - sprite.width;
        sprite.scale.x = flipVal2;     // 1 for flipped
        sprite.x -= 50 * velocity;
        collision = "right";
        console.log("hit wall R " + sprite.scale.x);
    }

    //Return the `collision` value
    return collision;
}

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
            // createCatDepth(sprite, -1);
            sprite.vy *= -1;
        }
    }
}

// creates a sense of depth for the cat sprites by changing the scale
function createCatDepth(sprite) {
    if (sprite.y >= 80 && sprite.y < 160) {
        sprite.scale.x = 1;
        sprite.scale.y = 1;
    }

    else if (sprite.y >= 160 && sprite.y < 240) {
        sprite.scale.x = 2;
        sprite.scale.y = 2;
    }

    else if (sprite.y >= 240 && sprite.y < 2320) {
        sprite.scale.x = 3;
        sprite.scale.y = 3;
    }

    else if (sprite.y >= 320 && sprite.y < 400) {
        sprite.scale.x = 4;
        sprite.scale.y = 4;
    }

    else if (sprite.y >= 400 && sprite.y < 500) {
        sprite.scale.x = 5;
        sprite.scale.y = 5;
    }

    return sprite.scale.x;
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
        loopArray(dogs, dt, 1, -1, 1, 7);
        loopArray(dogs2, dt, -1, 1, 2, 22);
    }

    if (catPage.visible) {
        // make the cat walking towards the right increase in size
        // if (walkingRightCat.scale.x < 2 && walkingRightCat.scale.x >= 1
        //     && walkingRightCat.scale.y < 2 && walkingRightCat.scale.y >= 1) {
        //     walkingRightCat.scale.x = walkingRightCat.scale.x + 0.01;
        //     walkingRightCat.scale.y = walkingRightCat.scale.y + 0.01;
        //     // console.log("x: " + walkingRightCat.scale.x);
        //     // console.log(" y: " + walkingRightCat.scale.y);
        // }
    
        // else {
        //     walkingRightCat.scale.x = 2;
        //     walkingRightCat.scale.y = 2;
        // }
        loopArray(cats, dt, 2, -2, 1, 25);
        loopArray(cats2, dt, -2, 2, 2, 25);
    }

    /* LOGIC FOR MAKING THE DOG GO BACK AND FORTH 
    let dir = right; OR dog1 = visible, dog2 = invisible
    if (dir = right) {
        if (dog1.x <= edge) {
            dog1.x = dog1.x + 50;
        }

        else {
            dir = left;
            hide dog1, show dog2
        }
    }
    if (dir = left) {
        if (dog2.x >= edge) {
            dog2.x = dog2.x + 50;
        }

        else {
            dir = right; 
            hide dog2, show dog1
        }
    }
    */
}
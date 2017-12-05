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
    Rectangle = PIXI.Rectangle;

    // create the canvas
var stage = new Container(),
    renderer = autoDetectRenderer(500, 500);

// add the canvas to the HTML document
document.body.appendChild(renderer.view);

renderer.render(stage);

// makes the render stay relative to the position of the container of the page?
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.backgroundColor = 0x78c380;
// make the renderer size equal to the size of the window
// renderer.resize(window.innerWidth, window.innerHeight);
renderer.resize(500, 500);

// load the sprites
loader
    .add("cat", "../images/catses/catses.png")
    .load(setup);

// bun hopping
var cat;
var catWalk = [];
var catTexture;
// var bunY = 240;
var catWidth = 32;
var catHeight = 32;
// var bunWidth = 100;
// var bunHeight = 170;

// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

function setup() {
    catTexture = loader.resources["cat"].texture;
    // add new "cropped" parts of the sprite into the run array of frames
    catWalk.push(
        new Rectangle(0, 64, catWidth, catHeight), // frame 0
        new Rectangle(32, 64, catWidth, catHeight), // frame 1
        new Rectangle(64, 64, catWidth, catHeight), // frame 2
        new Rectangle(96, 64, catWidth, catHeight), // frame 3
        new Rectangle(128, 64, catWidth, catHeight), // frame 4
        new Rectangle(160, 64, catWidth, catHeight), // frame 5
        new Rectangle(192, 64, catWidth, catHeight), // frame 6
        new Rectangle(224, 64, catWidth, catHeight), // frame 7
        new Rectangle(256, 64, catWidth, catHeight), // frame 8
        new Rectangle(288, 64, catWidth, catHeight), // frame 9
        new Rectangle(320, 64, catWidth, catHeight), // frame 10
        new Rectangle(352, 64, catWidth, catHeight), // frame 11
    );

    // make the frame of the texture start from the first frame
    catTexture.frame = catWalk[0];
    // create a new dog sprite based on the texture that was just created
    cat = new Sprite(catTexture);
    // move the dog sprite to the center of the window
    // dogWalk.x = window.innerWidth/2;
    // dogWalk.y = window.innerHeight/2;
    cat.x = 0;
    cat.y = 0;
    // // opt-in to interactivity
    // dogWalk.interactive = true;
    // // show hand cursor
    // dogWalk.buttonMode = true;
    // // pointers normalize touch and mouse
    // dogWalk.on('pointerdown', onClick);
    // // add the dog to the stage and render it
    stage.addChild(cat);
    renderer.render(stage);
}

function gameLoop(){
    // loop this function 60 times per second
    var f = requestAnimationFrame(gameLoop);
    // make the entire animation loop, not just a part of it
    catTexture.frame = catWalk[Math.floor((f % 120)/12)];
    // bunTexture.frame = hop[0];
    stage.removeChild(cat);
    cat = new Sprite(catTexture);
    // originally window.innerHeight/Width / 2
    cat.x = 0;
    cat.y = 0;
    stage.addChild(cat);
    renderer.render(stage);
}

// start the game loop
gameLoop();
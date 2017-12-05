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
renderer.backgroundColor = 0xffffff;
// make the renderer size equal to the size of the window
// renderer.resize(window.innerWidth, window.innerHeight);
renderer.resize(500, 500);

// load the sprites
loader
    .add("bunny", "../images/bun/bun.png")
    .load(setup);

// bun hopping
var bun;
var hop = [];
var bunTexture;
// var bunY = 240;
var bunWidth = 500;
var bunHeight = 270;
// var bunWidth = 100;
// var bunHeight = 170;

// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

function setup() {
    bunTexture = loader.resources["bunny"].texture;
    // add new "cropped" parts of the sprite into the run array of frames
    hop.push(
        new Rectangle(0, 0, bunWidth, bunHeight), // frame 0
        new Rectangle(270, 0, bunWidth, bunHeight), // frame 1
        new Rectangle(0, 270, bunWidth, bunHeight), // frame 2
        new Rectangle(270, 270, bunWidth, bunHeight), // frame 3
        new Rectangle(0, 540, bunWidth, bunHeight), // frame 4
        new Rectangle(270, 540, bunWidth, bunHeight), // frame 5
        new Rectangle(0, 810, bunWidth, bunHeight), // frame 6
        new Rectangle(270, 810, bunWidth, bunHeight), // frame 7
        new Rectangle(0, 1080, bunWidth, bunHeight), // frame 8
        new Rectangle(270, 1080, bunWidth, bunHeight), // frame 9
        new Rectangle(0, 1350, bunWidth, bunHeight), // frame 10
        new Rectangle(270, 1350, bunWidth, bunHeight), // frame 11
        new Rectangle(0, 1620, bunWidth, bunHeight), // frame 12
        new Rectangle(270, 1620, bunWidth, bunHeight), // frame 13
        // new Rectangle(456, 238, 38, 25) // frame 12
    );

    // make the frame of the texture start from the first frame
    bunTexture.frame = hop[0];
    // create a new dog sprite based on the texture that was just created
    bun = new Sprite(bunTexture);
    // move the dog sprite to the center of the window
    // dogWalk.x = window.innerWidth/2;
    // dogWalk.y = window.innerHeight/2;
    bun.x = 0;
    bun.y = 0;
    // // opt-in to interactivity
    // dogWalk.interactive = true;
    // // show hand cursor
    // dogWalk.buttonMode = true;
    // // pointers normalize touch and mouse
    // dogWalk.on('pointerdown', onClick);
    // // add the dog to the stage and render it
    stage.addChild(bun);
    renderer.render(stage);
}

function gameLoop(){
    // loop this function 60 times per second
    var f = requestAnimationFrame(gameLoop);
    // make the entire animation loop, not just a part of it
    bunTexture.frame = hop[Math.floor((f % 360)/48)];
    // bunTexture.frame = hop[0];
    stage.removeChild(bun);
    bun = new Sprite(bunTexture);
    // originally window.innerHeight/Width / 2
    bun.x = 0;
    bun.y = 0;
    bun.scale.x = 0.5;
    bun.scale.y = 0.5;
    stage.addChild(bun);
    renderer.render(stage);
}

// start the game loop
gameLoop();
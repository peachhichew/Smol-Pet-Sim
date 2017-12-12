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

// texture for walking dog 
var walkTexture;
// texture for sitting dog
var sitTexture;
// actual walking dog sprite
let walkingDog;
// sitting dog sprite
let sittingDog;

// container to hold the sprites
var dogScene;

const app = new PIXI.Application(500,500);
// renderer = autoDetectRenderer(500, 500);

// add the canvas to the HTML document
document.body.appendChild(app.view);

let stage;

// renderer.render(stage);

loader
    .add("dog", "../images/pupper/shiba.png")
    .add("dogSitting", "../images/pupper/shiba.png")
    .load(setup);

function setup() {
    stage = app.stage;
    dogScene = new Container();
    stage.addChild(dogScene);
    // load the sprite sheets into the window 
    walkTexture = loadSpriteSheet();
    sitTexture = loadSittingSprite();
    // call the animation functions
    walkAnim(0, 0);
    sitAnim(100, 100);
    // call the gameLoop function to make the animation work 
    app.ticker.add(gameLoop);
}

//  load sprite sheet for walking 
function loadSpriteSheet() {
    let dogWalkSheet = PIXI.BaseTexture.fromImage("dog");
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
    let dogSitSheet = PIXI.BaseTexture.fromImage("dogSitting");
    let dogSitWidth = 35;
    let dogSitHeight = 25;
    let numFrames = 15;
    let sit = [];
    for(let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogSitSheet, new Rectangle(i * dogSitWidth, 28, dogSitWidth, dogSitHeight));
        sit.push(frame);
    }
    return sit;
}

// walking animation
function walkAnim(x, y) {
    walkingDog = new PIXI.extras.AnimatedSprite(walkTexture);
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
    sittingDog = new PIXI.extras.AnimatedSprite(sitTexture);
    sittingDog.x = x;
    sittingDog.y = y;
    sittingDog.animationSpeed = 1/5;
    sittingDog.loop = true;

    // add the texture onto the stage
    dogScene.addChild(sittingDog);
    sittingDog.play();
}

function gameLoop() {
    // calculate how much time has passed since the last update and adjust sprites
    // accordingly
    let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt = 1/12;
}
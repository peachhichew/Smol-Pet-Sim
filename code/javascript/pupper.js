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

var walkTexture;
var dogScene;
let walkingDog;

const app = new PIXI.Application(500,500);
// renderer = autoDetectRenderer(500, 500);

// add the canvas to the HTML document
document.body.appendChild(app.view);

let stage;

// renderer.render(stage);

loader
    .add("dog", "../images/pupper/shiba.png")
    .add("dogSitting", "../images/pupper/shiba.png")
    // .add("../images/pupper/walk/shiba_1.png")
    // .add("../images/pupper/walk/shiba_2.png")
    // .add("../images/pupper/walk/shiba_3.png")
    // .add("../images/pupper/walk/shiba_4.png")
    // .add("../images/pupper/walk/shiba_5.png")
    // .add("../images/pupper/walk/shiba_6.png")
    // .add("../images/pupper/walk/shiba_7.png")
    // .add("../images/pupper/walk/shiba_8.png")
    // .add("../images/pupper/walk/shiba_9.png")
    // .add("../images/pupper/walk/shiba_10.png")
    // .add("../images/pupper/walk/shiba_11.png")
    // .add("../images/pupper/walk/shiba_12.png")
    .load(setup);

function loadSpriteSheet() {
    let dogWalkSheet = PIXI.BaseTexture.fromImage("../images/pupper/shiba.png");
    let dogWalkWidth = 35;
    let dogWalkHeight = 25;
    let numFrames = 12;
    let walk = [];
    for (let i = 0; i < numFrames; i++) {
        let frame = new Texture(dogWalkSheet, new Rectangle(i * dogWalkWidth, 240, dogWalkWidth, dogWalkHeight));
        walk.push(frame);
    }
    // walk.push(
    //     new Rectangle(0, 240, dogWalkWidth, dogWalkHeight), // frame 0
    //     new Rectangle(38, 240, dogWalkWidth, dogWalkHeight), // frame 1
    //     // new Rectangle(72, 240, dogWalkWidth, dogWalkHeight), // frame 2
    //     // new Rectangle(114, 240, dogWalkWidth, dogWalkHeight), // frame 3
    //     // new Rectangle(152, 240, dogWalkWidth, dogWalkHeight), // frame 4
    //     // new Rectangle(190, 240, dogWalkWidth, dogWalkHeight), // frame 5
    //     // new Rectangle(228, 240, dogWalkWidth, dogWalkHeight), // frame 6
    //     // new Rectangle(266, 240, dogWalkWidth, dogWalkHeight), // frame 7
    //     // new Rectangle(304, 240, dogWalkWidth, dogWalkHeight), // frame 8
    //     // new Rectangle(342, 240, dogWalkWidth, dogWalkHeight), // frame 9
    //     // new Rectangle(380, 240, dogWalkWidth, dogWalkHeight), // frame 10
    //     // new Rectangle(418, 240, dogWalkWidth, dogWalkHeight), // frame 11
    // );
    return walk;
}

function setup() {
    stage = app.stage;
    dogScene = new Container();
    stage.addChild(dogScene);
    // load the sprite sheet into the window 
    walkTexture = loadSpriteSheet();
    walkAnim(0, 0, 35, 25);
    // call the gameLoop function to make the animation work 
    app.ticker.add(gameLoop);
}

function walkAnim(x, y, frameWidth, frameHeight) {
    // let w2 = frameWidth/2;
    // let h2 = frameHeight/2;
    walkingDog = new PIXI.extras.AnimatedSprite(walkTexture);
    // walkingDog.x = x - w2;
    walkingDog.x = 0;
    walkingDog.y = 0;
    // walkingDog.y = y - h2;
    walkingDog.animationSpeed = 1;
    walkingDog.loop = true;

    // add the texture into the stage 
    dogScene.addChild(walkingDog);
    walkingDog.play();
    
}

function gameLoop() {
    // calculate how much time has passed since the last update and adjust sprites
    // accordingly
    let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt = 1/12;
   // walkAnim(0, 0, 35, 25);
    // renderer.render(stage);
}
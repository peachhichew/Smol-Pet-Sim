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
// make the renderer size equal to the size of the window
renderer.resize(window.innerWidth, window.innerHeight);

// load the sprites
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

// dog walking
var dogWalk;
var run = [];
var dogWalkTexture;
var dogWalkY = 240;
var dogWalkWidth = 35;

// dog sitting
var dogSit;
var sit = [];
var dogSitTexture;
var dogSitY = 26;
var dogSitWidth = 35;
var dogSitHeight = 28;


function setup() {
    // // // load the image as a texture and then use the rectangle function
    // // // to "crop it" and then generate a sprite from it 
    // // var pupperTexture = TextureCache["../images/pupper/shiba.png"];
    // // // var rectangle = new Rectangle(0, 0, 38, 25);
    // // var rectangle = new Rectangle(0, 238, 38, 25); // walk
    
    // // pupperTexture.frame = rectangle;

    // // var pupper = new Sprite(pupperTexture);


    // // stage.addChild(pupper);
    // // renderer.render(stage);
    // pupper(0, 0);
    // // renderer.render(stage);

    // // start the game loop
    // gameLoop();
    dogWalkTexture = loader.resources["dog"].texture;
    // add new "cropped" parts of the sprite into the run array of frames
    run.push(
        new Rectangle(0, dogWalkY, dogWalkWidth, 25), // frame 0
        new Rectangle(38, dogWalkY, dogWalkWidth, 25), // frame 1
        new Rectangle(72, dogWalkY, dogWalkWidth, 25), // frame 2
        new Rectangle(114, dogWalkY, dogWalkWidth, 25), // frame 3
        new Rectangle(152, dogWalkY, dogWalkWidth, 25), // frame 4
        new Rectangle(190, dogWalkY, dogWalkWidth, 25), // frame 5
        new Rectangle(228, dogWalkY, dogWalkWidth, 25), // frame 6
        new Rectangle(266, dogWalkY, dogWalkWidth, 25), // frame 7
        new Rectangle(304, dogWalkY, dogWalkWidth, 25), // frame 8
        new Rectangle(342, dogWalkY, dogWalkWidth, 25), // frame 9
        new Rectangle(380, dogWalkY, dogWalkWidth, 25), // frame 10
        new Rectangle(418, dogWalkY, dogWalkWidth, 25), // frame 11
        // new Rectangle(456, 238, 38, 25) // frame 12
    );

    // make the frame of the texture start from the first frame
    dogWalkTexture.frame = run[0];
    // create a new dog sprite based on the texture that was just created
    dogWalk = new Sprite(dogWalkTexture);
    // move the dog sprite to the center of the window
    dogWalk.x = window.innerWidth/2;
    dogWalk.y = window.innerHeight/2;
    // add the dog to the stage and render it
    stage.addChild(dogWalk);
    // renderer.render(stage);

    // dog sitting frames
    dogSitTexture = loader.resources["dogSitting"].texture;

    // add sitting frames to the sit array
    sit.push(
        new Rectangle(0, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(39, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(73, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(115, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(153, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(191, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(229, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(267, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(305, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(343, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(381, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(419, dogSitY, dogSitWidth, dogSitHeight),
        new Rectangle(457, dogSitY, dogSitWidth, dogSitHeight),
    );

    // start from first frame
    dogSitTexture.frame = sit[0];
    dogSit = new Sprite(dogSitTexture);
    dogSit.x = 0;
    dogSit.y = 0;
    stage.addChild(dogSit);
    renderer.render(stage);
}

function pupper(xPos, yPos) {
    var xLoc = xPos;
    var yLoc = yPos;
    var walkFrames = 12;
    // frame number in the animation, starts at 0 every time 
    var curFrame = 0;
    var frameWidth = 38;
    var frameHeight = 25;

    // var fsm = [
    //     [1],
    //     [2],
    //     [3],
    //     [4],
    //     [5],
    //     [6],
    //     [7],
    //     [8],
    //     [9],
    //     [10],
    //     [11],
    //     [12]
    // ];

    // load the image as a texture and then use the rectangle function
    // to "crop it" and then generate a sprite from it 
    // var pupperTexture = TextureCache["../images/pupper/shiba.png"];
    // var pupperTexture1 = TextureCache["../images/pupper/shiba.png"];
    // var rectangle = new Rectangle(0, 0, 38, 25);
    // var rectangle = new Rectangle(0, 238, frameWidth, frameHeight); // walk
    // pupperTexture.frame = rectangle;
    // var pupper = new Sprite(pupperTexture);

    // array that takes in the images of each frame where size of the array is the number 
    // of frames
    var walkAnim = new Array(walkFrames);

    // create new sprites and fill them into each slot of the array
    walkAnim[0] = new Sprite(resources["../images/pupper/walk/shiba_1.png"].texture);
    walkAnim[1] = new Sprite(resources["../images/pupper/walk/shiba_2.png"].texture);
    walkAnim[2] = new Sprite(resources["../images/pupper/walk/shiba_3.png"].texture);
    walkAnim[3] = new Sprite(resources["../images/pupper/walk/shiba_4.png"].texture);
    walkAnim[4] = new Sprite(resources["../images/pupper/walk/shiba_5.png"].texture);
    walkAnim[5] = new Sprite(resources["../images/pupper/walk/shiba_6.png"].texture);
    walkAnim[6] = new Sprite(resources["../images/pupper/walk/shiba_7.png"].texture);
    walkAnim[7] = new Sprite(resources["../images/pupper/walk/shiba_8.png"].texture);
    walkAnim[8] = new Sprite(resources["../images/pupper/walk/shiba_9.png"].texture);
    walkAnim[9] = new Sprite(resources["../images/pupper/walk/shiba_10.png"].texture);
    walkAnim[10] = new Sprite(resources["../images/pupper/walk/shiba_11.png"].texture);
    walkAnim[11] = new Sprite(resources["../images/pupper/walk/shiba_12.png"].texture);

    // add the sprites to the stage
    for (let i = 0; i < walkFrames; i++) {
        walkAnim[i].x = (i * 4) + 100;
        stage.addChild(walkAnim[i]);
    }

    // var currFrame = (currFrame + 1) % walkFrames;
}

function gameLoop(){
    // loop this function 60 times per second
    var f = requestAnimationFrame(gameLoop);
    dogWalkTexture.frame = run[Math.floor((f % 120)/12)];
    stage.removeChild(dogWalk);
    dogWalk = new Sprite(dogWalkTexture);
    dogWalk.x = window.innerWidth/2;
    dogWalk.y = window.innerHeight/2;
    stage.addChild(dogWalk);
    // renderer.render(stage);

    dogSitTexture.frame = sit[Math.floor((f % 120)/12)];
    stage.removeChild(dogSit);
    dogSit = new Sprite(dogSitTexture);
    dogSit.x = 0;
    dogSit.y = 0;
    dogSit.scale.x = 1.2;
    dogSit.scale.y = 1.2;
    stage.addChild(dogSit);
    renderer.render(stage);
}

// start the game loop
gameLoop();
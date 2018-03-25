export {randomInt, changeBackground, makeButton, keyboard};

// creating a Random function so we can use it to spawn sprites at random locations
function randomInt(min, max) {
    // Math.ceil returns the smallest int greater than or equal to the given number
    min = Math.ceil(min);
    max = Math.floor(max);

    // [min, max)
    let num = Math.floor(Math.random() * (max - min)) + min;
    
    return num;
}

// changes the background color by drawing a white rectangle
function changeBackground(bg, color, stroke, canvasWidth, canvasHeight){
    // bg = new PIXI.Graphics(); //unnecessary!!!
    bg.beginFill(color);
    bg.lineStyle(1, stroke, 1);  // stroke width, color, alpha
    bg.drawRect(1, 0, canvasWidth - 1, canvasHeight - 1);
    bg.endFill();
    bg.x = 0;
    bg.y = 0;
}

// adding a makeButton function so we can easily create a button by giving it
// certain parameter info
function makeButton(x, y, xOffset, color, text, pageName, targetFunction, w, h) {
    let menuButton = new PIXI.Graphics();
    menuButton.beginFill(color);
    menuButton.lineStyle(1, 0x000000, 0.9); // stroke width, color, alpha
    menuButton.drawRect(0, 0, w, h);
    menuButton.endFill();
    menuButton.x = x;
    menuButton.y = y;
    menuButton.interactive = true;
    menuButton.buttonMode = true;
    menuButton.on("pointerdown", targetFunction); // targetFunction = function of the page you want to go to
    pageName.addChild(menuButton); // add the button on to the specific page

    // text style for the button text
    let textStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        strokeThickness: 1,
        dropShadow: true,
        dropShadowBlur: 0,
        dropShadowDistance: 2,
        fontSize: 20,
        fontFamily: "VT323",
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

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
  
    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }
WebFont.load({
    google: {
      families: ['VT323']
    },
    active:e=>{
    	console.log("font loaded!");
    	// pre-load the images
        PIXI.loader
        .add("dog", "../images/pupper/shiba1.png")
        .add("dogFlipped", "../images/pupper/shiba1-flipped.png")
        .add("bunny", "../images/bun/bun.png")
        .add("cat", "../images/catses/catses2.png")
        .on("progress",e=>{console.log(`progress=${e.progress}`)})
        .load(setup);
    }
  });
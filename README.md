# Final Project Information
This is a smol (small) pet simulator where the user can interact with a dog, a cat, and a bunny. All of the animals are animated using Pixi.js, with the exception of the main menu. User interactions will be listed below. Any significant changes from the [proposal](https://github.com/peachhichew/Smol-Pet-Sim/blob/master/Proposal.md) will also be included in this document.

Link to the project: [here](https://people.rit.edu/sxw8136/igme230/Smol-Pet-Sim/code/index.html).

## Significant changes from proposal

### Dog page
- Only has mouseClicked/pointerup event, no mouseDragged was implemented.
- Implemented wall collision detection.

### Cat page
- Cats only have the walking frames and no other poses have been added yet.
- Only has mouseClicked/pointerup event.
- Change the movement of the cat with the mouse, instead of keyboard.
- All cats are currently the same size.
- Implemented wall collision detection.

### Bunny page
- "Grow" button has been changed to a "Resize" button.

## Interactions

### Dog page
- Click on a sitting dog to make him/her bark.
- Click on a walking dog to make him/her sit and click on him/her again to make him walk.

### Cat page
- Click on a cat to make him/her move in the opposite direction.

### Bunny page
- Click on the "Resize" button to change the size of the bunny that was most recently generated.
- Click on the "More buns!" button to spawn more bunnies on the page.

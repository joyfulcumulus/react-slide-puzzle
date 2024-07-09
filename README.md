# Slide Puzzle Clone

## Introduction
This is a clone of the common Slide Puzzle game after I started learning React for 1 week. I applied my learnings from [2048 Clone](https://github.com/joyfulcumulus/2048-clone) project to decompose the game layout into App, Grid and Tile React components.

App demo: https://joyfulcumulus.github.io/react-slide-puzzle/

## Technologies Used
This project was built with
* React JS

Hosting: Github Pages

## Game Layout Design
### React Components
* Grid: gameboard of the game
* Tile: the clickable / moveable elements of the game
* WinAlert: the notification that pops up when the player has won
* Button: to reset gameplay when the user wants to restart halfway / or wins

### Component Hierarchy
App
|-- Grid
    |-- Tile
|-- Button
|-- WinAlert
    |-- Button

![diagram of react components](/public/slide-puzzle-components.png)

### Structuring State
* App component holds game progress (`progress` state) so it knows when to restart the game, or display winning alert. It has 3 allowed values - 0: start, 1: in progress, 2: won
* Grid component holds information about tiles placement (`tiles` state). This is stored as an array. As Grid component has knowledge of all tiles, it contains validation and movement logic (e.g. canMove, moveTile)

Tile component, Button component, WinAlert component do not own any state. They have event handlers attached, which changes the `progress` and `tiles` state based on user interaction.

## Game Mechanics
Objective: Order the tiles from 1 to 15, with the empty space occupying the last position
Actions: Player can click on the tiles to swap their positions
Rules: Only tiles that are adjacent to the empty space can be swapped
State: The order of the tiles determines whether the player has won the game or not
Randomness: The game starts with the tiles randomly shuffled on the grid

User events trigger tile validation and Movement logic
* Check if Tile can move
* If can, move Tile

```javascript
function canMove(target) {
  // get row, col coordinates of the 2 tiles
  const emptyTilePosition = {col: emptyTileIndex % GRID_SIZE, row: Math.floor(emptyTileIndex / GRID_SIZE)}
  const clickedTileIndex = tiles.findIndex(element => element === parseInt(target.innerText))
  const clickedTilePosition = {col: clickedTileIndex % GRID_SIZE, row: Math.floor(clickedTileIndex / GRID_SIZE)}

  // make comparison based on row, col coordinates (using index purely has bugs)
  const colDiff = Math.abs(emptyTilePosition.col - clickedTilePosition.col);
  const rowDiff = Math.abs(emptyTilePosition.row - clickedTilePosition.row);
  if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
    return true;
  }
  return false;
}

function moveTile(target) {
  const clickedTileValue = parseInt(target.innerText)
  const clickedTileIndex = tiles.findIndex(element => element === clickedTileValue)

  // create a new tiles array, update that array and update the tiles state
  const newTiles = [...tiles];
  newTiles[clickedTileIndex] = 16;
  newTiles[emptyTileIndex] = clickedTileValue;
  setTiles(newTiles);
}

function handleClick({target}) {
  if (canMove(target)) {
    moveTile(target);
  }
}
```

Effect hook is used for 2 purposes
* Check winning state and update `progress` state to parent component (App) to trigger WinAlert display

```javascript
useEffect(() => {
  if(JSON.stringify(tiles) === '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]') {
    setProgress(2);
  } else {
    setProgress(1);
  }
})
```

* Reset `tiles` state to sync with `progress` = 0 (i.e. start game)

```javascript
useEffect(() => {
  if(progress === 0) {
    // const shuffledNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15]
    const shuffledNumbers = Array.from({ length: GRID_SIZE ** 2 }, (_, index) => index + 1).sort(() => Math.random() - 0.5);
    setTiles(shuffledNumbers);
  }
}, [progress])
```

## Areas of Improvement
* Reduce the no. of render passes by evaluating how to reduce Effect hooks usage
* To increase the difficulty level, display images instead of numbers over the tiles

## Acknowledgements
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

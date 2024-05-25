import React from 'react';
import styles from './Grid.module.css';
import Tile from './Tile';

function Grid() {
  const GRID_SIZE = 4
  const shuffledNumbers = Array.from({ length: GRID_SIZE ** 2 }, (_, index) => index + 1).sort(() => Math.random() - 0.5);

  function canMove(target) {
    const emptyTileIndex = shuffledNumbers.findIndex(element => element === 16)
    const emptyTilePosition = {col: emptyTileIndex % GRID_SIZE, row: Math.floor(emptyTileIndex / GRID_SIZE)}
    const clickedTileIndex = shuffledNumbers.findIndex(element => element == target.innerText)
    const clickedTilePosition = {col: clickedTileIndex % GRID_SIZE, row: Math.floor(clickedTileIndex / GRID_SIZE)}

    const colDiff = Math.abs(emptyTilePosition.col - clickedTilePosition.col);
    const rowDiff = Math.abs(emptyTilePosition.row - clickedTilePosition.row);
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      return true;
    }
    return false;
  }

  function moveTile(target) {
    console.log("we're in move tile method");
  }

  function checkIfPlayerWins() {
    // move function to grid?
  }

  function handleClick({target}) {
    if (canMove(target)) {
      moveTile(target);
      checkIfPlayerWins();
    }
  }

  return(
    <div className={styles.grid}>
      {
        shuffledNumbers.map((number, index) => {
          return <Tile key={index} number={number} handleClick={handleClick} />
        })
      }
    </div>
  )
}

export default Grid;


// // Previous Challenge's JS functions

// // Select all the tiles
// const tiles = document.querySelectorAll('td');

// // get the black tile
// let blackTile = document.querySelector('.empty');

// // compare function to check winning
// function compareNumbers(a, b) {
//   return a - b;
// }

// const moveTile = (tile) => {
//   // make the tile empty and the black tile not empty
//   tile.classList.add("empty");
//   blackTile.classList.remove("empty");
//   // transfer tile innerText content into the black tile
//   blackTile.innerText = parseInt(tile.innerText, 10);
//   tile.innerText = null;
//   // update the blacktile constant w latest HTML element
//   blackTile = document.querySelector('.empty');
// };

// const checkIfPlayerWins = () => {
//   const playerTiles = [];
//   tiles.forEach((tile) => {
//     playerTiles.push(parseInt(tile.innerText, 10)); // cannot parse into Int the empty
//   });
//   // check if sequence array is sorted
//   const sortPlayerTiles = playerTiles.sort((a, b) => a - b);
//   return JSON.stringify(playerTiles) === JSON.stringify(sortPlayerTiles);
//   // Qn: why need to stringify the array?
// };

// // Add event listener on each tile - Do not change the following
// tiles.forEach((tile) => {
//   tile.addEventListener('click', () => {
//     if (canMove(tile)) {
//       moveTile(tile);
//       checkIfPlayerWins();
//     }
//   });
// });

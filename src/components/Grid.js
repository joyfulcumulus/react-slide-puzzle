import React, { useState, useEffect } from 'react';
import styles from './Grid.module.css';
import Tile from './Tile';

function Grid() {
  const GRID_SIZE = 4
  // generate initial shuffled numbers to set initial state
  // const shuffledNumbers = Array.from({ length: GRID_SIZE ** 2 }, (_, index) => index + 1).sort(() => Math.random() - 0.5);
  const shuffledNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15]
  const [tiles, setTiles] = useState(shuffledNumbers);
  const [emptyTileIndex, setEmptyTileIndex] = useState(shuffledNumbers.findIndex(element => element === 16));

  // update emptyTileIndex everytime when tiles updates
  useEffect(() => {
    setEmptyTileIndex(tiles.findIndex(element => element === 16));
  }, [tiles]);

  // check if player has won everytime when tiles updates
  useEffect(() => {
    if(JSON.stringify(tiles) === '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]') {
      console.log(JSON.stringify(tiles), "You win");
    }
  }, [tiles]);

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

  return(
    <div className={styles.grid}>
      {
        tiles.map((number, index) => {
          return <Tile key={index} number={number} handleClick={handleClick} />
        })
      }
    </div>
  )
}

export default Grid;

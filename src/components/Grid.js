import React, { useState, useEffect } from 'react';
import styles from './Grid.module.css';
import Tile from './Tile';

function Grid({progress, setProgress}) {
  const GRID_SIZE = 4
  // generate initial shuffled numbers to set initial state
  // const shuffledNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15]
  const shuffledNumbers = Array.from({ length: GRID_SIZE ** 2 }, (_, index) => index + 1).sort(() => Math.random() - 0.5);
  const [tiles, setTiles] = useState(shuffledNumbers);
  const emptyTileIndex = tiles.findIndex(element => element === 16);

  // after tiles update, check winning condition, and update progress accordingly (1: in progress, 2: win)
  useEffect(() => {
    if(JSON.stringify(tiles) === '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]') {
      setProgress(2);
    } else {
      setProgress(1);
    }
  })

  // reset gameboard whenever progress is changed to 0
  useEffect(() => {
    if(progress === 0) {
      // const shuffledNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15]
      const shuffledNumbers = Array.from({ length: GRID_SIZE ** 2 }, (_, index) => index + 1).sort(() => Math.random() - 0.5);
      setTiles(shuffledNumbers);
    }
  }, [progress])

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

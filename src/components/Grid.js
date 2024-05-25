import React from 'react';
import styles from './Grid.module.css';
import Tile from './Tile';

function Grid() {
  const GRID_SIZE = 4
  const shuffledNumbers = Array.from({ length: GRID_SIZE ** 2 }, (_, index) => index + 1).sort(() => Math.random() - 0.5);

  return(
    <div className={styles.grid}>
      {
        shuffledNumbers.map((number, index) => {
          return <Tile key={index} number={number} />
        })
      }
    </div>
  )
}

export default Grid;

import React from 'react';
import styles from './Grid.module.css';
import Tile from './Tile';

function Grid() {
  const GRID_SIZE = 4
  const tiles = []

  for (let i = 0; i < GRID_SIZE ** 2; i++) {
    tiles.push(<Tile />)
  }

  return(
    <div className={styles.grid}>
      {tiles}
    </div>
  )
}

export default Grid;

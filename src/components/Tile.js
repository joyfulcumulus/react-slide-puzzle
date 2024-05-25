import React from 'react';
import styles from './Tile.module.css';

function Tile({number}) {
  return(
    <div className={styles.tile}>
      {number}
    </div>
  )
}

export default Tile;

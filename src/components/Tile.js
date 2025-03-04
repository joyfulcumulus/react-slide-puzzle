import React from 'react';
import styles from './Tile.module.css';

function Tile({number, handleClick}) {

  return(
    <div className={number === 16 ? `${styles.tile} ${styles.disabled}`: styles.tile} onClick={handleClick}>
      {number === 16 ? '' : number}
    </div>
  )
}

export default Tile;

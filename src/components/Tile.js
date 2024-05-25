import React from 'react';
import styles from './Tile.module.css';

function Tile({number}) {

  function canMove() {

  }

  function moveTile() {

  }

  function checkIfPlayerWins() {

  }

  function handleClick({target}) {
    if (canMove(target)) {
      moveTile(target);
      checkIfPlayerWins();
    }
  }

  return(
    <div className={number === 16 ? `${styles.tile} ${styles.disabled}`: styles.tile} onClick={handleClick}>
      {number}
    </div>
  )
}

export default Tile;

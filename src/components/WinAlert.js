import React from 'react';
import styles from './WinAlert.module.css';

function WinAlert() {
  return(
    <div className={styles.container}>
      <div className={styles.texts}>
        <p>You Win!</p>
        <button>Play Again</button>
      </div>
    </div>
  )
}

export default WinAlert;

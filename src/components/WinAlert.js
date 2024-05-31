import React from 'react';
import styles from './WinAlert.module.css';
import Button from './Button';

function WinAlert({progress, setProgress}) {
  return(
    <div className={progress === 2 ? `${styles.container} ${styles.active}` : styles.container}>
      <div className={styles.texts}>
        <p>You Win!</p>
        <Button text="Play Again" handleClick={setProgress} />
      </div>
    </div>
  )
}

export default WinAlert;

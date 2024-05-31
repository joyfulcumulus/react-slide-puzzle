import React from 'react';
import styles from './WinAlert.module.css';
import Button from './Button';

function WinAlert({handleClick}) {
  return(
    <div className={styles.container}>
      <div className={styles.texts}>
        <p>You Win!</p>
        <Button text="Play Again" handleClick={() => handleClick(0)} />
      </div>
    </div>
  )
}

export default WinAlert;

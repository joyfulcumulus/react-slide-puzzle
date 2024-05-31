import React from 'react';
import styles from './Button.module.css';

function Button({text='default text', handleClick}) {
  return(
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  )
}

export default Button;

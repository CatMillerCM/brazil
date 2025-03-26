import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './toggle.module.css';

const Toggle = () => {
  const [selectedPlayType, setSelectedPlayType] = useState('Listen');

  const buttonTypes = ['Listen', 'Record'];

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        {buttonTypes.map((button) => {
          return (
            <button
              key={button}
              type="button"
              className={`${styles.button} ${selectedPlayType === button ? styles.active : ''}`}
              onClick={() => setSelectedPlayType(button)}
            >
              {button}
            </button>
          )
        })}
      </div>
    </div>
  );
};

export { Toggle };
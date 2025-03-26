import PropTypes from 'prop-types';
import styles from './toggle.module.css';

const Toggle = ({ selectedPlayType, setSelectedPlayType, setSelectedSounds }) => {
  const buttonTypes = ['Listen', 'Record'];

  const handleClick = (e) => {
    setSelectedPlayType(e.target.value);
    setSelectedSounds([]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        {buttonTypes.map((button) => {
          return (
            <button
              key={button}
              type="button"
              className={`${styles.button} ${selectedPlayType === button ? styles.active : ''}`}
              value={button}
              onClick={(e) => handleClick(e)}
            >
              {button}
            </button>
          )
        })}
      </div>
      {selectedPlayType === 'Record' && <p>Recording...</p>}
    </div>
  );
};

Toggle.propTypes = {
  selectedPlayType: PropTypes.string.isRequired,
  setSelectedPlayType: PropTypes.func.isRequired,
  setSelectedSounds: PropTypes.func.isRequired
};

export { Toggle };
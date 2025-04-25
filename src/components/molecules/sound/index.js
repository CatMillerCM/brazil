import PropTypes from 'prop-types';
import { Loader } from '@/components/atoms/loader';
import styles from './sound.module.css';

const Sound = ({ sound, selectedSounds, onClick, isReady }) => {
  return (
    <button
      key={sound}
      type="button"
      className={`${styles.sound} ${selectedSounds.includes(sound) ? styles.clicked : ''}`}
      value={sound}
      onClick={onClick}
      disabled={!isReady}
    >
      {isReady ? sound : <Loader />}
    </button>
  )
};

Sound.propTypes = {
  sound: PropTypes.string.isRequired,
  selectedSounds: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  isReady: PropTypes.bool.isRequired
};

export { Sound };

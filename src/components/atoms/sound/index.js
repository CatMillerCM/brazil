import PropTypes from 'prop-types';
import Image from 'next/image';
import { brazilLoader } from '@/assets';
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
      {isReady ? sound : <Image className={styles.loader} src={brazilLoader} alt="Brazilian flag spinner loader"/>}
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

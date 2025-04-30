import PropTypes from 'prop-types';
import styles from './audio.module.css';

const Audio = ({ recordedAudio }) => {
  return (
    recordedAudio ? (
      <audio className={styles.audio} controls src={URL.createObjectURL(recordedAudio)} />
    ) : (
      <audio className={styles.none} controls disabled />
    )
  )
};

Audio.propTypes = {
  recordedAudio: PropTypes.instanceOf(Blob)
};

export { Audio };

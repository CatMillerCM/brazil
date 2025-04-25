import PropTypes from 'prop-types';
import styles from './audio.module.css';

const Audio = ({ recordedAudio }) => {
  return (
    <audio className={!recordedAudio ? styles.none : ''} controls src={recordedAudio ? URL.createObjectURL(recordedAudio) : ''} />
  )
};

Audio.propTypes = {
  recordedAudio: PropTypes.instanceOf(Blob)
};

export { Audio };

import PropTypes from 'prop-types';
import { Sound } from '@/components/molecules/sound';
import { sounds } from '@/data/sounds';
import styles from './sounds.module.css';

const Sounds = ({
  isRecording,
  selectedSounds,
  setSelectedSounds,
  soundsReady,
  playersRef
}) => {
  
  return (
    <div className={styles.soundsContainer}>
      {sounds.map((sound) => (
        <Sound
          key={sound}
          sound={soundsReady ? sound : null}
          isRecording={isRecording}
          selectedSounds={selectedSounds}
          setSelectedSounds={setSelectedSounds}
          playersRef={playersRef}
        />
      ))}
  </div>
  )
};

Sounds.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  selectedSounds: PropTypes.array.isRequired,
  setSelectedSounds: PropTypes.func.isRequired,
  soundsReady: PropTypes.bool.isRequired,
  playersRef: PropTypes.object.isRequired
};

export { Sounds };

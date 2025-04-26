import PropTypes from 'prop-types';
import { Sound } from '@/components/molecules/sound';
import styles from './sounds.module.css';

const Sounds = ({
  isRecording,
  selectedSounds,
  setSelectedSounds,
  playersRef,
  gainRef,
  isReady,
}) => {
  const sounds = [
    'Agogo',
    'Caixa',
    'Cavaquinho',
    'Chocalho de Platinela',
    'Cuica',
    'Ganza',
    'Repinique',
    'Surdo',
    'Tamborim',
    'Tantan',
    'Trumpet',
    'Whistle',
  ];
  
  return (
    <div className={styles.soundsContainer}>
      {sounds.map((sound) => (
        <Sound
          key={sound}
          sound={sound}
          isRecording={isRecording}
          selectedSounds={selectedSounds}
          setSelectedSounds={setSelectedSounds}
          playersRef={playersRef}
          gainRef={gainRef}
          isReady={isReady}
        />
      ))}
  </div>
  )
};

Sounds.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  selectedSounds: PropTypes.array.isRequired,
  setSelectedSounds: PropTypes.func.isRequired,
  playersRef: PropTypes.object.isRequired,
  gainRef: PropTypes.object.isRequired,
  isReady: PropTypes.bool.isRequired
};

export { Sounds };

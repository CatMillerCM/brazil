import PropTypes from 'prop-types';
import { Loader } from '@/components/atoms/loader';
import styles from './sound.module.css';

const Sound = ({
  sound,
  isRecording,
  selectedSounds,
  setSelectedSounds,
  playersRef
}) => {
  const handleClick = async (e) => {
    const selectedSound = e.target.value;
    
    let player = playersRef.current[selectedSound];
    const isAlreadySelected = selectedSounds.includes(selectedSound);

    if (!isRecording) {
      if (isAlreadySelected) {
        player.stop();
        setSelectedSounds([]);
      } else {
        const previousSound = selectedSounds[0];
        playersRef.current[previousSound]?.stop();
  
        player.start();
        setSelectedSounds([selectedSound]);
      }
    }

    if (isRecording) {
      if (isAlreadySelected) {
        player.stop();
        setSelectedSounds((prev) => prev.filter((sound) => sound !== selectedSound));
      } else {
        player.start();
        setSelectedSounds((prev) => [selectedSound, ...prev]);
      }
    }
  };

  return (
    <button
      type="button"
      className={`${styles.sound} ${selectedSounds.includes(sound) ? styles.clicked : ''}`}
      value={sound}
      onClick={handleClick}
      disabled={!sound}
    >
      {sound ? sound : <Loader />}
    </button>
  )
};

Sound.propTypes = {
  sound: PropTypes.string.isRequired,
  isRecording: PropTypes.bool.isRequired,
  selectedSounds: PropTypes.array.isRequired,
  setSelectedSounds: PropTypes.func.isRequired,
  playersRef: PropTypes.object.isRequired
};

export { Sound };

import PropTypes from 'prop-types';
import * as Tone from 'tone';
import { Loader } from '@/components/atoms/loader';
import styles from './sound.module.css';

const Sound = ({
  sound,
  isRecording,
  selectedSounds,
  setSelectedSounds,
  playersRef,
  gainRef,
  isReady,
}) => {
  const createPlayer = async (selectedSound) => {
    const fileName = selectedSound.toLowerCase().replace(/ /g, '-') + '.wav';
    const filePath = `/samples/${fileName}`;
  
    const player = new Tone.Player({
      url: filePath,
      loop: true,
      autostart: false,
    });
    
    await Tone.loaded();
    player.connect(gainRef.current);
    playersRef.current[selectedSound] = player;
  
    return player;
  };
  
  const handleClick = async (e) => {
    const selectedSound = e.target.value;
    
    let player = playersRef.current[selectedSound];
    if (!player) {
      player = await createPlayer(selectedSound);
      playersRef.current[selectedSound] = player;
    }

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
      key={sound}
      type="button"
      className={`${styles.sound} ${selectedSounds.includes(sound) ? styles.clicked : ''}`}
      value={sound}
      onClick={handleClick}
      disabled={!isReady}
    >
      {isReady ? sound : <Loader />}
    </button>
  )
};

Sound.propTypes = {
  sound: PropTypes.string.isRequired,
  isRecording: PropTypes.bool.isRequired,
  selectedSounds: PropTypes.array.isRequired,
  setSelectedSounds: PropTypes.func.isRequired,
  playersRef: PropTypes.object.isRequired,
  gainRef: PropTypes.object.isRequired,
  isReady: PropTypes.bool.isRequired
};

export { Sound };

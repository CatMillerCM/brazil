import PropTypes from 'prop-types';
import * as Tone from 'tone';
import { Button } from '@/components/atoms/button';
import { sounds } from '@/data/sounds';

const Start = ({ gainRef, playersRef, setIsStart, setSoundsReady }) => {
  const createPlayer = async (sound) => {
    const fileName = sound.toLowerCase().replace(/ /g, '-') + '.wav';
    const filePath = `/samples/${fileName}`;
  
    const player = new Tone.Player({
      url: filePath,
      loop: true,
      autostart: false,
    });
    
    await Tone.loaded();
    player.connect(gainRef.current);
    playersRef.current[sound] = player;
  
    return player;
  };

  const handleStart = async () => {
    await Tone.start();
    gainRef.current = new Tone.Gain().toDestination();
    setIsStart(true);

    for (const sound of sounds) {
      await createPlayer(sound);

      if (Object.keys(playersRef.current).length === sounds.length) {
        setSoundsReady(true);
      }
    }
  };

  return (
    <Button onClick={handleStart} label="Start My Samba" />
  )
};

Start.propTypes = {
  gainRef: PropTypes.object.isRequired,
  playersRef: PropTypes.object.isRequired,
  setStart: PropTypes.func.isRequired,
  setSoundsReady: PropTypes.func.isRequired,
};

export { Start };

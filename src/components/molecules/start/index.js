import PropTypes from 'prop-types';
import * as Tone from 'tone';
import { Button } from '@/components/atoms/button';

const Start = ({ gainRef, setIsReady }) => {
  const handleStart = async () => {
    await Tone.start();
    gainRef.current = new Tone.Gain().toDestination();
    setIsReady(true);
  };

  return (
    <Button onClick={handleStart} label="Start My Samba" />
  )
};

Start.propTypes = {
  gainRef: PropTypes.object.isRequired,
  setIsReady: PropTypes.func.isRequired
};

export { Start };

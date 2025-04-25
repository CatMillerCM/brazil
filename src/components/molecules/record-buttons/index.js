import PropTypes from 'prop-types';
import { useRef } from 'react';
import * as Tone from 'tone';
import { Button } from '@/components/atoms/button';

const RecordButtons = ({
  isRecording,
  setIsRecording,
  setRecordedAudio,
  setSelectedSounds,
  playersRef,
  gainRef
}) => {
  const recorderRef = useRef(null);

  const stopAllSounds = () => {
    Object.values(playersRef.current).forEach((player) => player.stop());
    setSelectedSounds([]);
  };

  const startRecording = async () => {
    stopAllSounds();
    await Tone.start();
  
    const recorder = new Tone.Recorder();
    recorderRef.current = recorder;
    gainRef.current.connect(recorder);
  
    recorder.start();
    setIsRecording(true);
  };
  
  const stopRecording = async () => {
    stopAllSounds();
    
    const recording = await recorderRef.current.stop();
    setIsRecording(false);
    setRecordedAudio(recording);
  };

  return (
    isRecording ? 
      <Button onClick={stopRecording} label="Stop Recording" /> :
      <Button onClick={startRecording} label="Start Recording" />    
  )
};

RecordButtons.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  setIsRecording: PropTypes.func.isRequired,
  setRecordedAudio: PropTypes.func.isRequired,
  setSelectedSounds: PropTypes.func.isRequired,
  playersRef: PropTypes.object.isRequired,
  gainRef: PropTypes.object.isRequired
};

export { RecordButtons };

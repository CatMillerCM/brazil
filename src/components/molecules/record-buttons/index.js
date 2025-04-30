import PropTypes from 'prop-types';
import { useRef } from 'react';
import * as Tone from 'tone';
import { Button } from '@/components/atoms/button';

const RecordButtons = ({
  isRecording,
  setIsRecording,
  recordedAudio,
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

  const startAgain = () => {
    setRecordedAudio(null);
  }

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
    recordedAudio ?
    <Button onClick={startAgain} label="Start Again" /> :
      isRecording ? 
        <Button className="stop" onClick={stopRecording} label="Stop Recording" /> :
        <Button onClick={startRecording} label="Start Recording"/>    
  )
};

RecordButtons.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  setIsRecording: PropTypes.func.isRequired,
  recordedAudio: PropTypes.instanceOf(Blob),
  setRecordedAudio: PropTypes.func.isRequired,
  setSelectedSounds: PropTypes.func.isRequired,
  playersRef: PropTypes.object.isRequired,
  gainRef: PropTypes.object.isRequired
};

export { RecordButtons };

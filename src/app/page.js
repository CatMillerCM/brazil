'use client';

import * as Tone from 'tone';
import { useState, useRef, useEffect } from 'react';
import { Sounds } from '@/components/organisms/sounds';
import { ResultActionButtons } from '@/components/molecules/result-action-buttons';
import { Dancers } from '@/components/molecules/dancers';
import styles from './page.module.css';

const Page = () => {
  const [selectedSounds, setSelectedSounds] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const recorderRef = useRef(null);
  const playersRef = useRef({});
  const gainRef = useRef(null);

  useEffect(() => {
    gainRef.current = new Tone.Gain().toDestination();
    setIsReady(true);
  }, []);

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
    <main className={styles.main}>
      <div className={styles.diamond}></div>
      <div className={styles.mainContent}>
        <div className={styles.titles}>
          <h1>Create my Samba mix!</h1>
          <h3>Start by trying out the sounds and then start recording when you're ready!</h3>
        </div>
        {isRecording ? 
          <button type="button" className={styles.button} onClick={stopRecording}>Stop Recording</button> :
          <button type="button" className={`${styles.button} ${styles.start}`} onClick={startRecording}>Start Recording</button>
        }
        <Sounds selectedSounds={selectedSounds} onClick={handleClick} isReady={isReady}/>
        {recordedAudio ? (
          <audio controls src={URL.createObjectURL(recordedAudio)} />
        ) :
          <div className={styles.noAudio}></div>
        }
        <ResultActionButtons recordedAudio={recordedAudio} />
      </div>
      <Dancers />
    </main>
  );
};

export default Page;

'use client';

import * as Tone from 'tone';
import { useState, useRef, useEffect } from 'react';
import { Titles } from '@/components/atoms/titles';
import { RecordButtons } from '@/components/molecules/record-buttons';
import { Sounds } from '@/components/organisms/sounds';
import { ResultActionButtons } from '@/components/molecules/result-action-buttons';
import { Dancers } from '@/components/molecules/dancers';
import styles from './page.module.css';

const Page = () => {
  const [selectedSounds, setSelectedSounds] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isReady, setIsReady] = useState(false);

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

  return (
    <main className={styles.main}>
      <div className={styles.diamond}></div>
      <div className={styles.mainContent}>
        <Titles />
        <RecordButtons
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          setRecordedAudio={setRecordedAudio}
          setSelectedSounds={setSelectedSounds}
          playersRef={playersRef}
          gainRef={gainRef}
        />
        <Sounds
          selectedSounds={selectedSounds}
          onClick={handleClick}
          isReady={isReady}
        />
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

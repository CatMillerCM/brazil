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
          isRecording={isRecording}
          selectedSounds={selectedSounds}
          setSelectedSounds={setSelectedSounds}
          playersRef={playersRef}
          gainRef={gainRef}
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

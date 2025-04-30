'use client';

import * as Tone from 'tone';
import { useState, useRef } from 'react';
import { Titles } from '@/components/atoms/titles';
import { RecordButtons } from '@/components/molecules/record-buttons';
import { Sounds } from '@/components/organisms/sounds';
import { Audio } from '@/components/atoms/audio';
import { DownloadButton } from '@/components/molecules/result-action-buttons';
import { Dancers } from '@/components/molecules/dancers';
import styles from './page.module.css';
import { Start } from '@/components/molecules/start';

const Page = () => {
  const [selectedSounds, setSelectedSounds] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const playersRef = useRef({});
  const gainRef = useRef(null);

  return (
    <main className={styles.main}>
      <div className={styles.diamond}></div>
      {isReady ? (
        <div className={styles.mainContent}>
          <Titles />
          <RecordButtons
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            recordedAudio={recordedAudio}
            setRecordedAudio={setRecordedAudio}
            setSelectedSounds={setSelectedSounds}
            playersRef={playersRef}
            gainRef={gainRef}
            isReady={isReady}
          />
          <Sounds
            isRecording={isRecording}
            selectedSounds={selectedSounds}
            setSelectedSounds={setSelectedSounds}
            playersRef={playersRef}
            gainRef={gainRef}
            isReady={isReady}
          />
          <Audio recordedAudio={recordedAudio} />
          <DownloadButton recordedAudio={recordedAudio} />
        </div>
        ) : (
          <div className={styles.startContent}>
            <Titles showByline={true} />
            <Start gainRef={gainRef} setIsReady={setIsReady}/>
          </div>
        )}
      <Dancers />
    </main>
  );
};

export default Page;

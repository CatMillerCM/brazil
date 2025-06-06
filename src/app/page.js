'use client';

import { useState, useRef } from 'react';
import { Titles } from '@/components/atoms/titles';
import { RecordButtons } from '@/components/molecules/record-buttons';
import { Sounds } from '@/components/organisms/sounds';
import { Audio } from '@/components/atoms/audio';
import { DownloadButton } from '@/components/molecules/result-action-buttons';
import { Dancers } from '@/components/molecules/dancers';
import { Start } from '@/components/molecules/start';
import styles from './page.module.css';

const Page = () => {
  const [selectedSounds, setSelectedSounds] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isStart, setIsStart] = useState(false);
  const [soundsReady, setSoundsReady] = useState(false);

  const playersRef = useRef({});
  const gainRef = useRef(null);

  return (
    <main className={styles.main}>
      <div className={styles.diamond}></div>
      {isStart ? (
        <div className={styles.mainContent}>
          <Titles />
          <RecordButtons
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            recordedAudio={recordedAudio}
            setRecordedAudio={setRecordedAudio}
            setSelectedSounds={setSelectedSounds}
            soundsReady={soundsReady}
            playersRef={playersRef}
            gainRef={gainRef}
          />
          <Sounds
            isRecording={isRecording}
            selectedSounds={selectedSounds}
            setSelectedSounds={setSelectedSounds}
            soundsReady={soundsReady}
            playersRef={playersRef}
          />
          <Audio recordedAudio={recordedAudio} />
          <DownloadButton recordedAudio={recordedAudio} />
        </div>
        ) : (
          <div className={styles.startContent}>
            <Titles showByline={true} />
            <Start
              gainRef={gainRef}
              playersRef={playersRef}
              setIsStart={setIsStart}
              setSoundsReady={setSoundsReady}
            />
          </div>
        )}
      <Dancers isStart={isStart} />
    </main>
  );
};

export default Page;

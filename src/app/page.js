'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import * as Tone from 'tone';
import { brazilLoader, dancer1, dancer2, dancer3 } from '@/assets';
import styles from './page.module.css';

const Page = () => {
  const [selectedSounds, setSelectedSounds] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const recorderRef = useRef(null);
  const playersRef = useRef({});
  const gainRef = useRef(null);

  const sounds = [
    'carioca 1', 'chocalho de platinela 1', 'drums 1', 'pandeiro 1', 'pandeiro 2', 'tantan 1',
    'carioca 1', 'chocalho de platinela 1', 'drums 1', 'pandeiro 1', 'pandeiro 2', 'tantan 1',
  ];

  useEffect(() => {
    gainRef.current = new Tone.Gain().toDestination();
    setIsReady(true);
  }, []);  

  const stopAllSounds = () => {
    Object.values(playersRef.current).forEach((player) => player.stop());
    setSelectedSounds([]);
  };

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

  const downloadAudio = () => {
    if (!recordedAudio) return;

    const url = URL.createObjectURL(recordedAudio);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'samba_mix.wav';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const shareAudio = () => {
    if (!recordedAudio) return;

    const audioFile = new File([recordedAudio], 'samba_mix.wav', { type: 'audio/wav' });
  
    if (navigator.canShare && navigator.canShare({ files: [audioFile] })) {
      navigator.share({
        files: [audioFile],
        title: 'My Samba Mix',
        text: 'Check out this cool audio mix I made!',
      })
    }
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
        <div className={styles.soundsContainer}>
          {sounds.map((sound) => (
            <button
              key={sound}
              type="button"
              className={`${styles.sound} ${selectedSounds.includes(sound) ? styles.clicked : ''}`}
              value={sound}
              onClick={handleClick}
              disabled={!isReady}
            >
              {isReady ? sound : <Image className={styles.loader} src={brazilLoader} alt="Brazilian flag spinner loader"/>}
            </button>
          ))}
        </div>
        {recordedAudio ? (
          <audio controls src={URL.createObjectURL(recordedAudio)} />
        ) :
          <div className={styles.noAudio}></div>
        }
        <button type="button" className={`${styles.button} ${styles.download}`} onClick={downloadAudio} disabled={!recordedAudio}>Download my mix</button>
        <button type="button" className={`${styles.button} ${styles.share}`} onClick={shareAudio} disabled={!recordedAudio}>Share my mix</button>
      </div>
      <div className={styles.dancers}>
        <Image src={dancer1} alt="Silhouette of a woman dancing wearing carnival attire" />
        <Image src={dancer2} alt="Silhouette of a woman dancing wearing carnival attire" />
      </div>
    </main>
  );
};

export default Page;

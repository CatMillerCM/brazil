'use client';

import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
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

  const [selectedPlayType, setSelectedPlayType] = useState('Listen');

  const sounds = ['drums 1', 'drums 2', 'drums 3', 'drums 4', 'bass 1', 'bass 2', 'trombone 1', 'trombone 2', 'symbols', 'tamborine', 'trumpet', 'guitar', 'vocals 1', 'vocals 2', 'vocals 3', 'vocals 4'];

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
  const handleClick = (e) => {
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
        setSelectedSounds([selectedSound, ...selectedSounds])
      }
    }
  };
  
    recorder.start();
    setIsRecording(true);
  };
  
  const stopRecording = async () => {
    stopAllSounds();
    
    const recording = await recorderRef.current.stop();
    setIsRecording(false);
    
    setRecordedAudio(recording);
  };

  const handleStop = () => {
    console.log('stop recording');
  };

  return (
    <main className={styles.main}>
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
              {isReady ? sound : '...'}
            </button>
          ))}
        </div>
            onClick={(e) => handleClick(e)}
          >{sound}</button>
        })}
      </div>
    </main>
  );
};

export default Page;

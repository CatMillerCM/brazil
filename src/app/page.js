'use client';

import { useState } from 'react';
import { Toggle } from '@/components/atoms/toggle';
import styles from './page.module.css';

const Page = () => {
  const [selectedSounds, setSelectedSounds] = useState([]);

  const sounds = ['drums 1', 'drums 2', 'drums 3', 'drums 4', 'bass 1', 'bass 2', 'trombone 1', 'trombone 2', 'symbols', 'tamborine', 'trumpet', 'guitar', 'vocals 1', 'vocals 2', 'vocals 3', 'vocals 4'];

  const handleClick = (e) => {
    const selectedSound = e.target.value;

    if (selectedSounds.includes(selectedSound)) {
      const revisedSelectedSounds = selectedSounds.filter((sound) => sound != selectedSound);
      setSelectedSounds(revisedSelectedSounds)
    } else {
      setSelectedSounds([selectedSound, ...selectedSounds])
    }
  };

  return (
    <main className={styles.main}>
      <h1>Create my Samba mix!</h1>
      <h2>Start by trying out the sounds</h2>
      <Toggle />
      <div className={styles.soundsContainer}>
        {sounds.map((sound) => {
          return <button
            type="button"
            className={`${styles.sound} ${selectedSounds.includes(sound) ? styles.clicked : ''}`}
            value={sound}
            onClick={(e) => handleClick(e)}
          >{sound}</button>
        })}
      </div>
    </main>
  );
}

export default Page;

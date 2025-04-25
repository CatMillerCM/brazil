import PropTypes from 'prop-types';
import { Sound } from '@/components/atoms/sound';
import styles from './sounds.module.css';

const Sounds = ({ selectedSounds, onClick, isReady }) => {
  const sounds = [
    'carioca 1', 'chocalho de platinela 1', 'drums 1', 'pandeiro 1', 'pandeiro 2', 'tantan 1',
    'carioca 1', 'chocalho de platinela 1', 'drums 1', 'pandeiro 1', 'pandeiro 2', 'tantan 1',
  ];
  
  return (
    <div className={styles.soundsContainer}>
      {sounds.map((sound) => (
        <Sound sound={sound} selectedSounds={selectedSounds} onClick={onClick} isReady={isReady}/>
      ))}
  </div>
  )
};

Sounds.propTypes = {
  selectedSounds: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  isReady: PropTypes.bool.isRequired
};

export { Sounds };

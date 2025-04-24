import PropTypes from 'prop-types';
import { Button } from '@/components/atoms/button';
import styles from './result-action-buttons.module.css';

const ResultActionButtons = ({ recordedAudio }) => {
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
    <div className={styles.resultActionButtons}>
      <Button onClick={downloadAudio} disabled={!recordedAudio} label="Download my mix" />
      <Button onClick={shareAudio} disabled={!recordedAudio} label="Share my mix" />
    </div>
  )
};

ResultActionButtons.propTypes = {
  recordedAudio: PropTypes.string.isRequired,
};

export { ResultActionButtons };

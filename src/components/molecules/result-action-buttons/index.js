import PropTypes from 'prop-types';
import { Button } from '@/components/atoms/button';

const DownloadButton = ({ recordedAudio }) => {
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

  return (
    <Button className="download" onClick={downloadAudio} disabled={!recordedAudio} label="Download my mix (.wav)" />
  )
};

DownloadButton.propTypes = {
  recordedAudio: PropTypes.instanceOf(Blob).isRequired
};

export { DownloadButton };

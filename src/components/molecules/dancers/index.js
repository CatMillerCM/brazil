import PropTypes from 'prop-types';
import Image from 'next/image';
import { dancer1, dancer2 } from '@/assets';
import styles from './dancers.module.css';

const Dancers = ({ isReady }) => {
  return (
    <div>
      <Image className={`${styles.dancer} ${isReady ? styles.leftReady : styles.leftStart}`} src={dancer1} alt="Silhouette of a woman dancing wearing carnival attire" />
      <Image className={`${styles.dancer} ${isReady ? styles.rightReady : styles.rightStart}`} src={dancer2} alt="Silhouette of a woman dancing wearing carnival attire" />
    </div>
  )
};

Dancers.propTypes = {
  isReady: PropTypes.bool.isRequired
};

export { Dancers };

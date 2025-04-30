import PropTypes from 'prop-types';
import Image from 'next/image';
import { dancer1, dancer2 } from '@/assets';
import styles from './dancers.module.css';

const Dancers = ({ isStart }) => {
  return (
    <div>
      <Image className={`${styles.dancer} ${isStart ? styles.leftReady : styles.leftStart}`} src={dancer1} alt="Silhouette of a woman dancing wearing carnival attire" />
      <Image className={`${styles.dancer} ${isStart ? styles.rightReady : styles.rightStart}`} src={dancer2} alt="Silhouette of a woman dancing wearing carnival attire" />
    </div>
  )
};

Dancers.propTypes = {
  isStart: PropTypes.bool.isRequired
};

export { Dancers };

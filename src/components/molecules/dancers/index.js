import Image from 'next/image';
import { dancer1, dancer2 } from '@/assets';
import styles from './dancers.module.css';

const Dancers = () => {
  return (
    <div className={styles.dancers}>
      <Image src={dancer1} alt="Silhouette of a woman dancing wearing carnival attire" />
      <Image src={dancer2} alt="Silhouette of a woman dancing wearing carnival attire" />
    </div>
  )
};

export { Dancers };

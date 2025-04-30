import Image from 'next/image';
 import { brazilLoader } from '@/assets';
 import styles from './loader.module.css';
 
 const Loader = () => {
   return (
     <Image className={styles.loader} src={brazilLoader} alt="Brazilian flag spinner loader"/>
   )
 };
 
 export { Loader };
 
import PropTypes from 'prop-types';
import styles from './titles.module.css';

const Titles = ({ showByline = false }) => {
  return (
    <div className={styles.titles}>
      <h1>SambaStack</h1>
      {showByline && <h4>With your sound on, try out the instruments and then hit record when you're ready to create your own mix!</h4>}
    </div>
  )
};

Titles.propTypes = {
  showByline: PropTypes.bool
};

export { Titles };

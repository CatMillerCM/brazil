import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ onClick, disabled = false, label }) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${label === 'Start Recording' ? styles.start : ''}`}
      onClick={onClick}
      disabled={disabled}
    >{label}</button>
  )
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export { Button };

import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ className, onClick, disabled = false, label }) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${className ? styles[className] : ''}`}
      onClick={onClick}
      disabled={disabled}
    >{label}</button>
  )
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export { Button };

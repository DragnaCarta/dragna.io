import type { RadioOption } from '@/app/lib/types';

import styles from './ButtonToggle.module.css';

type ButtonToggleProps = {
  label: string;
  options: RadioOption[];
  selectedValue: number;
  onClick: (value: number) => void;
};

export default function ButtonToggle({
  label,
  options,
  onClick,
  selectedValue,
}: ButtonToggleProps) {
  return (
    <div>
      {/* Label */}
      <label className={styles.label}>{label}</label>

      {/* Radio Input */}
      <div className={styles.container}>
        {options.map((option, i) => (
          <button
            key={i}
            className={`${styles.option} ${styles[option.displayText]} ${
              option.value === selectedValue ? styles.selected : ''
            }`}
            onClick={() => onClick(option.value)}
          >
            {option.displayText}
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import CarretDown from './CarretDown';
import styles from './MultiSelect.module.css';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  toggleOption: any;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  toggleOption,
}) => {
  const [isAll, setIsAll] = useState<boolean>(false);

  return (
    <div className={styles.multiSelect}>
      <div className={styles.multiSelectArrow}>
        <div>Company({selected.length})</div>
        <CarretDown />
      </div>
      <div className={styles.optionSection}>
        <ul className={styles.optionGroup}>
          <li
            className={styles.option}
            onClick={() => {
              setIsAll(!isAll);
              toggleOption('isAll', !isAll);
            }}
          >
            <input
              type="checkbox"
              checked={isAll}
              className={styles.checkBox}
            />
            <span>Select All</span>
          </li>
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <li
                className={styles.option}
                onClick={() => {
                  if (isAll) setIsAll(false);
                  toggleOption(option, isAll);
                }}
                key={option}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  className={styles.checkBox}
                />
                <span>{option}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelect;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { filterMembers } from '../../app/memberslice';
import MultiSelect from './MultiSelect';
import CarretDown from './CarretDown';
import CarretUp from './CarretUp';
import styles from './Filter.module.css';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const companies: string[] = useSelector(
    (state: RootState) => state.member.companies
  );

  const [selected, setSelected] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  const toggleOption = (value: any, isAll: boolean) => {
    let data: string[] = [];
    if (value === 'isAll' && isAll) {
      setSelected(companies);
      data = companies;
    } else if (value === 'isAll' && !isAll) {
      setSelected([]);
      data = [];
    } else if (isAll) {
      setSelected([]);
      data = [];
    } else {
      setSelected((prevSelected) => {
        // if it's in, remove
        const newArray = [...prevSelected];
        if (newArray.includes(value)) {
          return newArray.filter((item) => item !== value);
          // else, add
        } else {
          newArray.push(value);
          data = newArray;
          return newArray;
        }
      });
    }
    const filterData = {
      companies: data,
      isActive: isActive,
    };
    dispatch(filterMembers(filterData));
  };

  const handleSortClick = () => {
    setIsActive(!isActive);
    const filterData = {
      companies: selected,
      isActive: !isActive,
    };
    dispatch(filterMembers(filterData));
  };

  return (
    <div className={styles.filterSection}>
      <MultiSelect
        options={companies}
        selected={selected}
        toggleOption={toggleOption}
      />
      <button onClick={handleSortClick} className={styles.status}>
        <span>Status</span>
        {isActive ? <CarretUp /> : <CarretDown />}
      </button>
    </div>
  );
};

export default Filter;

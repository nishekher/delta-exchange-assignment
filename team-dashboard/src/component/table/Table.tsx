// Table component responsible dispalying Table

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { deleteMember } from '../../app/memberslice';
import Trash from './Trash';
import styles from './Table.module.css';

const Table: React.FC = () => {
  const members = useSelector((state: RootState) => state.member.members);
  const filter: any = useSelector(
    (state: RootState) => state.member.filterMembers
  );
  const [data, setData] = useState<any>([]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterData =
      filter.companies &&
      members.filter((member) => filter.companies.includes(member.company));

    const isfiltered =
      filterData && filterData.length > 0 ? filterData : members;
    const sortedData = [...isfiltered].sort((a, b) => {
      if (filter.isActive) {
        if (
          a.status.toLowerCase() === 'active' &&
          b.status.toLowerCase() === 'closed'
        ) {
          return -1;
        } else if (
          a.status.toLowerCase() === 'closed' &&
          b.status.toLowerCase() === 'active'
        ) {
          return 1;
        }
      }
      // If filter.isActive is false or the status values are the same, maintain the original order
      return 0;
    });
    setData(sortedData);
  }, [filter, members]);

  const handleCheckboxChange = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDeleteClick = (id: number) => {
    dispatch(deleteMember(id));
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Company</th>
          <th>Status</th>
          <th>Last Updated</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.length > 0 &&
          data.map((member: any) => (
            <tr key={member.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(member.id)}
                  onChange={() => handleCheckboxChange(member.id)}
                />
              </td>
              <td>{member.name}</td>
              <td>{member.company}</td>
              <td>{member.status}</td>
              <td>{member.lastUpdate}</td>
              <td>{member.notes}</td>
              <td>
                <button
                  className={styles.trash}
                  onClick={() => handleDeleteClick(member.id)}
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;

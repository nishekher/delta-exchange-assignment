// Table component responsible dispalying Table

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { deleteMember } from '../../app/memberslice';
import Trash from './Trash';
import styles from './Table.module.css';

const Table: React.FC = () => {
  const members = useSelector((state: RootState) => state.member.members);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const dispatch = useDispatch();

  const handleCheckboxChange = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDeleteClick = (id: number) => {
    console.log('delete', id);
    dispatch(deleteMember(id));
  };

  console.log('members', members);
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
        {members &&
          members.length > 0 &&
          members.map((member) => (
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

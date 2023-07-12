// Table component responsible dispalying Table

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './Table.module.css';

const Table: React.FC = () => {
  const members = useSelector((state: RootState) => state.member.members);
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Status</th>
          <th>Last Updated</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {members &&
          members.length > 1 &&
          members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.company}</td>
              <td>{member.status}</td>
              <td>{member.lastUpdate}</td>
              <td>{member.notes}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;

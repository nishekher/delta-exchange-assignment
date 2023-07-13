import React from 'react';
import Table from '../table/Table';
import Modal from '../modal/Modal';
import styles from './Main.module.css';

const Main: React.FC = () => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.header}>
        <h1>Team Members</h1>
        <Modal />
      </div>
      <hr />
      <Table />
    </div>
  );
};

export default Main;

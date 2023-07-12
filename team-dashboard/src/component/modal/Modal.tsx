// This component is responsible for displaying Modal form

import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMember } from '../../app/memberslice';
import styles from './Modal.module.css';

const Modal: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    company: '',
    status: '',
    notes: '',
  });
  const [isModal, setIsModal] = useState(false);

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember = {
      id: Date.now(),
      ...form,
      lastUpdate: getCurrentDate(),
    };
    dispatch(addMember(newMember));
    setForm({
      name: '',
      company: '',
      status: '',
      notes: '',
    });
    setIsModal(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div>
      <button className={styles.modalBtn} onClick={() => setIsModal(true)}>
        Add Mebers +
      </button>
      {isModal ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add members</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form?.name}
                  onChange={handleChange}
                  id="name"
                />
              </div>
              <div>
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  name="company"
                  value={form?.company}
                  onChange={handleChange}
                  id="company"
                />
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  name="status"
                  value={form?.status}
                  onChange={handleChange}
                  id="status"
                />
              </div>
              <div>
                <label htmlFor="notes">Notes</label>
                <input
                  type="text"
                  name="notes"
                  value={form?.notes}
                  onChange={handleChange}
                  id="notes"
                />
              </div>
              <button
                onClick={() => setIsModal(false)}
                className={styles.btnCancel}
              >
                Cancel
              </button>
              <button type="submit" className={styles.btnSave}>
                Save
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;

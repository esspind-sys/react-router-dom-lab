import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { NewMailbox } from '../../App';
import styles from './MailboxForm.module.css';

type MailboxFormProps = {
  addBox: (formData: NewMailbox) => void;
};

const MailboxForm = ({ addBox }: MailboxFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NewMailbox>({
    boxOwner: '',
    boxSize: 'Small',
  });

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    addBox(formData);
    navigate('/mailboxes');
  };

  return (
    <>
      <h1>New Mailbox</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="boxOwner">
          Enter a Boxholder:
        </label>
        <input
          className={styles.input}
          id="boxOwner"
          name="boxOwner"
          placeholder="Boxholder name"
          value={formData.boxOwner}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="boxSize">
          Select a Box Size:
        </label>
        <select
          className={styles.select}
          id="boxSize"
          name="boxSize"
          value={formData.boxSize}
          onChange={handleChange}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default MailboxForm;
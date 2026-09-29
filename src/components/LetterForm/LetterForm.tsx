import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { Mailbox, NewLetter } from '../../App';
import styles from './LetterForm.module.css';

type LetterFormProps = {
  mailboxes: Mailbox[];
  addLetter: (formData: NewLetter) => void;
};

const LetterForm = ({ mailboxes, addLetter }: LetterFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NewLetter>({
    // default to the first mailbox's id if one exists, otherwise 0
    mailboxId: mailboxes[0]?._id ?? 0,
    recipient: '',
    message: '',
  });

  const handleChange = (
    evt: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = evt.target;
    // mailboxId must be a number; the other fields stay as text.
    setFormData({
      ...formData,
      [name]: name === 'mailboxId' ? Number(value) : value,
    });
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    addLetter(formData);
    // redirect to the chosen mailbox's details page
    navigate(`/mailboxes/${formData.mailboxId}`);
  };

  return (
    <>
      <h1>New Letter</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="mailboxId">
          Select a Mailbox:
        </label>
        <select
          className={styles.select}
          id="mailboxId"
          name="mailboxId"
          value={formData.mailboxId}
          onChange={handleChange}
        >
          {mailboxes.map((mailbox) => (
            <option key={mailbox._id} value={mailbox._id}>
              Mailbox {mailbox._id}
            </option>
          ))}
        </select>

        <label className={styles.label} htmlFor="recipient">
          Recipient:
        </label>
        <input
          className={styles.input}
          id="recipient"
          name="recipient"
          placeholder="Recipient name"
          value={formData.recipient}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="message">
          Message:
        </label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default LetterForm;
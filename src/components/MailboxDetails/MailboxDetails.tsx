import { useParams } from 'react-router';
import type { Mailbox, Letter } from '../../App';
import styles from './MailboxDetails.module.css';

type MailboxDetailsProps = {
  mailboxes: Mailbox[];
  letters: Letter[];
};

const MailboxDetails = ({ mailboxes, letters }: MailboxDetailsProps) => {
  const { mailboxId } = useParams();

  const selectedMailbox = mailboxes.find(
    (mailbox) => mailbox._id === Number(mailboxId)
  );

  if (!selectedMailbox) {
    return <h1>Mailbox Not Found!</h1>;
  }

  // Keep only the letters addressed to THIS mailbox.
  const mailboxLetters = letters.filter(
    (letter) => letter.mailboxId === selectedMailbox._id
  );

  return (
    <>
      <h1>Mailbox {selectedMailbox._id}</h1>
      <h2 className={styles.heading}>Details</h2>
      <p className={styles.detail}>Boxholder: {selectedMailbox.boxOwner}</p>
      <p className={styles.detail}>Box Size: {selectedMailbox.boxSize}</p>

      <h2 className={styles.heading}>Letters</h2>
      {mailboxLetters.map((letter) => (
        <div key={letter._id}>
          <p className={styles.detail}>Dear {letter.recipient},</p>
          <p className={styles.detail}>{letter.message}</p>
        </div>
      ))}
    </>
  );
};

export default MailboxDetails;
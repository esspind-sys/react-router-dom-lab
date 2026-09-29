import { Link } from 'react-router';
import type { Mailbox } from '../../App';
import styles from './MailboxList.module.css';

type MailboxListProps = {
  mailboxes: Mailbox[];
};

const MailboxList = ({ mailboxes }: MailboxListProps) => {
  return (
    <>
      <h1>Mailbox List</h1>
      <div className={styles.list}>
        {mailboxes.map((mailbox) => (
          <Link
            key={mailbox._id}
            to={`/mailboxes/${mailbox._id}`}
            className={styles.box}
          >
            Mailbox {mailbox._id}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MailboxList;
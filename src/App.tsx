import { useState } from 'react';
import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import MailboxForm from './components/MailboxForm/MailboxForm';
import MailboxList from './components/MailboxList/MailboxList';
import MailboxDetails from './components/MailboxDetails/MailboxDetails';
import LetterForm from './components/LetterForm/LetterForm'; // new

export type Mailbox = {
  _id: number;
  boxSize: string;
  boxOwner: string;
};

export type NewMailbox = {
  boxSize: string;
  boxOwner: string;
};

// A letter has an id, which mailbox it belongs to, a recipient, and a message.
export type Letter = {
  _id: number;
  mailboxId: number;
  recipient: string;
  message: string;
};

// The letter form submits everything except the auto-assigned _id.
export type NewLetter = {
  mailboxId: number;
  recipient: string;
  message: string;
};

const App = () => {
  const [mailboxes, setMailboxes] = useState<Mailbox[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]); // new letters list

  const addBox = (formData: NewMailbox) => {
    const newMailbox: Mailbox = {
      ...formData,
      _id: mailboxes.length + 1,
    };
    setMailboxes([...mailboxes, newMailbox]);
  };

  // Same pattern as addBox, but for letters.
  const addLetter = (formData: NewLetter) => {
    const newLetter: Letter = {
      ...formData,
      _id: letters.length + 1,
    };
    setLetters([...letters, newLetter]);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Post Office</h1>} />
        <Route path="/mailboxes" element={<MailboxList mailboxes={mailboxes} />} />
        <Route path="/mailboxes/new" element={<MailboxForm addBox={addBox} />} />
        {/* details now also receives letters, so it can show them */}
        <Route
          path="/mailboxes/:mailboxId"
          element={<MailboxDetails mailboxes={mailboxes} letters={letters} />}
        />
        {/* new letter form: needs mailboxes (for dropdown) + addLetter */}
        <Route
          path="/letters/new"
          element={<LetterForm mailboxes={mailboxes} addLetter={addLetter} />}
        />
      </Routes>
    </>
  );
};

export default App;
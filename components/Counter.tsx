import {Alert, AlertColor, Snackbar} from '@mui/material';
import {useState} from 'react';

import styles from '../styles/components/Counter.module.css';
import ResetForm from './ResetForm';


interface CounterProps {
  count: number;
}

export default function Counter ({count: initialCount}: CounterProps) {
  const [count, setCount] = useState(initialCount);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');

  const showMessage = (message: string, severity: AlertColor) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const resetCount = async (password: string) => {
    const response = await fetch('/api/server-counter', {
      method: 'POST',
      body: JSON.stringify({password}),
      headers: {'Content-Type': 'application/json'},
    });

    try {
      const {counter} = await response.json();
      setCount(counter);
      showMessage('Counter reset!', 'success');
    } catch (err) {
      showMessage('Invalid password!', 'warning');
    }
  };

  return (
    <div className={styles.counter}>
      <h2>Days Since Last Incident</h2>
      <p>{count}</p>
      <br />
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <ResetForm handleSubmit={resetCount} />
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{width: '100%'}}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

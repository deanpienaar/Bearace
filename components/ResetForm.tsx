import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {ChangeEvent, useState} from 'react';


interface FormDialogProps {
  handleSubmit: (password: string) => void;
}

export default function FormDialog ({handleSubmit}: FormDialogProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordInput = ({currentTarget}: ChangeEvent<HTMLInputElement>) => {
    const {value} = currentTarget;
    setPassword(value);
  };

  const submit = () => {
    handleSubmit(password);
    setPassword('');
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Reset
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Counter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bearace has done it again. He&apos;s fallen off the edge.
            <br />
            Please provide the password so we know he really did it
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="email"
            fullWidth
            variant="standard"
            value={password}
            onChange={handlePasswordInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Reset</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

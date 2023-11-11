import { Button, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface ModalTemplateProps {
  open: boolean;
  handleOnClose: () => void;
  handleOnAccept: () => void;
  children?: React.ReactNode;
  title: string;
}
// TODO: Move form handling to formik
const ModalTemplate: React.FC<ModalTemplateProps> = ({ open, handleOnClose, children, title, handleOnAccept }) => {
  return (
    <Dialog open={open} onClose={handleOnClose} className="absolute p-2" fullWidth={true} maxWidth={'md'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnAccept();
        }}
        noValidate
      >
        <DialogTitle className="flex flex-row justify-between" sx={{ py: 2, px: 3 }}>
          <Typography sx={{ fontSize: 25 }} /* variant="h4" */>{title}</Typography>
          <IconButton onClick={handleOnClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose}>Cancel</Button>
          <Button onClick={handleOnAccept}>Agree</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalTemplate;

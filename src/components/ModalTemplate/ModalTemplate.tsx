import { DialogTitle, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface ModalTemplateProps {
  open: boolean;
  handleOnClose: () => void;
  children?: React.ReactNode;
  title: string;
}
const ModalTemplate: React.FC<ModalTemplateProps> = ({ open, handleOnClose, children, title }) => {
  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      className="absolute p-2"
      fullWidth={true}
      maxWidth={'md'}
      sx={{ padding: '1em' }}
    >
      <DialogTitle className="flex flex-row justify-between" sx={{ py: 2, px: 3 }}>
        <Typography sx={{ fontSize: 25 }} /* variant="h4" */>{title}</Typography>
        <IconButton onClick={handleOnClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default ModalTemplate;

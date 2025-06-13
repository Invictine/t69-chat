import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button,
  CircularProgress,
  useTheme
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isLoading?: boolean;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  isLoading = false
}: ConfirmDialogProps) {
  const theme = useTheme();
  
  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onCancel}
      PaperProps={{
        sx: {
          backgroundColor: '#18181b',
          color: '#ffffff',
          borderRadius: 2,
          minWidth: 300,
        }
      }}
    >
      <DialogTitle sx={{ fontSize: "1rem", fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#9ca3af' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button 
          onClick={onCancel} 
          disabled={isLoading}
          sx={{ color: '#9ca3af' }}
        >
          {cancelButtonText}
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  Checkbox, 
  List, 
  ListItem, 
  ListItemText,
  CircularProgress
} from '@mui/material';
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import type { Conversation } from '../../../types';
import type { Id } from "../../../../convex/_generated/dataModel";

interface HistoryTabProps {
  conversations: Conversation[];
  clearAllConversations: () => Promise<void>;
  onSnackbarMessage: (message: string, severity: 'success' | 'error' | 'info') => void;
}

const HistoryTab: React.FC<HistoryTabProps> = ({ 
  conversations, 
  clearAllConversations,
  onSnackbarMessage 
}) => {
  // State management
  const [selectedIds, setSelectedIds] = useState<Id<"conversations">[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<'delete'|'clearAll'|''>('');
  const [isLoading, setIsLoading] = useState<{
    export: boolean;
    import: boolean;
    delete: boolean;
    restore: boolean;
    clearAll: boolean;
  }>({
    export: false,
    import: false,
    delete: false,
    restore: false,
    clearAll: false
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Convex mutations
  const deleteConv = useMutation(api.mutations.conversations.deleteConversations);
  const importConv = useMutation(api.mutations.conversations.importConversations);
  const exportConv = useMutation(api.mutations.conversations.exportConversations);
  const restoreChats = useMutation(api.mutations.conversations.restoreOldChats);

  // Selection handlers
  const handleSelectConversation = (id: Id<"conversations">) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(convId => convId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(conversations.map(conv => conv._id));
    }
    setSelectAll(!selectAll);
  };

  // Delete handlers
  const handleDeleteClick = () => {
    if (selectedIds.length === 0) {
      onSnackbarMessage('No conversations selected', 'info');
      return;
    }
    setDialogAction('delete');
    setOpenConfirmDialog(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(prev => ({ ...prev, delete: true }));
      // Pass object with ids property
      await deleteConv({ ids: selectedIds });
      onSnackbarMessage(`${selectedIds.length} conversation(s) deleted successfully`, 'success');
      setSelectedIds([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error deleting conversations:', error);
      onSnackbarMessage('Failed to delete conversations', 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, delete: false }));
      setOpenConfirmDialog(false);
    }
  };

  // Import handlers
  const handleImportClick = () => {
    if (isLoading.import) return;
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(prev => ({ ...prev, import: true }));
      const text = await file.text();
      const jsonData = JSON.parse(text);
      await importConv({ conversations: jsonData });
      
      // Count the number of imported items
      const count = Array.isArray(jsonData) 
        ? jsonData.length 
        : Object.keys(jsonData).length;
      
      onSnackbarMessage(`Successfully imported ${count} conversation(s)`, 'success');
    } catch (error) {
      console.error('Error importing conversations:', error);
      let errorMessage = 'Failed to import conversations';
      
      if (error instanceof SyntaxError) {
        errorMessage = 'Invalid JSON format in the imported file';
      } else if (error instanceof Error) {
        errorMessage = `Import error: ${error.message}`;
      }
      
      onSnackbarMessage(errorMessage, 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, import: false }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Export handler
  const handleExport = async () => {
    if (selectedIds.length === 0) {
      onSnackbarMessage('No conversations selected', 'info');
      return;
    }

    try {
      setIsLoading(prev => ({ ...prev, export: true }));
      // Pass object with ids property
      const result = await exportConv({ ids: selectedIds });
      const dataStr = JSON.stringify(result, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `t69_conversations_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      onSnackbarMessage(`${selectedIds.length} conversation(s) exported successfully`, 'success');
    } catch (error) {
      console.error('Error exporting conversations:', error);
      onSnackbarMessage('Failed to export conversations', 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, export: false }));
    }
  };

  // Clear all conversations
  const handleClearAllClick = () => {
    setDialogAction('clearAll');
    setOpenConfirmDialog(true);
  };

  const handleClearAllConfirm = async () => {
    try {
      setIsLoading(prev => ({ ...prev, clearAll: true }));
      await clearAllConversations();
      onSnackbarMessage('All conversations deleted successfully', 'success');
    } catch (error) {
      console.error('Error clearing all conversations:', error);
      onSnackbarMessage('Failed to clear all conversations', 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, clearAll: false }));
      setOpenConfirmDialog(false);
    }
  };

  // Restore old chats
  const handleRestoreOldChats = async () => {
    try {
      setIsLoading(prev => ({ ...prev, restore: true }));
      await restoreChats();
      onSnackbarMessage('Old chats restored successfully', 'success');
    } catch (error) {
      console.error('Error restoring old chats:', error);
      onSnackbarMessage('Failed to restore old chats', 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, restore: false }));
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Message History
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#9ca3af' }}>
        Save your history as JSON, or import someone else's. Importing will NOT delete existing messages.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Checkbox 
          checked={selectAll}
          onChange={handleSelectAll}
          disabled={conversations.length === 0 || isLoading.export || isLoading.delete || isLoading.import}
        />
        <Typography variant="body2">Select All</Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            onClick={handleExport}
            disabled={selectedIds.length === 0 || isLoading.export || isLoading.delete || isLoading.import}
            startIcon={isLoading.export ? <CircularProgress size={16} /> : null}
          >
            {isLoading.export ? "Exporting..." : "Export"}
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleDeleteClick}
            disabled={selectedIds.length === 0 || isLoading.export || isLoading.delete || isLoading.import}
            startIcon={isLoading.delete ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {isLoading.delete ? "Deleting..." : "Delete"}
          </Button>
          <Button 
            variant="contained" 
            onClick={handleImportClick}
            disabled={isLoading.export || isLoading.delete || isLoading.import}
            startIcon={isLoading.import ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {isLoading.import ? "Importing..." : "Import"}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".json"
            onChange={handleFileUpload}
          />
        </Box>
      </Box>

      {conversations.length === 0 ? (
        <EmptyState 
          message="No conversations found" 
          subMessage="Start a new chat or import existing conversations" 
        />
      ) : (
        <List sx={{ mb: 4 }}>
          {conversations.map((conv) => (
            <ListItem 
              key={conv._id} 
              disableGutters
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                py: 1
              }}
            >
              <Checkbox 
                checked={selectedIds.includes(conv._id)}
                onChange={() => handleSelectConversation(conv._id)}
                disabled={isLoading.export || isLoading.delete || isLoading.import}
              />
              <ListItemText
                primary={conv.title || "Untitled Conversation"}
                secondary={conv.updatedAt && new Date(conv.updatedAt).toLocaleString()}
                primaryTypographyProps={{
                  sx: { color: '#d4d4d8' }
                }}
                secondaryTypographyProps={{
                  sx: { color: '#9ca3af' }
                }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Danger Zone */}
      <Typography variant="h5" sx={{ mt: 6, mb: 1, color: 'error.main' }}>
        Danger Zone
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        If your chats from before June 1st are missing, click to restore them. Contact support if you have issues.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mb: 2,
          backgroundColor: 'error.dark',
          '&:hover': { backgroundColor: 'error.main' }
        }}
        onClick={handleRestoreOldChats}
        disabled={isLoading.restore}
        startIcon={isLoading.restore ? <CircularProgress size={16} color="inherit" /> : null}
      >
        {isLoading.restore ? "Restoring..." : "Restore old chats"}
      </Button>

      <Typography variant="body2" sx={{ mb: 1, color: '#9ca3af' }}>
        Permanently delete your history from both your local device and our servers.*
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={handleClearAllClick}
        disabled={isLoading.clearAll || conversations.length === 0}
        startIcon={isLoading.clearAll ? <CircularProgress size={16} color="inherit" /> : null}
      >
        {isLoading.clearAll ? "Deleting..." : "Delete Chat History"}
      </Button>
      <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#9ca3af' }}>
        *The retention policies of our LLM hosting partners may vary.
      </Typography>

      <ConfirmDialog
        open={openConfirmDialog}
        title={dialogAction === 'delete' ? 'Delete Selected Conversations?' : 'Delete All Conversations?'}
        message={dialogAction === 'delete' 
          ? 'This will permanently delete the selected conversations. This action cannot be undone.'
          : 'This will permanently delete ALL your conversations. This action cannot be undone.'}
        onCancel={() => setOpenConfirmDialog(false)}
        onConfirm={dialogAction === 'delete' ? handleDelete : handleClearAllConfirm}
        confirmButtonText={dialogAction === 'delete' 
          ? (isLoading.delete ? "Deleting..." : "Delete") 
          : (isLoading.clearAll ? "Deleting..." : "Delete All")}
        isLoading={isLoading.delete || isLoading.clearAll}
      />
    </>
  );
};

export default HistoryTab;
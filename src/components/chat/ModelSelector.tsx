import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useChatContext } from '../../context/ChatContext';
import { AVAILABLE_MODELS } from '../../types/index';

const ModelSelector: React.FC = () => {
  const { selectedModel, setSelectedModel } = useChatContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModelSelect = (model: typeof AVAILABLE_MODELS[0]) => {
    setSelectedModel(model);
    handleClose();
  };

  return (
    <>
      <Box 
        onClick={handleClick}
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          cursor: "pointer",
          backgroundColor: "#1e1e23",
          borderRadius: "6px",
          px: 1.5,
          py: 0.5,
          mr: 1.5,
          '&:hover': {
            backgroundColor: "#2a2a30",
          }
        }}
      >
        <Typography sx={{ color: "#a1a1aa", fontSize: "0.8rem", fontWeight: 500 }}>
          {selectedModel.name}
        </Typography>
        <KeyboardArrowDown sx={{ color: "#a1a1aa", fontSize: "1rem", ml: 0.5 }} />
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#1e1e23",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            mt: 1,
            minWidth: 200,
          }
        }}
      >
        {AVAILABLE_MODELS.map((model) => (
          <MenuItem
            key={model.id}
            onClick={() => handleModelSelect(model)}
            selected={model.id === selectedModel.id}
            sx={{
              color: "#e4e4e7",
              '&:hover': {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
              '&.Mui-selected': {
                backgroundColor: "rgba(167, 139, 250, 0.1)",
                '&:hover': {
                  backgroundColor: "rgba(167, 139, 250, 0.15)",
                }
              }
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                {model.name}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: 'capitalize' }}>
                {model.provider}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ModelSelector;

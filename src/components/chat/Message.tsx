import React, { useState, useCallback, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Box, 
  Typography, 
  IconButton, 
  Tooltip, 
  useTheme, 
  CircularProgress, 
  Divider, 
  Fade,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Paper,
  useMediaQuery,
  Collapse,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { 
  ContentCopy as CopyIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  MoreVert as MoreIcon,
  OpenInNew as OpenIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  FormatQuote as QuoteIcon,
} from '@mui/icons-material';
import { format, isToday, isYesterday } from 'date-fns';
import type { Message as ChatMessage } from '../../types';  // ← pull in the shared type

interface MessageProps {
  message: ChatMessage;
  isGenerating?: boolean;
  onFeedback?: (id: string, type: 'like' | 'dislike') => void;
  onCopy?: (id: string) => void;
  previousMessage?: ChatMessage | null;
}

// Language display mapping
const LANGUAGE_MAP: Record<string, string> = {
  javascript: 'JavaScript',
  js: 'JavaScript',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  jsx: 'React JSX',
  tsx: 'React TSX',
  python: 'Python',
  py: 'Python',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  java: 'Java',
  kotlin: 'Kotlin',
  swift: 'Swift',
  csharp: 'C#',
  cs: 'C#',
  cpp: 'C++',
  c: 'C',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP',
  ruby: 'Ruby',
  rb: 'Ruby',
  sql: 'SQL',
  bash: 'Bash',
  sh: 'Shell',
  powershell: 'PowerShell',
  ps1: 'PowerShell',
  yaml: 'YAML',
  yml: 'YAML',
  markdown: 'Markdown',
  md: 'Markdown',
  dockerfile: 'Dockerfile',
  plaintext: 'Text',
  text: 'Text',
};

// Main Message component
const Message = memo(({ message, isGenerating = false, onFeedback, previousMessage }: MessageProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isUser = message.sender === 'user';
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [copied, setCopied] = useState<{[key: string]: boolean}>({});
  
  const formattedTime = message.timestamp ? format(new Date(message.timestamp), 'h:mm a') : null;
  
  // Should we show the previous message? Only if:
  // 1. This is a bot message
  // 2. There is a previous message
  // 3. The previous message was from a user
  const shouldShowPreviousMessage = !isUser && 
                                   previousMessage && 
                                   previousMessage.sender === 'user';
  
  // Handle hover state for action buttons on desktop
  const handleMouseEnter = () => {
    if (!isMobile && !isTablet) {
      setShowActionButtons(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile && !isTablet) {
      setShowActionButtons(false);
    }
  };

  // Menu handling
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  
  // Copy entire message
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setSnackbarMessage('Message copied to clipboard');
    setSnackbarOpen(true);
    handleMenuClose();
  };
  
  // Copy code block
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied({...copied, [id]: true});
      setTimeout(() => {
        setCopied({...copied, [id]: false});
      }, 2000);
    });
  };
  
  // Feedback handling
  const handleFeedback = (type: 'like' | 'dislike') => {
    if (onFeedback) {
      onFeedback(message.id, type);
      setSnackbarMessage(`Thanks for your ${type === 'like' ? 'positive' : 'negative'} feedback!`);
      setSnackbarOpen(true);
    }
    handleMenuClose();
  };
  
  // Custom Markdown renderer components
  const renderers = {
    p: ({ children }: any) => (
      <Typography 
        component="p" 
        sx={{ 
          my: 1, 
          lineHeight: 1.7,
          fontSize: '0.95rem',
          color: '#d4d4d8',
          '&:first-of-type': { mt: 0 },
          '&:last-of-type': { mb: 0 },
          overflowWrap: 'break-word', // Ensure text doesn't overflow
        }}
      >
        {children}
      </Typography>
    ),
    
    h1: ({ children }: any) => (
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mt: 3, 
          mb: 2, 
          fontWeight: 700,
          color: '#ececef',
          overflowWrap: 'break-word',
        }}
      >
        {children}
      </Typography>
    ),
    
    h2: ({ children }: any) => (
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          mt: 2.5, 
          mb: 1.5, 
          fontWeight: 600,
          color: '#ececef',
          overflowWrap: 'break-word',
        }}
      >
        {children}
      </Typography>
    ),
    
    strong: ({ children }: any) => (
      <Box component="strong" sx={{ fontWeight: 600, color: '#ffffff' }}>
        {children}
      </Box>
    ),
    
    em: ({ children }: any) => (
      <Box component="em" sx={{ fontStyle: 'italic' }}>
        {children}
      </Box>
    ),
    
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <Box
            component="code"
            sx={{
              fontFamily: 'monospace',
              backgroundColor: 'rgba(29, 31, 46, 0.7)',
              color: '#d4d4d8',
              px: 0.8,
              py: 0.3,
              mx: 0.3,
              borderRadius: 1,
              fontSize: '0.85rem',
              wordBreak: 'break-word',
            }}
          >
            {children}
          </Box>
        );
      }

      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'plaintext';
      const codeString = String(children).replace(/\n$/, '');
      const codeId = `code-${message.id}-${Math.random().toString(36).substring(2, 8)}`;
      
      return (
        <Box 
          sx={{ 
            borderRadius: 1.5, 
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            mb: 2, 
            backgroundColor: '#0E0E14',
            width: '100%',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 0.8,
              px: 1.5,
              background: 'linear-gradient(90deg, rgba(122, 0, 70, 0.2) 0%, rgba(15, 15, 20, 0.8) 100%)',
              borderBottom: '1px solid rgba(122, 0, 70, 0.3)',
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#fff',
                backgroundColor: 'rgba(122, 0, 70, 0.6)',
                px: 1,
                py: 0.3,
                borderRadius: 1,
                fontWeight: 500,
                fontSize: '0.7rem',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}
            >
              {LANGUAGE_MAP[language] || language}
            </Typography>
            
            <Tooltip title={copied[codeId] ? "Copied!" : "Copy code"}>
              <IconButton
                size="small"
                onClick={() => handleCopyCode(codeString, codeId)}
                sx={{
                  color: copied[codeId] ? '#10b981' : '#9ca3af',
                  p: 0.3,
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
            
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '16px',
              fontSize: '0.85rem',
              borderRadius: 0,
              overflowX: 'auto',
            }}
            showLineNumbers={codeString.split('\n').length > 3}
            lineNumberStyle={{ opacity: 0.4, userSelect: 'none', paddingRight: '12px' }}
            wrapLongLines={true}
          >
            {codeString}
          </SyntaxHighlighter>
        </Box>
      );
    },
    
    blockquote: ({ children }: any) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: '3px solid #7a0046',
          pl: 2,
          py: 0.5,
          my: 2,
          backgroundColor: 'rgba(122, 0, 70, 0.08)',
          borderRadius: '0 4px 4px 0',
        }}
      >
        {children}
      </Box>
    ),
    
    ul: ({ children }: any) => (
      <Box 
        component="ul" 
        sx={{ 
          pl: 0, // No left padding for top-level list
          my: 1.5,
          listStyleType: 'none',
          '& > li': {
            position: 'relative',
            pl: 2.5, // Only indent the list item content
            mb: 1.5,
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '0.5em',
              width: 6,
              height: 6,
              backgroundColor: '#9c3d54',
              borderRadius: '50%',
            }
          },
          // Only add padding for nested lists
          '& ul, & ol': {
            pl: 2
          }
        }}
      >
        {children}
      </Box>
    ),
    
    ol: ({ children }: any) => (
      <Box 
        component="ol" 
        sx={{ 
          pl: 0, // No left padding for top-level list
          counterReset: 'list-counter',
          listStyleType: 'none',
          my: 1.5,
          '& > li': {
            position: 'relative',
            pl: 2.5, // Only indent the list item content
            mb: 1.5,
            counterIncrement: 'list-counter',
            '&::before': {
              content: 'counter(list-counter)',
              position: 'absolute',
              left: 0,
              fontWeight: 500,
              color: '#b24592', // Purple color from screenshot
              width: '1.5em',
            }
          },
          // Only add padding for nested lists
          '& ul, & ol': {
            pl: 2
          }
        }}
      >
        {children}
      </Box>
    ),
    
    li: ({ children }: any) => (
      <Box 
        component="li" 
        sx={{ 
          '& > p': { my: 0.5 }
        }}
      >
        {children}
      </Box>
    ),
    
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#6ea8fe',
          textDecoration: 'none',
          borderBottom: '1px dotted rgba(110, 168, 254, 0.5)',
          paddingBottom: '1px',
          wordBreak: 'break-all',
        }}
      >
        {children}
      </a>
    ),
    
    hr: () => (
      <Divider sx={{ 
        my: 2, 
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }} />
    ),
  };

  return (
    <Box
      sx={{
        mb: 3,
        textAlign: isUser ? 'right' : 'left',
        width: '100%',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    > 
      
      {/* Message content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          width: '100%',
        }}
      >
        {message.content === '' && isGenerating ? (
          <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
            <CircularProgress size={16} thickness={4} sx={{ color: '#9ca3af' }} />
            <Typography variant="body2" sx={{ color: '#9ca3af', fontStyle: 'italic' }}>
              Generating response...
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              maxWidth: '95%',
              borderRadius: 2,
              px: isUser ? 2 : 0,
              py: isUser ? 1.5 : 0,
              backgroundColor: isUser ? '#2B2532' : 'transparent',
              textAlign: isUser ? 'left' : 'left',
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={renderers}
            >
              {message.content}
            </ReactMarkdown>
            
            {/* Blinking cursor when generating */}
            {isGenerating && !isUser && (
              <Fade in={true}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: 2,
                    height: '1.2em',
                    backgroundColor: '#9ca3af',
                    marginLeft: '2px',
                    verticalAlign: 'text-bottom',
                    animation: 'blink 1s step-end infinite',
                    '@keyframes blink': {
                      '0%, 100%': { opacity: 0 },
                      '50%': { opacity: 1 },
                    },
                  }}
                />
              </Fade>
            )}
          </Box>
        )}
      </Box>
      
      {/* Action buttons */}
      {!isUser && !isGenerating && (
        <Box 
          className="message-actions"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            mt: 1.5,
            opacity: { xs: 0.8, md: showActionButtons ? 1 : 0 },
            transition: 'opacity 0.2s ease',
            visibility: { xs: 'visible', md: showActionButtons ? 'visible' : 'hidden' },
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Copy message">
              <IconButton
                size="small"
                onClick={handleCopyMessage}
                sx={{ 
                  color: '#9ca3af',
                  '&:hover': { color: '#6ea8fe' }
                }}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Branch off">
              <IconButton
                size="small"
                onClick={() => handleFeedback('like')}
                sx={{ 
                  color: '#9ca3af',
                  '&:hover': { color: '#10b981' }
                }}
              >
                <ThumbUpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Retry">
              <IconButton
                size="small"
                onClick={() => handleFeedback('dislike')}
                sx={{ 
                  color: '#9ca3af',
                  '&:hover': { color: '#ef4444' }
                }}
              >
                <ThumbDownIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            
          </Box>
        </Box>
      )}
      
      {/* Notification snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ 
            backgroundColor: '#0f172a',
            color: '#94a3b8',
            border: '1px solid #1e293b',
            '& .MuiAlert-icon': {
              color: '#38bdf8'
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default Message;

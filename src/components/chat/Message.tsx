import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, IconButton, Tooltip, useTheme, CircularProgress } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import vsDark from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015';
import vsLight from 'react-syntax-highlighter/dist/esm/styles/hljs/github';
import { copy } from 'copy-to-clipboard';

interface MessageProps {
  message: {
    sender: 'user' | 'bot';
    content: string;
  };
  isGenerating?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isGenerating = false }) => {
  const theme = useTheme();
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    copy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

const codeRenderer = ({ inline, className = '', children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className);
  const codeString = String(children).replace(/\n$/, '');

  if (!inline && match) {
    return (
      <Box sx={{ position: 'relative', mb: 2 }}>
        <SyntaxHighlighter
          language={match[1]}
          style={theme.palette.mode === 'dark' ? vsDark : vsLight}
          PreTag="div"
          customStyle={{
            background: 'inherit',
            padding: '16px',
            borderRadius: theme.shape.borderRadius,
            fontSize: '0.875rem',
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
        <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="top">
          <IconButton
            size="small"
            onClick={() => handleCopy(codeString)}
            sx={{
              position: 'absolute',
              top: theme.spacing(1),
              right: theme.spacing(1),
              color: theme.palette.text.secondary,
              bgcolor: theme.palette.background.paper,
              '&:hover': { bgcolor: theme.palette.action.hover },
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box
      component="code"
      sx={{
        fontFamily: 'monospace',
        bgcolor: theme.palette.action.hover,
        px: 0.5,
        borderRadius: 1,
        fontSize: '0.875rem',
      }}
    >
      {children}
    </Box>
  );
};


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '85%',
          borderRadius: 2,
          backgroundColor: isUser
            ? theme.palette.primary.main
            : theme.palette.background.paper,
          padding: 2,
          color: isUser
            ? theme.palette.primary.contrastText
            : theme.palette.text.primary,
          boxShadow: isUser ? 'none' : theme.shadows[1],
          position: 'relative',
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <Typography variant="body1" sx={{ margin: 0 }}>
                {children}
              </Typography>
            ),
            strong: ({ children }) => (
              <Box component="strong" sx={{ fontWeight: 'bold' }}>
                {children}
              </Box>
            ),
            em: ({ children }) => (
              <Box component="em" sx={{ fontStyle: 'italic' }}>
                {children}
              </Box>
            ),
            del: ({ children }) => (
              <Box component="del" sx={{ textDecoration: 'line-through' }}>
                {children}
              </Box>
            ),
            u: ({ children }) => (
              <Box component="u" sx={{ textDecoration: 'underline' }}>
                {children}
              </Box>
            ),
            code: codeRenderer,
            pre: ({ children }) => (
              <Box component="div" sx={{ mt: 1 }}>
                {children}
              </Box>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.palette.mode === 'dark' ? '#8ab4f8' : '#1a0dab' }}
              >
                {children}
              </a>
            ),
            ul: ({ children }) => <ul style={{ paddingLeft: 20, margin: 0 }}>{children}</ul>,
            ol: ({ children }) => <ol style={{ paddingLeft: 20, margin: 0 }}>{children}</ol>,
            li: ({ children }) => <li>{children}</li>,
            blockquote: ({ children }) => (
              <Box
                component="blockquote"
                sx={{
                  borderLeft: `4px solid ${theme.palette.text.disabled}`,
                  pl: 2,
                  color: theme.palette.text.secondary,
                  fontStyle: 'italic',
                }}
              >
                {children}
              </Box>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>

        {!isUser && isGenerating && message.content === '' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <CircularProgress size={12} sx={{ color: theme.palette.text.secondary }} />
            <Typography
              sx={{
                fontSize: '0.85rem',
                color: theme.palette.text.secondary,
                fontStyle: 'italic',
              }}
            >
              Thinking...
            </Typography>
          </Box>
        )}

        {!isUser && isGenerating && message.content !== '' && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: 2,
              height: '1em',
              backgroundColor: theme.palette.text.secondary,
              marginLeft: '2px',
              animation: 'blink 1s infinite',
              '@keyframes blink': {
                '0%, 50%': { opacity: 1 },
                '51%, 100%': { opacity: 0 },
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Message;

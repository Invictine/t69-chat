import React from 'react';
import { Box, Typography, styled, keyframes } from '@mui/material';
import { SignIn } from '@clerk/clerk-react';

// Subtle background animation
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Floating animation for 69 circles
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
  100% { transform: translateY(0px) rotate(360deg); opacity: 0.3; }
`;

const float2 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
  33% { transform: translateY(-30px) rotate(120deg); opacity: 0.7; }
  66% { transform: translateY(-10px) rotate(240deg); opacity: 0.9; }
  100% { transform: translateY(0px) rotate(360deg); opacity: 0.4; }
`;

const float3 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
  25% { transform: translateY(-40px) rotate(90deg); opacity: 0.6; }
  75% { transform: translateY(-15px) rotate(270deg); opacity: 0.8; }
  100% { transform: translateY(0px) rotate(360deg); opacity: 0.2; }
`;

// Shimmer effect for social buttons
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const BackgroundContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, #1e1b4b, #312e81, #3730a3, #1e40af);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  overflow: hidden;
`;

// Floating 69 circles
const FloatingNumber = styled(Box)`
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: 4rem;
  font-weight: 900;
  pointer-events: none;
  user-select: none;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  
  &:nth-of-type(1) {
    top: 10%;
    left: 10%;
    animation: ${float} 6s ease-in-out infinite;
    animation-delay: 0s;
  }
  
  &:nth-of-type(2) {
    top: 20%;
    right: 15%;
    animation: ${float2} 8s ease-in-out infinite;
    animation-delay: 2s;
    font-size: 3rem;
  }
  
  &:nth-of-type(3) {
    bottom: 15%;
    left: 20%;
    animation: ${float3} 10s ease-in-out infinite;
    animation-delay: 4s;
    font-size: 2.5rem;
  }
  
  &:nth-of-type(4) {
    bottom: 30%;
    right: 10%;
    animation: ${float} 7s ease-in-out infinite;
    animation-delay: 1s;
    font-size: 3.5rem;
  }
  
  &:nth-of-type(5) {
    top: 50%;
    left: 5%;
    animation: ${float2} 9s ease-in-out infinite;
    animation-delay: 3s;
    font-size: 2rem;
  }
  
  &:nth-of-type(6) {
    top: 60%;
    right: 5%;
    animation: ${float3} 11s ease-in-out infinite;
    animation-delay: 5s;
    font-size: 2.8rem;
  }
`;

const CohesiveCard = styled(Box)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.4),
    0 16px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
  max-width: 460px;
  width: 100%;
  padding: 40px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  }
`;

const Login: React.FC = () => {
  return (
    <>
      {/* Gradient Background with Floating 69s */}
      <BackgroundContainer>
        <FloatingNumber>69</FloatingNumber>
        <FloatingNumber>69</FloatingNumber>
        <FloatingNumber>69</FloatingNumber>
        <FloatingNumber>69</FloatingNumber>
        <FloatingNumber>69</FloatingNumber>
        <FloatingNumber>69</FloatingNumber>
      </BackgroundContainer>

      {/* Main Content - Perfectly Centered */}
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        height="100vh" 
        width="100vw" 
        position="relative"
        zIndex={10}
        sx={{ padding: 2 }}
      >
        <CohesiveCard>
          {/* Header Section */}
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: "#fff",
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2rem' },
                background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                letterSpacing: '-0.01em'
              }}
            >
              Welcome to T69 Chat
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: '1rem',
                lineHeight: 1.5,
                maxWidth: '300px',
                margin: '0 auto'
              }}
            >
              Sign in to start chatting with advanced AI models like GPT-4 and Gemini
            </Typography>
          </Box>

          {/* Integrated Clerk Component */}
          <Box sx={{ 
            // Make the entire Clerk component seamless
            '& .cl-rootBox': {
              width: '100%',
            },
            '& .cl-card': { 
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              width: '100%'
            },
            '& .cl-headerTitle': {
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.25rem',
              textAlign: 'center'
            },
            '& .cl-headerSubtitle': {
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              fontSize: '0.9rem'
            },            // Enhanced Social Buttons with super shiny edges
            '& .cl-socialButtonsBlockButton': {
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '12px',
              color: '#fff',
              backdropFilter: 'blur(12px)',
              padding: '14px 18px',
              margin: '8px 4px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                // Main shimmer effect
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-200%',
                width: '200%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                animation: `${shimmer} 2s infinite`,
                animationDelay: '0s'
              },
              
              // Top edge shine
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                borderRadius: '12px 12px 0 0'
              },
              
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.4)',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                '&::before': {
                  animationDuration: '1.5s'
                }
              },
              
              '&:active': {
                transform: 'translateY(-1px) scale(1.01)'
              }
            },
            // Enhanced Form Fields
            '& .cl-formFieldInput': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '16px 18px',
              fontSize: '1rem',
              height: '52px',
              transition: 'all 0.3s ease',
              '&:focus': {
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                borderColor: 'rgba(168, 85, 247, 0.6)',
                boxShadow: '0 0 0 3px rgba(168, 85, 247, 0.2)',
                transform: 'translateY(-1px)'
              },
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)'
              }
            },
            '& .cl-formFieldLabel': {
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 500,
              fontSize: '0.9rem',
              marginBottom: '8px'
            },
            // Enhanced Continue Button
            '& .cl-formButtonPrimary': {
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 24px',
              fontSize: '1rem',
              fontWeight: 600,
              height: '52px',
              width: '100%',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)'
              },
              '&:active': {
                transform: 'translateY(0)'
              }
            },
            // Style other elements
            '& .cl-footerActionLink': {
              color: '#c084fc',
              fontWeight: 500,
              '&:hover': {
                color: '#e879f9'
              }
            },
            '& .cl-dividerLine': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            },
            '& .cl-dividerText': {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem'
            },            // Bottom section styling - integrated within card
            '& .cl-footerAction': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              margin: '24px 0 0 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }
          }}>
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "w-full bg-transparent shadow-none border-0 p-0",
                  formButtonPrimary: "font-semibold text-white w-full",
                  socialButtonsBlockButton: "font-medium",
                  formFieldInput: "text-white placeholder-gray-400",
                  footerAction: "rounded-xl"
                }
              }}
            />
          </Box>

          {/* Integrated Footer */}
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 3,
              pt: 2,
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: '0.8rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            By continuing, you agree to our{' '}
            <Box 
              component="a" 
              href="#" 
              sx={{ 
                color: "#c084fc", 
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { 
                  color: '#e879f9',
                  textDecoration: 'underline'
                }
              }}
            >
              Terms of Service
            </Box>
            {' '}and{' '}
            <Box 
              component="a" 
              href="#" 
              sx={{ 
                color: "#c084fc",
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { 
                  color: '#e879f9',
                  textDecoration: 'underline'
                }
              }}
            >
              Privacy Policy
            </Box>
          </Typography>
        </CohesiveCard>
      </Box>
    </>
  );
};

export default Login;
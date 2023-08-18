import React, { useEffect, useState } from 'react';
import { useToast, Alert, AlertIcon, Box } from '@chakra-ui/react';

interface Props {
  timeInSeconds: number
}

export const ToastWithCountdown = ({timeInSeconds} : Props) => {
  const toast = useToast();
  const [countdown, setCountdown] = useState(timeInSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  const alertVariant = countdown < 0 ? 'error' : 'warning'; // Change alert variant based on countdown
  return (
    <Alert status={alertVariant} variant="solid"> {/* Use dynamic alert status */}
      <AlertIcon />
      <Box>
        {countdown > -1 && `Za ${countdown} sekund Twoja sesja wygaśnie, zachowaj swoją pracę lub zaloguj się ponownie.`} 
        {countdown < 0 && 'Twoja sesja wygasła, zaloguj się ponownie!'} 
      </Box>
    </Alert>
  );
};

import React from 'react';
import { Box } from '@mantine/core';
import { ButtonWithText } from '@/components/molecules/ButtonWithText';

export const Form: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Box>
      <h1>Simple Form</h1>
      <ButtonWithText 
        label="Click Me" 
        content="This is some text above the button." 
        onClick={handleClick} 
      />
    </Box>
  );
};

import React from 'react';
import { Button  } from '@mantine/core';

interface ButtonProps {
  label: string;
  mystyles?: React.CSSProperties;
  onClick?: () => void;
}


export const CustomButton: React.FC<ButtonProps> = ({ label, mystyles, ...props }) => {
  return (
    <Button
      style={{
        backgroundColor: 'rgba(17, 17, 17, 1)',
        color: 'white',
        borderRadius: '0',
        ...mystyles,
      }}
      
      {...props}
    >
      {label}
    </Button>
  );
};

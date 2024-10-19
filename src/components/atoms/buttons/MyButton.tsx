import React from 'react';
import { Button as MantineButton } from '@mantine/core';

interface ButtonProps {
  label: string;
  onClick: () => void;
  mystyles?: React.CSSProperties; 
}

export const MyButton: React.FC<ButtonProps> = ({ label, onClick, mystyles }) => {
  return (
    <MantineButton onClick={onClick}      style={{ 
      backgroundColor: 'rgba(17, 17, 17, 1)',
      color: 'white', 
      borderRadius: '0', 
      ...mystyles 
    }} >
      {label}
    </MantineButton>
  );
};
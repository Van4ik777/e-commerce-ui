import React from 'react';
import { Button as MantineButton } from '@mantine/core';

interface ButtonProps {
  label: string;
  mystyles?: React.CSSProperties;
  onClick?: () => void;
}

// TODO: Rename to CustomButton or StyledButton

export const MyButton: React.FC<ButtonProps> = ({ label, mystyles, ...props }) => {
  return (
    <MantineButton
      style={{
        backgroundColor: 'rgba(17, 17, 17, 1)',
        color: 'white',
        borderRadius: '0',
        ...mystyles,
      }}
      {...props}
    >
      {label}
    </MantineButton>
  );
};

import React from 'react';
import { Box, Button, Text, TextInput } from '@mantine/core';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  return (
    <Box>
      <TextInput
        label="Email or Name"
        placeholder="Enter your email or name"
        radius="md"
        mb="md"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        radius="md"
        mb="lg"
      />
      <Button fullWidth color="gray" radius="md" mb="sm">
        Log In
      </Button>
      <Text mt="md">
        Don't have an account?{' '}
        <span
          style={{ color: '#ff6347', cursor: 'pointer' }}
          onClick={onSwitchToRegister}
        >
          Register
        </span>
      </Text>
    </Box>
  );
};

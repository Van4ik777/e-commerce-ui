import React from 'react';
import { Box, Button, Text, TextInput } from '@mantine/core';

interface LoginFormProps {
  formData: {
    email: string;
    username?: string;
    password: string;
    confirmPassword?: string;
  };
  onChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  onChange,
  onLogin,
  onSwitchToRegister,
}) => {
  return (
    <Box>
      <TextInput
        label="Email or Name"
        placeholder="Enter your email or name"
        radius="md"
        mb="md"
        value={formData.email}
        onChange={onChange('email')}
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        radius="md"
        mb="lg"
        value={formData.password}
        onChange={onChange('password')}
      />
      <Button fullWidth color="gray" radius="md" mb="sm" onClick={onLogin}>
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

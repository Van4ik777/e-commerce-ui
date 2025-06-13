import React from 'react';
import { Box, Button, Text, TextInput } from '@mantine/core';

interface RegisterFormProps {
  formData: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  onChange,
  onRegister,
  onSwitchToLogin,
}) => {
  return (
    <Box>
      <TextInput
        label="Username"
        placeholder="Enter your name"
        radius="md"
        mb="md"
        value={formData.username}
        onChange={onChange('username')}
      />
      <TextInput
        label="Email"
        placeholder="Enter your email"
        radius="md"
        mb="md"
        value={formData.email}
        onChange={onChange('email')}
      />
      <TextInput
        label="Password"
        placeholder="Create a password"
        type="password"
        radius="md"
        mb="md"
        value={formData.password}
        onChange={onChange('password')}
      />
      <TextInput
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        radius="md"
        mb="lg"
        value={formData.confirmPassword}
        onChange={onChange('confirmPassword')}
      />

      <Button fullWidth color="gray" radius="md" mb="sm" onClick={onRegister}>
        Register
      </Button>
      <Text mt="md">
        Already have an account?{' '}
        <span
          style={{ color: '#ff6347', cursor: 'pointer' }}
          onClick={onSwitchToLogin}
        >
          Log In
        </span>
      </Text>
    </Box>
  );
};

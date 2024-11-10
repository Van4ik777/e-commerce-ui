import { Box, Button, TextInput, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <Box style={{ width: '400px', margin: '100px auto', padding: '20px' }}>
      <Text size="xl"mb="lg">
        Sign Up
      </Text>
      <TextInput label="Email" placeholder="Enter your email" mb="md" />
      <TextInput label="Password" placeholder="Create a password" type="password" mb="md" />
      <TextInput label="Confirm Password" placeholder="Confirm your password" type="password" mb="lg" />
      <Button fullWidth color="dark" radius="sm" mb="sm">
        Register
      </Button>
      <Text mt="md">
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'inherit' }}>
          Log In
        </Link>
      </Text>
    </Box>
  );
};

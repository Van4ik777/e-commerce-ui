import { Box, Button, TextInput, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <Box style={{ width: '400px', margin: '100px auto', padding: '20px' }}>
      <Text size="xl" mb="lg">
        Sign In
      </Text>
      <TextInput label="Email" placeholder="Enter your email" mb="md" />
      <TextInput label="Password" placeholder="Enter your password" type="password" mb="lg" />
      <Button fullWidth color="dark" radius="sm" mb="sm">
        Log In
      </Button>
      <Text mt="md">
        Don't have an account?{' '}
        <Link to="/register" style={{ color: 'inherit' }}>
          Register
        </Link>
      </Text>
    </Box>
  );
};

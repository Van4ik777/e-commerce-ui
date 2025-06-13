import React, { useEffect, useState } from 'react';
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Text,
} from '@mantine/core';
import { PAGES } from '@/constants/PAGES';
import { useAuth } from '@/store/auth.store';
import { Card } from '../molecules/card';
import { LoginForm } from './forms/LoginForm';
import { RegisterForm } from './forms/RegisterForm';

const pagesWithOutLinks = [PAGES.product, '/product'];

export const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { pathname } = useLocation();
  const { isAuth, register, login } = useAuth();
  const [opened, setOpened] = useState(false);
  const [myError, setMyError] = useState('');
  const navigate = useNavigate();
  const [cartOpened, setCartOpened] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Navigation links in the header
  const navLinks = [
    { text: 'SALE', path: PAGES.sale },
    { text: 'OFFLINE STORE', path: '/offline-store' },
    { text: 'ABOUT US', path: '/about-us' },
    { text: 'CALCULATOR', path: '/calculator' },
    { text: 'CONTACTS', path: '/contacts' },
  ];

  // Check if current page is in the list where we don't want to show header links
  const isPageWithoutLinks = pagesWithOutLinks.some((link) =>
    pathname.startsWith(link)
  );

  // Effect to track scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Controlled form inputs handler
  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  // Registration handler with validation
  const handleReg = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setMyError('All fields are required.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMyError('Passwords do not match.');
      return;
    }
    setMyError('');
    register(formData);
    setOpened(false);
    navigate(PAGES.home);
  };

  // Login handler with validation
  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      setMyError('Please enter email and password.');
      return;
    }
    setMyError('');
    login({ email: formData.email, password: formData.password });
    setOpened(false);
    navigate(PAGES.home);
  };

  // Open modal and reset form for login/register
  const toggleModal = (register: boolean) => {
    setIsRegister(register);
    setOpened(true);
    setMyError('');
    setFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  };

  if (isPageWithoutLinks) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: scrolling ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          transition: 'background-color 0.3s ease',
          zIndex: 1000,
          padding: '10px 0',
          boxShadow: scrolling ? '0 2px 5px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {/* Cart card */}
        <Card opened={cartOpened} onClose={() => setCartOpened(false)} />

        {/* Logo */}
        <Link to={PAGES.home}>
          <div
            style={{
              marginTop: '20px',
              marginLeft: '80px',
              position: 'absolute',
              color: 'black',
              fontFamily: 'Montserrat',
              fontSize: '26px',
              fontWeight: 400,
              lineHeight: '20.23px',
              textAlign: 'left',
            }}
          >
            MOCHEL
          </div>
        </Link>

        {/* Navigation Links */}
        <div style={{ marginLeft: '30vw', marginRight: '5vw' }}>
          <Group style={{ padding: '20px 0' }}>
            <Group style={{ flex: 1, gap: '52px' }}>
              {navLinks.map(({ text, path }) => (
                <Box key={text} ta="center">
                  <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: scrolling ? '20px' : '22px',
                        fontWeight: 700,
                        lineHeight: '21.09px',
                        textAlign: 'left',
                        transition: 'font-size 0.3s ease',
                      }}
                    >
                      {text}
                    </Text>
                  </Link>
                </Box>
              ))}
            </Group>

            {/* Icons and buttons */}
            <Group>
              <ActionIcon size="xl" variant="transparent" color="black">
                <AiOutlineSearch style={{ fontSize: '32px' }} />
              </ActionIcon>
              <ActionIcon size="xl" variant="transparent" color="black">
                <AiOutlineHeart style={{ fontSize: '32px' }} />
              </ActionIcon>

              {myError && (
                <Text color="red" mb="sm">
                  {myError}
                </Text>
              )}

              {!isAuth && (
                <>
                  <Button color="dark" radius="sm" onClick={() => toggleModal(false)}>
                    Sign In
                  </Button>

                  <Modal
                    opened={opened}
                    onClose={() => {
                      setOpened(false);
                      setFormData({
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: '',
                      });
                      setMyError('');
                    }}
                    title={isRegister ? 'Sign Up' : 'Sign In'}
                    centered
                    styles={{
                      title: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' },
                    }}
                  >
                    {isRegister ? (
                      <RegisterForm
                        formData={formData}
                        onChange={handleChange}
                        onRegister={handleReg}
                        onSwitchToLogin={() => setIsRegister(false)}
                      />
                    ) : (
                      <LoginForm
                        formData={formData}
                        onChange={handleChange}
                        onLogin={handleLogin}
                        onSwitchToRegister={() => setIsRegister(true)}
                      />
                    )}
                  </Modal>
                </>
              )}

              {isAuth && (
                <ActionIcon size="xl" variant="transparent" color="black">
                  <AiOutlineUser style={{ fontSize: '32px' }} />
                </ActionIcon>
              )}

              <ActionIcon variant="transparent" color="black" onClick={() => setCartOpened(true)}>
                <AiOutlineShoppingCart style={{ fontSize: '32px' }} />
              </ActionIcon>
            </Group>
          </Group>
          <Divider color="black" size="sm" />
        </div>
      </div>
    </>
  );
};

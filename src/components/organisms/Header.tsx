import React, { useEffect, useState } from 'react';
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { PAGES } from '@/constants/PAGES';
import { useAuth } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';
import { Card } from '../molecules/card';


const pagesWithOutLinks = [PAGES.product, '/product'];

export const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isRegister, setIsRegister] = useState(false); 
  const { pathname } = useLocation();
  const { isAuth, register,login } = useAuth();
  const [opened, setOpened] = useState(false);
  const [myError, setMyError]=useState('')
  const navigate = useNavigate();
  const [cartOpened, setCartOpened] = useState(false);
  const [FormData, setFormData] = useState({
    email:'',
    username:'',
    password:'',
    confirmPassword:''
  })
  const navLinks = [
    { text: 'SALE', path: PAGES.sale },
    { text: 'OFFLINE STORE', path: '/offline-store' },
    { text: 'ABOUT US', path: '/about-us' },
    { text: 'CALCULATOR', path: '/calculator' },
    { text: 'CONTACTS', path: '/contacts' },
  ];
  console.log(isAuth)
  const isPageWithoutLinks = pagesWithOutLinks.some((link) => pathname.startsWith(link));

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  function handleReg(){
    if (!FormData.username || !FormData.email || !FormData.password || !FormData.confirmPassword) {
      setMyError('All fields are required.');
      return
    }
    if (FormData.password !== FormData.confirmPassword) {
      setMyError('Passwords do not match.');
      return
    }
    setMyError('')
    register(FormData)
    navigate(PAGES.home); 
  }

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...FormData, [field]: event.target.value });
  };
  const toggleModal = (register: boolean) => {
    setIsRegister(register); 
    setOpened(true);
  };

  return (
    <>
      {!isPageWithoutLinks && (
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
          <Card opened={cartOpened} onClose={() => setCartOpened(false)} />
          <Link to={PAGES.home}>
            <div
              style={{
                marginTop: '20px',
                marginLeft: '80px',
                position: 'absolute',
                color: 'black',
              }}
            >
              <div
                style={{
                  marginTop: '12px',
                  fontFamily: 'Montserrat',
                  fontSize: '26px',
                  fontWeight: 400,
                  lineHeight: '20.23px',
                  textAlign: 'left',
                }}
              >
                MOCHEL
              </div>
            </div>
          </Link>
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

              <Group>
                <ActionIcon size="xl" variant="transparent" color="black">
                  <AiOutlineSearch style={{ fontSize: '32px' }} />
                </ActionIcon>
                <ActionIcon size="xl" variant="transparent" color="black">
                  <AiOutlineHeart style={{ fontSize: '32px' }} />
                </ActionIcon>
                {myError && <Text color="red" mb="sm">{myError}</Text>}

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
                      }}
                      title={isRegister ? 'Sign Up' : 'Sign In'}
                      centered
                      styles={{
                        title: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' },
                      }}
                    >
                      {isRegister ? (
                        <Box>
                          <TextInput
                            label="username"
                            placeholder="Enter your name"
                            radius="md"
                            mb="md"
                            value={FormData.username}
                            onChange={handleChange('username')}
                            styles={{ input: { backgroundColor: '#222', color: '#fff' } }}
                          />
                          <TextInput
                            label="Email"
                            placeholder="Enter your email"
                            radius="md"
                            mb="md"
                            value={FormData.email}
                            onChange={handleChange('email')}
                            styles={{ input: { backgroundColor: '#222', color: '#fff' } }}
                          />
                          <TextInput
                            label="Password"
                            placeholder="Create a password"
                            type="password"
                            radius="md"
                            mb="md"
                            value={FormData.password}
                            onChange={handleChange('password')}
                            styles={{ input: { backgroundColor: '#222', color: '#fff' } }}
                          />
                          <TextInput
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            type="password"
                            radius="md"
                            mb="lg"
                            value={FormData.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            styles={{ input: { backgroundColor: '#222', color: '#fff' } }}
                          />

                          <Button fullWidth color="gray" radius="md" mb="sm" onClick={handleReg}>
                            Register
                          </Button>
                          <Text  mt="md">
                            Already have an account?{' '}
                            <span
                              style={{ color: '#ff6347', cursor: 'pointer' }}
                              onClick={() => setIsRegister(false)}
                            >
                              Log In
                            </span>
                          </Text>
                        </Box>
                      ) : (
                        <Box>
                          <TextInput
                            label="Email or Name"
                            placeholder="Enter your email or  name"
                            radius="md"
                            mb="md"
                            styles={{ input: { backgroundColor: '#222', color: '#fff' } }}
                          />
                          <TextInput
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            radius="md"
                            mb="lg"
                            styles={{ input: { backgroundColor: '#222', color: '#fff' } }}
                          />
                          <Button fullWidth color="gray" radius="md" mb="sm">
                            Log In
                          </Button>
                          <Text mt="md">
                            Don't have an account?{' '}
                            <span
                              style={{ color: '#ff6347', cursor: 'pointer' }}
                              onClick={() => setIsRegister(true)}
                            >
                              Register
                            </span>
                          </Text>
                        </Box>
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
        
      )}
    </>
  );
};

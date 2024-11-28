import React, { useEffect, useState } from 'react';
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { ActionIcon, Box, Divider, Group, Text } from '@mantine/core';
import { PAGES } from '@/constants/PAGES';
import { CustomButton } from '../atoms/buttons/CustomButton';

const pagesWithOutLinks = [PAGES.product, '/product'];

export const Header: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { pathname } = useLocation();

  // TODO: move outside component and use PAGES constant
  const navLinks = [
    { text: 'SALE', path: PAGES.sale },
    { text: 'OFFLINE STORE', path: '/offline-store' },
    { text: 'ABOUT US', path: '/about-us' },
    { text: 'CALCULATOR', path: '/calculator' },
    { text: 'CONTACTS', path: '/contacts' },
  ];

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
                {!isAuthenticated && (
                  <>
                    <Link to={PAGES.login}>
                      <CustomButton mystyles={{ zIndex: 1 }} label="Sign In" />
                    </Link>
                    <Link to={PAGES.register}>
                      <CustomButton mystyles={{ zIndex: 1 }} label="Register" />
                    </Link>
                  </>
                )}
                {isAuthenticated && (
                  <ActionIcon size="xl" variant="transparent" color="black">
                    <AiOutlineUser style={{ fontSize: '32px' }} />
                  </ActionIcon>
                )}
                <ActionIcon variant="transparent" color="black">
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

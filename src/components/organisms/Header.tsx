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
  Burger,
  Container,
  Divider,
  Group,
  MantineProvider,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { PAGES } from '@/constants/PAGES';

const pagesWithOutLinks = [PAGES.product, PAGES.catalog];

export const Header: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const theme = useMantineTheme();

  const { pathname } = useLocation();

  const currentPage = pathname.split('/')[1];
  console.log(!pagesWithOutLinks.includes(currentPage));
  // Додаємо ефект для відстеження прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50); // Змінюємо стан scrolling, якщо прокрутка більше 50 пікселів
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: scrolling ? 'rgba(255, 255, 255, 0.9)' : 'transparent', // Змінюємо фон при прокрутці
        transition: 'background-color 0.3s ease',
        zIndex: 1000,
        padding: '10px 0', // Додаємо відступ
        boxShadow: scrolling ? '0 2px 5px rgba(0, 0, 0, 0.1)' : 'none', // Додаємо тінь при прокрутці
      }}
    >
      <div style={{ marginTop: '20px', marginLeft: '80px', position: 'absolute' }}>
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

      <div style={{ marginLeft: '30vw', marginRight: '5vw' }}>
        <Group style={{ padding: '20px 0' }}>
          {!pagesWithOutLinks.includes(`/${currentPage}`) && (
            <Group style={{ flex: 1, gap: '52px' }}>
              {/*Create constant links*/}
              {['SALE', 'OFFLINE STORE', 'ABOUT US', 'CALCULATOR', 'CONTACTS'].map((text) => (
                <Box key={text} style={{ textAlign: 'center' }}>
                  <Link
                    to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
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
          )}

          <Group>
            <ActionIcon size="xl" variant="transparent" color="black">
              <AiOutlineSearch style={{ fontSize: '32px' }} />
            </ActionIcon>
            <ActionIcon size="xl" variant="transparent" color="black">
              <AiOutlineHeart style={{ fontSize: '32px' }} />
            </ActionIcon>
            <ActionIcon size="xl" variant="transparent" color="black">
              <AiOutlineUser style={{ fontSize: '32px' }} />
            </ActionIcon>
            <ActionIcon variant="transparent" color="black">
              <AiOutlineShoppingCart style={{ fontSize: '32px' }} />
            </ActionIcon>
          </Group>
        </Group>
        <Divider color="black" size="sm" />
      </div>
    </div>
  );
};

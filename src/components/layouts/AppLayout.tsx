import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Box mb={120} />
      <Outlet />
      <Footer />
    </>
  );
};

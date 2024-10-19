import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { AppLayout } from '@/components/layouts/AppLayout';
import { PAGES } from '@/constants/PAGES';
import { Catalog } from './components/pages/Catalog';
import { HomePage } from './components/pages/Home.page';
import { ProductPage } from './components/pages/ProductPage';

// TODO: Configure Mantine theme settings according to https://mantine.dev/theming/mantine-provider

const App = () => {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'dark',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      {/*TODO: Routes.tsx*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/*TODO: Write all routes to PAGES.ts and use this object instead hardcoding paths*/}
            <Route index element={<Navigate to={PAGES.home} />} />
            <Route path={PAGES.home} element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/calculator" element={<h1>123</h1>} />
            <Route path="/product/:productType/:productId" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;

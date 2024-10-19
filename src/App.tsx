import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { HomePage } from './components/pages/Home.page';
import { Header } from './components/pages/Header';
import { ProductPage } from './components/pages/ProductPage';
import { Footer } from './components/pages/footer';
import { Catalog } from './components/pages/Catalog';

const App: React.FC = () => {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'dark',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/HomePage" />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:productType/:productId" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
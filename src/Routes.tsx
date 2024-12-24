import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@mantine/core/styles.css';
import { AppLayout } from '@/components/layouts/AppLayout';
import { PAGES } from '@/constants/PAGES';
import { Catalog } from './components/pages/Catalog';
import { HomePage } from './components/pages/Home';
import { ProductPage } from './components/pages/ProductPage';
import { WaitForEmail } from './components/pages/WaitForEmail';

const AppRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to={PAGES.home} />} />
            <Route path={PAGES.home} element={<HomePage />} />
            <Route path={PAGES.catalog} element={<Catalog />} />
            <Route path={PAGES.calculator} element={<h1>123</h1>} />
            <Route path={PAGES.products()} element={<ProductPage />} />
            <Route path={PAGES.checkEmail} element={<WaitForEmail />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default AppRoutes;

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@mantine/core/styles.css';
import { AppLayout } from '@/components/layouts/AppLayout';
import { PAGES } from '@/constants/PAGES';
import { Catalog } from './components/pages/Catalog';
import { HomePage } from './components/pages/Home';
import { ProductPage } from './components/pages/ProductPage';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/register';

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
            <Route path= {PAGES.login} element={<Login/>} />
            <Route path= {PAGES.register} element={<Register/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default AppRoutes;
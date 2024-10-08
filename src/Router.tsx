import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './components/pages/Home.page';
import { Pagetext } from './components/pages/Pagetext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/ewrwerwer',
    element: <Pagetext/>,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

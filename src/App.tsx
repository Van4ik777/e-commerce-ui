import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import AppRoutes from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';

const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: 'Roboto, sans-serif',

});
const queryClient = new QueryClient()

const App = () => {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <QueryClientProvider client={queryClient}>
    <MantineProvider
      theme={theme}
    >
      <AppRoutes/>
    </MantineProvider>
    </QueryClientProvider>
    </CookiesProvider>
  );
};

export default App;

import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import AppRoutes from './Routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: 'Roboto, sans-serif',

});
const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <MantineProvider
      theme={theme}
    >
      <AppRoutes/>
    </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;

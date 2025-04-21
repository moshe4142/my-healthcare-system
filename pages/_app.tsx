import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';
import AuthGuard from '../components/AuthGuard';
import Layout from '../components/Layout'; // ADD THIS

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthGuard>
        <Layout> {/* WRAP EVERYTHING IN LAYOUT */}
          <Component {...pageProps} />
        </Layout>
      </AuthGuard>
    </ThemeProvider>
  );
}

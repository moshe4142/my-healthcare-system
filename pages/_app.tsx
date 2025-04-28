import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';
import AuthGuard from '../components/AuthGuard';
import Layout from '../components/Layout'; // <-- Bring it back!

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthGuard>
        <Layout> {/* WRAP all pages inside Layout */}
          <Component {...pageProps} />
        </Layout>
      </AuthGuard>
    </ThemeProvider>
  );
}

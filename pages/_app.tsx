import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

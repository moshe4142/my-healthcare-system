import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';
import NavBar from '../components/NavBar';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
    <NavBar />
      <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
    
  );
}

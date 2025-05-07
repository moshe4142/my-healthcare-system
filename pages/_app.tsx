import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import { ShoppingCartProvider } from "../context/shoppingCartContext";
import "../styles/globals.css";
import AuthGuard from "../components/AuthGuard";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <ShoppingCartProvider>
          <AuthGuard>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthGuard>
        </ShoppingCartProvider>
      </ThemeProvider>
    </>
  );
}

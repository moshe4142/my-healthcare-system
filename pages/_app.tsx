import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import { CartProvider } from "../context/shoppingCartContext";
import "../styles/globals.css";
import AuthGuard from "../components/AuthGuard";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // עטיפת האפליקציה בקונטקסט של עגלת קניות (ובעתיד גם ערכת נושא)
    <CartProvider>
      {/* אפשר לפתוח את ThemeProvider כשצריך */}
      {/* <ThemeProvider> */}
        <AuthGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthGuard>
      {/* </ThemeProvider> */}
    </CartProvider>
  );
}

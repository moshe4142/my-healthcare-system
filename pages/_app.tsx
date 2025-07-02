// pages/_app.tsx
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CartProvider } from "../context/shoppingCartContext";
import { ProductsProvider } from "@/context/productsContext";
import AuthGuard from "../components/AuthGuard";
import Layout from "../components/Layout";
import Skeleton from "../components/LoadingSpinner"; // the spinner component
import "../styles/globals.css";
import { ThemeProvider } from "../context/ThemeContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsRouteLoading(true);
    const handleComplete = () => setIsRouteLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <ThemeProvider>
      <CartProvider>
        <ProductsProvider>
          <AuthGuard>
            <Layout>
              {isRouteLoading ? <Skeleton /> : <Component {...pageProps} />}
            </Layout>
          </AuthGuard>
        </ProductsProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

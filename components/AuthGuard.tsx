"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Skeleton from "./LoadingSpinner"; // Your loading spinner component

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // All hooks must be at the top level
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

const publicPaths = ["/login", "/signup", "/reset-password", "/test-send"];

  // Simulate initial page load delay (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Check auth state
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token && !publicPaths.includes(pathname)) {
      router.push("/login");
    } else {
      setIsAuthenticated(!!token);
    }

    setChecked(true);
  }, [pathname, router]);

  // Show skeleton while loading or checking auth
  if (isLoading || !checked) {
    return <Skeleton />;
  }

  // If not authenticated and not on a public page, block access
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return null;
  }

  // Otherwise, render children
  return <>{children}</>;
}

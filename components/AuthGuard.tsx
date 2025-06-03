"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Skeleton from "./LoadingSpinner"; // Optional spinner component

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = ["/login", "/signup", "/reset-password"];

  useEffect(() => {
    const checkAuth = async () => {
      console.log("AuthGuard: useEffect triggered");

      try {
        const res = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include", // include cookies with JWT
        });

        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
        } else {
          console.warn("AuthGuard: User not authenticated");
          if (!publicPaths.includes(pathname)) {
            router.push("/login");
          }
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("AuthGuard: Error checking authentication", err);
        if (!publicPaths.includes(pathname)) {
          router.push("/login");
        }
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return <Skeleton />; // or just <div>Loading...</div> if you prefer
  }

  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return null; // prevent showing content before redirect
  }

  return <>{children}</>;
}

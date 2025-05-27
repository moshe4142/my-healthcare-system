"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

const publicPaths = ["/login", "/signup", "/reset-password"];

  // Simulate initial page load delay (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // Check auth state
  useEffect(() => {
    console.log("AuthGuard useEffect triggered");
    const token = localStorage.getItem("userToken");
    console.log("Token from localStorage:", token);

    if (!token && !publicPaths.includes(pathname)) {
      console.log("No token and not in public path, redirecting...");
      router.push("/login");
    } else {
      setIsAuthenticated(!!token);
    }

    setChecked(true);
  }, [pathname]);

  if (!checked) {
    console.log("AuthGuard: Loading...");
    return <div>Loading...</div>;
  }

  // If not authenticated and not on a public page, block access
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    console.log("User not authenticated, blocking access...");
    return <div>Redirecting...</div>; // או null כדי שלא ייראה כלום
  }

  console.log("Rendering children, user is authenticated:", isAuthenticated);
  return <>{children}</>;
}

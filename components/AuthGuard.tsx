'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = ['/login', '/signup', '/reset-password'];

  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthGuard: useEffect triggered');

      try {
        const res = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include', // חשוב כדי לשלוח את העוגיה עם הבקשה
        });

        if (res.ok) {
          const data = await res.json();
          // console.log('AuthGuard: User authenticated', data.user);
          setIsAuthenticated(true);
        } else {
          console.log('AuthGuard: User not authenticated');
          if (!publicPaths.includes(pathname)) {
            router.push('/login');
          }
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('AuthGuard: Error checking authentication', err);
        if (!publicPaths.includes(pathname)) {
          router.push('/login');
        }
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return <div>Redirecting...</div>;
  }

  return <>{children}</>;
}

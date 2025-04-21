import React, { ReactNode } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="text-xl font-bold">Healthcare System</div>
        <div className="space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-green-400">Home</Link>
          <Link href="/medicalRecords" className="hover:text-green-400">Medical Records</Link>
          <Link href="/medicalEquipment" className="hover:text-green-400">Medical Equipment</Link>
          <Link href="/appointments" className="hover:text-green-400">Appointments</Link>
          <Link href="/payments" className="hover:text-green-400">Payments</Link>
          {/* <Link href="/login" className="hover:text-green-400">Login</Link> */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center text-sm p-4 mt-8">
        &copy; {new Date().getFullYear()} Healthcare System. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;

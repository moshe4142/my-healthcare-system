import Link from 'next/link';
import ToggleButton from '../context/ThemeToggle'; // Import the ToggleButton

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold underline">Welcome to the Homepage</h1>

      {/* Toggle Button for Dark Mode */}
      <div className="mt-4">
        <ToggleButton />
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex space-x-4">
        <Link href="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
        <Link href="/appointments" className="text-blue-400 hover:underline">
          Appointments
        </Link>
      </nav>
    </div>
  );
}

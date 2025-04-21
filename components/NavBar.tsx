import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Medical Records', href: '/medicalRecords' },
    { label: 'Medical Equipment', href: '/medicalEquipment' },
    { label: 'Appointments', href: '/appointments' },
    { label: 'Payments', href: '/payments' },
    { label: 'Login', href: '/login' },
  ];

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-green-400">Healthcare System</h1>
        <div className="space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`cursor-pointer hover:text-green-400 transition-colors ${
                  router.pathname === item.href ? 'text-green-400 underline' : ''
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

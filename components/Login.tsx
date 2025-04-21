'use client';

import React, { useState } from 'react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem('userToken', 'exampleToken123');
      onLogin();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="mb-3 p-2 w-full bg-gray-700 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 w-full bg-gray-700 text-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}


















// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (username && password) {
//       localStorage.setItem('userToken', 'demoToken');
//       router.push('/');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
//       <h1 className="text-3xl font-bold mb-6">Login</h1>
//       <input
//         type="text"
//         placeholder="Username"
//         className="mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 w-full max-w-sm"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="mb-6 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 w-full max-w-sm"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button
//         onClick={handleLogin}
//         className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold"
//       >
//         Sign In
//       </button>
//     </div>
//   );
// }

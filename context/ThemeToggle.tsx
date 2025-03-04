// import { useTheme } from './ThemeContext';

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div 
//       className="flex items-center cursor-pointer"
//       onClick={toggleTheme}
//     >
//       {/* Toggle Switch */}
//       <div className={`relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-all`}>
//         {/* Toggle Knob */}
//         <div 
//           className={`w-6 h-6 bg-white dark:bg-yellow-400 rounded-full shadow-md transform transition-all ${
//             theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
//           }`}
//         />
//       </div>

//       {/* Label */}
//       <span className="ml-3 text-gray-700 dark:text-gray-300 text-sm font-medium">
//         {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
//       </span>
//     </div>
//   );
// }

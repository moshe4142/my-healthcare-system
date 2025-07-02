'use client';
import { useTheme } from '@mui/material/styles'; // אם אתה משתמש ב־MUI
import Header from "./ButtonAppBar";

export default function LoadingSkeleton() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <div
      className={`
        min-h-screen flex flex-col
        ${isDark ? 'bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-100' : 'bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900'}
        pt-[100px]
        transition-colors duration-300
      `}
    >
      <Header className="opacity-70 pointer-events-none" />

      <main className="flex-grow px-4 md:px-10 py-12">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* כותרת של העמוד */}
          <div className={`
            h-10 w-1/3 rounded-md animate-pulseScale
            ${isDark ? 'bg-[#455a64]' : 'bg-[#cfd8dc]'}
          `} />

          {/* פסקה קצרה */}
          <div className={`
            h-4 w-1/2 rounded-md animate-pulseScale
            ${isDark ? 'bg-[#546e7a]' : 'bg-[#cfd8dc]'}
          `} />

          {/* באדג' או טקסט מסכם */}
          <div className={`
            h-4 w-1/5 rounded-md animate-pulseScale
            ${isDark ? 'bg-[#37474f]' : 'bg-[#b0bec5]'}
          `} />

          {/* טבלת שלד - כותרת טבלה */}
          <div className={`
            grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-md p-4 shadow
            ${isDark ? 'bg-[#263238]' : 'bg-[#e3f2fd]'}
          `}>
            <div className={`h-4 w-full rounded animate-pulseScale ${isDark ? 'bg-[#455a64]' : 'bg-[#cfd8dc]'}`} />
            <div className={`h-4 w-full rounded animate-pulseScale ${isDark ? 'bg-[#455a64]' : 'bg-[#cfd8dc]'}`} />
            <div className={`h-4 w-full rounded hidden sm:block animate-pulseScale ${isDark ? 'bg-[#455a64]' : 'bg-[#cfd8dc]'}`} />
            <div className={`h-4 w-full rounded hidden sm:block animate-pulseScale ${isDark ? 'bg-[#455a64]' : 'bg-[#cfd8dc]'}`} />
          </div>

          {/* שורות טבלה של שלד */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`
                grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-md p-4 shadow-sm
                ${isDark ? 'bg-[#37474f]' : 'bg-[#f5f5f5]'}
              `}
            >
              <div className={`h-4 w-full rounded animate-pulseScale ${isDark ? 'bg-[#546e7a]' : 'bg-[#e0e0e0]'}`} />
              <div className={`h-4 w-full rounded animate-pulseScale ${isDark ? 'bg-[#546e7a]' : 'bg-[#e0e0e0]'}`} />
              <div className={`h-4 w-2/3 rounded hidden sm:block animate-pulseScale ${isDark ? 'bg-[#546e7a]' : 'bg-[#e0e0e0]'}`} />
              <div className={`h-6 w-1/2 rounded-full hidden sm:block animate-pulseScale ${isDark ? 'bg-[#26c6da]' : 'bg-[#b2ebf2]'}`} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

'use client';
import Header from "./ButtonAppBar";
// import Footer from "./Footer";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#e0f7fa] to-white text-gray-800 pt-[100px]">
      <Header className="opacity-70 pointer-events-none" />

      <main className="flex-grow px-4 md:px-10 py-12">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* כותרת של העמוד */}
          <div className="h-10 w-1/3 bg-[#cfd8dc] rounded-md animate-pulseScale" />

          {/* פסקה קצרה */}
          <div className="h-4 w-1/2 bg-[#cfd8dc] rounded-md animate-pulseScale" />

          {/* באדג' או טקסט מסכם */}
          <div className="h-4 w-1/5 bg-[#b0bec5] rounded-md animate-pulseScale" />

          {/* טבלת שלד - כותרת טבלה */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#e3f2fd] rounded-md p-4 shadow">
            <div className="h-4 w-full bg-[#cfd8dc] rounded animate-pulseScale" />
            <div className="h-4 w-full bg-[#cfd8dc] rounded animate-pulseScale" />
            <div className="h-4 w-full bg-[#cfd8dc] rounded hidden sm:block animate-pulseScale" />
            <div className="h-4 w-full bg-[#cfd8dc] rounded hidden sm:block animate-pulseScale" />
          </div>

          {/* שורות טבלה של שלד */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#f5f5f5] rounded-md p-4 shadow-sm"
            >
              <div className="h-4 w-full bg-[#e0e0e0] rounded animate-pulseScale" />
              <div className="h-4 w-full bg-[#e0e0e0] rounded animate-pulseScale" />
              <div className="h-4 w-2/3 bg-[#e0e0e0] rounded hidden sm:block animate-pulseScale" />
              <div className="h-6 w-1/2 bg-[#b2ebf2] rounded-full hidden sm:block animate-pulseScale" />
            </div>
          ))}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

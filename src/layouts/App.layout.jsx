import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        {/* Body */}
        <Outlet />
      </main>

      <footer className="p-4 md:p-6 text-center bg-gray-800 w-full mt-10">
        <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg">
          Made with 💗 by Kartikey
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
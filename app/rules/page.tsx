// pages/rules.tsx
"use client";
import Navbar from "@/components/Navbar";  // Optional: Include the navbar
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function Rules() {
  return (
    <>
      <Navbar /> {/* Optional: Include the navbar */}
      <div className="p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center mt-12 ">
          ОЗНАЙОМИТИСЯ З ПРАВИЛАМИ ТА ПІДПИСАТИ
        </h1>
        <div className="flex justify-center">
          <Link href="/rules-details">
            <Button className="bg-gray-800 text-white hover:bg-gray-700 font-bold py-6 px-12 text-xl rounded-lg">
              ОЗНАЙОМИТИСЯ
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

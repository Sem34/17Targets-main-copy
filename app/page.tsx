"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar"; 
import SustainableDevelopmentGoals from "@/components/SustainableGoalsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen">
      <SustainableDevelopmentGoals />
      <div className="flex justify-center mt-8">
          <Link href="/user/signingpage">
          <Button className="bg-gray-800 text-white hover:bg-gray-200 hover:text-gray-800 font-bold py-6 px-12 text-xl rounded-lg">
              ЗАРЕЄСТРУВАТИСЯ НА ПЛАТФОРМІ
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}


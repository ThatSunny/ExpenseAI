"use client";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { Menu, ChevronLeft } from "lucide-react";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    if (result?.length == 0) {
      router.replace("/dashboard");
    }
  };

  return (
    <div>
      {/* Hamburger for mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`fixed block lg:hidden top-4 z-50 p-3 rounded-full shadow items-center justify-center transition-all duration-300
          ${
            menuOpen
              ? "bg-white border border-gray-400 text-gray-700 left-64 -translate-x-16"  // stuck on right border of sidebar
              : "bg-transparent text-gray-900 left-4"
          }
        `}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
      </button>

      {/* SideNav with toggle */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-40 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block md:w-64`}
      >
        <SideNav />
      </div>

      {/* Backdrop for mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
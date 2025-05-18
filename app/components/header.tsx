"use client";

import Image from "next/image";
import Link from "next/link";
import { userProfile } from "../../lib/mockData"; // adjust path as needed
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useDarkMode } from '../context/DarkModeContext'; // adjust path

export default function Header() {
  const user = userProfile;
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-4 sm:px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="w-full max-w-[150px] hidden sm:block">
            <Image
              src={darkMode ? "/images/crosstrek-logo.svg" : "/images/crosstrek-logo-black.svg"}
              alt="Crosstrekrentals Logo"
              width={150}
              height={40}
              className="object-contain w-full h-auto"
              priority
            />
          </div>

          {/* Mobile logo (shown only on small screens) */}
          <div className="w-full max-w-[150px] block sm:hidden">
            <Image
              src={darkMode ? "/images/crosstrek-logo-mobile.svg" : "/images/crosstrek-logo-black.svg"}
              alt="Crosstrekrentals Mobile Logo"
              width={100} // smaller width for mobile logo, adjust as needed
              height={30}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
            {/* <span className="text-2xl font-bold text-gray-900 dark:text-white ml-2">
              Crosstrekrentals
            </span> */}

          {/* Hamburger button - only on small screens */}
          <button
            className="sm:hidden text-gray-900 dark:text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Center - Desktop Nav */}
        <nav className="hidden sm:flex gap-8 font-medium text-gray-900 dark:text-white">
          <Link
            href="/rent-gear"
            className={`hover:text-ihYellow ${isActive("/rent-gear") ? "text-ihYellow" : ""}`}
          >
            Rent Gear
          </Link>
          <Link
            href="/rentals"
            className={`hover:text-ihYellow ${isActive("/rentals") ? "text-ihYellow" : ""}`}
          >
            My Orders
          </Link>
          <Link
            href="/faq"
            className={`hover:text-ihYellow ${isActive("/faq") ? "text-ihYellow" : ""}`}
          >
            FAQ
          </Link>
        </nav>

        {/* Right - Desktop Profile */}
        <div className="hidden sm:flex">
          <Link href="/profile" className="flex items-center gap-3 text-gray-900 dark:text-white">
            <Image
              src={user.profile_photo}
              alt={`${user.full_name} profile`}
              width={32}
              height={32}
              className="rounded-full object-cover"
              priority
            />
            <span className="font-medium">{user.full_name}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu with transition */}
      <nav
        className={`sm:hidden mt-4 space-y-3 font-medium text-gray-900 dark:text-white overflow-hidden transition-all duration-700 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link
          href="/rent-gear"
          onClick={() => setMenuOpen(false)}
          className={`block px-2 py-1 hover:text-ihYellow ${isActive("/rent-gear") ? "text-ihYellow" : ""}`}
        >
          Rent Gear
        </Link>
        <Link
          href="/rentals"
          onClick={() => setMenuOpen(false)}
          className={`block px-2 py-1 hover:text-ihYellow ${isActive("/rentals") ? "text-ihYellow" : ""}`}
        >
          My Orders
        </Link>
        <Link
          href="/faq"
          onClick={() => setMenuOpen(false)}
          className={`block px-2 py-1 hover:text-ihYellow ${isActive("/faq") ? "text-ihYellow" : ""}`}
        >
          FAQ
        </Link>
        <Link
          href="/profile"
          onClick={() => setMenuOpen(false)}
          className="block px-2 py-1 flex items-center gap-2"
        >
          <Image
            src={user.profile_photo}
            alt={`${user.full_name} profile`}
            width={28}
            height={28}
            className="rounded-full object-cover"
            priority
          />
          <span>{user.full_name}</span>
        </Link>
      </nav>
    </header>
  );
}

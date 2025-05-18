"use client";

import Image from 'next/image';
import Link from 'next/link';
import { userProfile } from '../../lib/mockData';  // adjust path as needed
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

export default function Header() {
  const user = userProfile;
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // or a loading placeholder

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-white-600">
            Crosstrekrentals
          </Link>
        </div>

        {/* Center */}
        <nav className="flex gap-8 font-medium text-white-600">
          <Link
            href="/rent-gear"
            className={`hover:text-ihYellow ${isActive('/rent-gear') ? 'text-ihYellow' : ''}`}
          >
            Rent Gear
          </Link>
          <Link
            href="/rentals"
            className={`hover:text-ihYellow ${isActive('/rentals') ? 'text-ihYellow' : ''}`}
          >
            My Orders
          </Link>
          <Link
            href="/faq"
            className={`hover:text-ihYellow ${isActive('/faq') ? 'text-ihYellow' : ''}`}
          >
            FAQ
          </Link>
        </nav>

        {/* Right */}
        <div>
          <Link href="/profile" className="flex items-center gap-3">
            <Image
              src={user.profile_photo}
              alt={`${user.full_name} profile`}
              width={32}
              height={32}
              className="rounded-full object-cover"
              priority
            />
            <span className="text-white-600 font-medium">{user.full_name}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 p-4 text-white flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`hover:underline ${
            pathname === item.path ? "font-bold underline" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

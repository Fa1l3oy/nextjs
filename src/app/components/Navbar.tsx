"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/student" },
  { name: "Contact", path: "/contact" },
  { name: "Teacher", path: "/teacher" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`hover:underline ${
                pathname === item.path ? "font-bold underline" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path) => {
    const isActive =
      pathname === path || (path === "/table" && pathname === "/");
    return isActive
      ? "border-blue-500 text-gray-900 dark:text-white"
      : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600";
  };

  const getMobileLinkClass = (path) => {
    const isActive =
      pathname === path || (path === "/table" && pathname === "/");
    return isActive
      ? "bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-200"
      : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white";
  };

  return (
    <Navbar
      className="bg-white dark:bg-gray-800 shadow-sm"
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
    >
      <NavbarBrand>
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          Meme Guide
        </span>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6">
        <NavbarItem>
          <Link
            href="/table"
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${getLinkClass(
              "/table"
            )}`}
          >
            Table
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/list"
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${getLinkClass(
              "/list"
            )}`}
          >
            List
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu className="bg-white dark:bg-gray-800">
        <NavbarMenuItem>
          <Link
            href="/table"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${getMobileLinkClass(
              "/table"
            )}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Table
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="/list"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${getMobileLinkClass(
              "/list"
            )}`}
            onClick={() => setIsMenuOpen(false)}
          >
            List
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

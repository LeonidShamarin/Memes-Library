'use client';

import { useState } from 'react';
import { Navbar } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Мем Довідник</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/table" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/table' || pathname === '/' 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Таблиця
              </Link>
              <Link 
                href="/list" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/list' 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Список
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Navbar.Button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg 
                  className="block h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg 
                  className="block h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Navbar.Button>
          </div>
        </div>
      </div>

      <Navbar.Panel 
        show={isOpen}
        className="sm:hidden"
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/table"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              pathname === '/table' || pathname === '/'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Таблиця
          </Link>
          <Link
            href="/list"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              pathname === '/list'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Список
          </Link>
        </div>
      </Navbar.Panel>
    </Navbar>
  );
}
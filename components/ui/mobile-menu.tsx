'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
    isLoggedIn: boolean;
}

export function MobileMenu({ isLoggedIn }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden">
            <button
                onClick={toggleMenu}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-50 relative"
                aria-label="Menu"
            >
                <span className="material-symbols-outlined text-2xl">
                    {isOpen ? 'close' : 'menu'}
                </span>
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Menu Content */}
            <div className={`
                fixed top-[65px] left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-40 transition-all duration-300 ease-in-out transform origin-top
                ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
            `}>
                <nav className="flex flex-col p-4 gap-2">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className={`p-4 rounded-xl font-bold flex items-center gap-3 transition-colors ${pathname === '/' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span className="material-symbols-outlined">storefront</span>
                        Catálogo
                    </Link>

                    {isLoggedIn ? (
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className={`p-4 rounded-xl font-bold flex items-center gap-3 transition-colors ${pathname === '/profile' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <span className="material-symbols-outlined">person</span>
                            Mi Perfil
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className={`p-4 rounded-xl font-bold flex items-center gap-3 transition-colors ${pathname === '/login' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <span className="material-symbols-outlined">login</span>
                            Ingresar
                        </Link>
                    )}
                </nav>
            </div>
        </div>
    );
}

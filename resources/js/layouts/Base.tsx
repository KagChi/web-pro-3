import { PropsWithChildren, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Cart } from "../components/Cart";

export function BaseLayout({ children }: PropsWithChildren) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <main>
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

            {/* Navbar */}
            <nav className="bg-white shadow px-6 py-2">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <a className="flex items-center" href="#">
                        <img className="rounded-full h-10 w-10 object-cover" src="./assets/Logo.png" alt="Logo" />
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        <a className="text-pink-600 font-semibold" href="#">Home</a>
                        <a className="text-gray-700 hover:text-pink-600 transition" href="#product">Services</a>
                        <a className="text-gray-700 hover:text-pink-600 transition" href="#contact">Contact</a>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Cart />
                    </div>

                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
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

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a
                                className="block px-3 py-2 text-pink-600 font-semibold"
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </a>
                            <a
                                className="block px-3 py-2 text-gray-700 hover:text-pink-600 transition"
                                href="#product"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Services
                            </a>
                            <a
                                className="block px-3 py-2 text-gray-700 hover:text-pink-600 transition"
                                href="#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </a>
                        </div>
                        <div className="px-4 py-2">
                            <Cart />
                        </div>
                    </div>
                )}
            </nav>

            {children}
        </main>
    );
}

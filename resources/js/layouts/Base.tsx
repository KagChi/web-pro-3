import { PropsWithChildren, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Cart } from "../components/Cart";

export function BaseLayout({ children }: PropsWithChildren) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState("home");

    useEffect(() => {
        AOS.init();
        // Set active page based on current URL
        const pathname = window.location.pathname;
        if (pathname === "/") {
            setActivePage("home");
        } else if (pathname === "/products") {
            setActivePage("products");
        }
    }, []);

    return (
        <main>
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

            {/* Navbar */}
            <nav className="bg-white shadow px-6 py-2">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <a className="flex items-center" href="/">
                        <img className="rounded-full h-10 w-10 object-cover" src="./assets/Logo.png" alt="Logo" />
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        <a 
                            className={`font-semibold transition ${
                                activePage === "home" 
                                    ? "text-pink-600" 
                                    : "text-gray-700 hover:text-pink-600"
                            }`} 
                            href="/"
                        >
                            Home
                        </a>
                        <a 
                            className={`font-semibold transition ${
                                activePage === "products" 
                                    ? "text-pink-600" 
                                    : "text-gray-700 hover:text-pink-600"
                            }`} 
                            href="/products"
                        >
                            Products
                        </a>
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
                                className={`block px-3 py-2 font-semibold transition ${
                                    activePage === "home" 
                                        ? "text-pink-600" 
                                        : "text-gray-700 hover:text-pink-600"
                                }`}
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </a>
                            <a
                                className={`block px-3 py-2 font-semibold transition ${
                                    activePage === "products" 
                                        ? "text-pink-600" 
                                        : "text-gray-700 hover:text-pink-600"
                                }`}
                                href="/products"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Products
                            </a>
                        </div>
                        <div className="px-4 py-2">
                            <Cart />
                        </div>
                    </div>
                )}
            </nav>

            {children}

            
            <footer className="bg-gradient-to-r from-pink-600 to-violet-500 text-white py-10">
                <div className="max-w-7xl mx-auto px-4" data-aos="fade-right">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Company Info */}
                        <div>
                            <h5 className="text-xl font-bold mb-3">Matery</h5>
                            <p className="text-white/75">Toko material terlengkap untuk kebutuhan konstruksi Anda.</p>
                            <div className="flex gap-3 mt-4">
                                <a href="#" className="hover:opacity-80">
                                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" className="hover:opacity-80">
                                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h6 className="text-lg font-semibold mb-3">Tautan Cepat</h6>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-white/80 hover:underline">Tentang Kami</a></li>
                                <li><a href="#" className="text-white/80 hover:underline">Layanan</a></li>
                                <li><a href="#" className="text-white/80 hover:underline">Portofolio</a></li>
                                <li><a href="#" className="text-white/80 hover:underline">Kontak</a></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h6 className="text-lg font-semibold mb-3">Sumber Daya</h6>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-white/80 hover:underline">Blog</a></li>
                                <li><a href="#" className="text-white/80 hover:underline">Dokumentasi</a></li>
                                <li><a href="#" className="text-white/80 hover:underline">Dukungan</a></li>
                                <li><a href="#" className="text-white/80 hover:underline">Kebijakan Privasi</a></li>
                            </ul>
                        </div>
                    </div>

                    <hr className="my-8 border-white/25" />

                    <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/75 space-y-4 md:space-y-0">
                        <div>© 2024 Materalis. All rights reserved.</div>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:underline">Terms of Service</a>
                            <a href="#" className="hover:underline">Privacy Policy</a>
                            <a href="#" className="hover:underline">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}

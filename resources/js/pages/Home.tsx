import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Gauge, Headset, Shield, ShoppingCart } from 'lucide-react';

interface Product {
    id: number;
    title: string;
    desc: string;
    price: number;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    products: Product[]
}

export default function Home({ products }: Props) {
    useEffect(() => {
        const map = L.map('map').setView([-7.2575, 112.7521], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([-7.2575, 112.7521]).addTo(map)
            .bindPopup('Our Store Location')
            .openPopup();

        return () => {
            map.remove();
        };
    }, []);

    return (
        <>
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
                    <form className="flex items-center space-x-2">
                        <input className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500" type="search" placeholder="Search" aria-label="Search" />
                        <button className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 transition" type="submit">Search</button>
                    </form>
                    <button className="md:hidden ml-4">
                        <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
                        <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
                        <span className="block w-6 h-0.5 bg-gray-700"></span>
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Kebutuhan Material Bangunan Anda, Kami yang Penuhi</h1>
                        <p className="text-lg text-white/90 mb-6">Dari semen hingga pipa, dari cat hingga pasir, semua tersedia dengan harga terbaik dan pengiriman cepat!</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                            >
                                <i className="bi bi-whatsapp mr-2"></i>Hubungi Kami
                            </a>
                            <a
                                href="#product"
                                className="inline-flex items-center justify-center border-2 border-white text-white font-semibold px-6 py-3 rounded-lg transition hover:bg-white hover:text-pink-600"
                            >
                                Lihat Produk
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                        <img src="assets/Hero.jpg" alt="Toko Material" className="rounded-lg shadow-lg w-full max-w-md ml-auto" />
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 bg-gray-50" id="product">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Mengapa Pilih Kami?</h2>
                        <p className="text-gray-500">Solusi material bangunan terpercaya dengan layanan terbaik untuk Anda</p>
                    </div>
                    <div className="mb-12">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination]}
                            className="py-4"
                        >
                            {products.map((product, idx) => (
                                <SwiperSlide className="flex justify-center" key={idx}>
                                    <div className="w-80 bg-white rounded-xl overflow-hidden flex flex-col">
                                        <div
                                            className="h-48 bg-cover bg-center"
                                            style={{ backgroundImage: `url(/storage/${product.image})` }}
                                        />
                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                                            <p className="text-gray-600 mb-4 flex-1">{product.desc}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-500 font-medium">Price: {product.price}</span>
                                                <a
                                                    href="#"
                                                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition text-sm font-semibold flex gap-4 items-center"
                                                >
                                                    Tambah {" "} <ShoppingCart />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white text-center p-8 border rounded-lg shadow h-full flex flex-col items-center">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
                                <Gauge className="text-3xl text-pink-600" />
                            </div>
                            <h5 className="text-lg font-semibold mb-2">Performa Tinggi</h5>
                            <p className="text-gray-500">Website dan aplikasi kami bekerja cepat dan efisien, tanpa kompromi.</p>
                        </div>
                        <div className="bg-white text-center p-8 border rounded-lg shadow h-full flex flex-col items-center">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
                                <Shield className="text-3xl text-pink-600" />
                            </div>
                            <h5 className="text-lg font-semibold mb-2">Keamanan Terjamin</h5>
                            <p className="text-gray-500">Keamanan data Anda adalah prioritas utama dengan sistem berlapis.</p>
                        </div>
                        <div className="bg-white text-center p-8 border rounded-lg shadow h-full flex flex-col items-center">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
                                <Headset className="text-3xl text-pink-600" />
                            </div>
                            <h5 className="text-lg font-semibold mb-2">Dukungan 24/7</h5>
                            <p className="text-gray-500">Tim support kami siap membantu kapan pun Anda butuhkan.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <div id="contact" className="max-w-7xl mx-auto px-4 my-16">
                <h1 className="text-3xl font-bold text-center mb-8" id="kontak">Hubungi Kami</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <div className="w-full h-full rounded-lg overflow-hidden shadow" id="map"></div>
                    </div>
                    <div className="md:w-1/2">
                        <form className="bg-white p-8 rounded-lg shadow space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nama</label>
                                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" id="name" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                                <input type="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" id="email" required />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Pesan</label>
                                <textarea className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" id="message" rows={5} required></textarea>
                            </div>
                            <button type="submit" className="w-full bg-pink-600 text-white font-semibold py-3 rounded hover:bg-pink-700 transition">Kirim</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-pink-600 to-violet-500 text-white py-10">
                <div className="max-w-7xl mx-auto px-4">
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

                        {/* Newsletter */}
                        <div>
                            <h6 className="text-lg font-semibold mb-3">Berlangganan Newsletter</h6>
                            <p className="text-white/75">Dapatkan berita dan update terbaru dari kami.</p>
                            <div className="flex mt-4">
                                <input
                                    type="email"
                                    placeholder="Masukkan email Anda"
                                    className="w-full px-4 py-2 rounded-l-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
                                />
                                <button className="bg-white text-gray-900 px-4 py-2 rounded-r-md hover:bg-gray-200">
                                    Berlangganan
                                </button>
                            </div>
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
        </>
    );
}

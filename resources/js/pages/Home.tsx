import { Gauge, Headset, Shield, ShoppingCart, X, Phone, Mail, MapPin } from 'lucide-react';
import { BaseLayout } from '@/layouts';
import { Product } from '@/types';
import { useState } from 'react';

interface Props {
    products: Product[]
}

export default function Home({ products }: Props) {
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsContactOpen(true);
    };

    const closeContact = () => {
        setIsContactOpen(false);
    };

    return (
        <BaseLayout>
            {/* Contact Popup */}
            {isContactOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={closeContact}
                >
                    <div
                        className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-in slide-in-from-bottom-4 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeContact}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Hubungi Kami</h3>
                            <p className="text-gray-600">Kami siap membantu kebutuhan material bangunan Anda</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <Phone className="w-5 h-5 text-pink-600 mr-3" />
                                <div>
                                    <p className="font-semibold text-gray-900">Telepon</p>
                                    <p className="text-gray-600">+62 812-3456-7890</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <Mail className="w-5 h-5 text-pink-600 mr-3" />
                                <div>
                                    <p className="font-semibold text-gray-900">Email</p>
                                    <p className="text-gray-600">info@tokomaterial.com</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <MapPin className="w-5 h-5 text-pink-600 mr-3" />
                                <div>
                                    <p className="font-semibold text-gray-900">Alamat</p>
                                    <p className="text-gray-600">Jl. Material No. 123, Jakarta</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                Chat WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <header className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500 py-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/10">
                    <div className="absolute inset-0 opacity-30"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8" data-aos="fade-right">
                            <div className="space-y-4">
                                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    Toko Material Terpercaya
                                </div>
                                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                                    Kebutuhan Material Bangunan Anda,
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300"> Kami yang Penuhi</span>
                                </h1>
                                <p className="text-xl text-white/90 leading-relaxed">
                                    Dari semen hingga pipa, dari cat hingga pasir, semua tersedia dengan harga terbaik dan pengiriman cepat!
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleContactClick}
                                    className="group inline-flex items-center justify-center bg-white text-pink-600 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                    Hubungi Kami
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                <a
                                    href="/products"
                                    className="group inline-flex items-center justify-center border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Lihat Produk
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="relative" data-aos="fade-left">
                            <div className="relative z-10">
                                <img
                                    src="assets/Hero.jpg"
                                    alt="Toko Material"
                                    className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                                />
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400/20 rounded-full blur-xl"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 bg-gray-50" id="product" data-aos="fade-up">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Mengapa Pilih Kami?</h2>
                        <p className="text-gray-500">Solusi material bangunan terpercaya dengan layanan terbaik untuk Anda</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                        {products.map((product, idx) => (
                            <div
                                key={product.id}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
                                data-aos="fade-up"
                            >
                                <div className="relative overflow-hidden">
                                    <div
                                        className="h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(/storage/${product.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-3">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
                                            {product.desc}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex items-end justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 uppercase tracking-wide">Harga</span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                                </span>
                                            </div>
                                            <button
                                                className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 h-12 rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all duration-300 text-sm font-semibold flex gap-2 items-center shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[110px]"
                                                style={{ minHeight: "48px" }}
                                            >
                                                <ShoppingCart size={16} />
                                                Tambah
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-16">
                        <a
                            href="/products"
                            className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <span>Lihat Semua Produk</span>
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" data-aos="fade-up">
                        <div className="group relative bg-white/80 backdrop-blur-sm text-center p-8 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col items-center">
                            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Gauge className="text-4xl text-pink-600" />
                            </div>
                            <h5 className="text-xl font-bold mb-3 text-gray-900">Performa Tinggi</h5>
                            <p className="text-gray-600 leading-relaxed">Website dan aplikasi kami bekerja cepat dan efisien, tanpa kompromi.</p>
                        </div>
                        
                        <div className="group relative bg-white/80 backdrop-blur-sm text-center p-8 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col items-center">
                            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Shield className="text-4xl text-pink-600" />
                            </div>
                            <h5 className="text-xl font-bold mb-3 text-gray-900">Keamanan Terjamin</h5>
                            <p className="text-gray-600 leading-relaxed">Keamanan data Anda adalah prioritas utama dengan sistem berlapis.</p>
                        </div>
                        
                        <div className="group relative bg-white/80 backdrop-blur-sm text-center p-8 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col items-center">
                            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Headset className="text-4xl text-pink-600" />
                            </div>
                            <h5 className="text-xl font-bold mb-3 text-gray-900">Dukungan 24/7</h5>
                            <p className="text-gray-600 leading-relaxed">Tim support kami siap membantu kapan pun Anda butuhkan.</p>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}

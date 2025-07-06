import { Shield, X, Phone, Mail, MapPin, Users, ArrowRight, CheckCircle, DollarSign, Droplets, Package, TreePine, Truck, Wrench } from 'lucide-react';
import { BaseLayout } from '@/layouts';
import { Product as ProductType } from '@/types';
import { useState } from 'react';
import Product from '@/components/Product';

interface Props {
    products: ProductType[]
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
                        {products.map((product) => <Product product={product} />)}
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
                </div>
            </section>

            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
                            Material Berkualitas
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Kami menyediakan berbagai material berkualitas tinggi untuk memenuhi kebutuhan proyek Anda
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" data-aos="fade-up">
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Package className="text-2xl text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Material Bangunan</h3>
                            <p className="text-gray-600 text-sm">Semen, bata, pasir, dan material konstruksi lainnya</p>
                        </div>

                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <TreePine className="text-2xl text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Kayu & Plywood</h3>
                            <p className="text-gray-600 text-sm">Kayu jati, meranti, plywood, dan produk kayu lainnya</p>
                        </div>

                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Droplets className="text-2xl text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Cat & Finishing</h3>
                            <p className="text-gray-600 text-sm">Cat tembok, cat kayu, vernis, dan bahan finishing</p>
                        </div>

                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Wrench className="text-2xl text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Peralatan</h3>
                            <p className="text-gray-600 text-sm">Alat pertukangan, mesin, dan peralatan konstruksi</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500 to-violet-500 rounded-3xl p-8 md:p-12 text-white" data-aos="fade-up">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold mb-4">Butuh Material Spesifik?</h3>
                                <p className="text-pink-100">Kami siap membantu Anda menemukan material yang tepat</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">500+</div>
                                <div className="text-pink-100">Jenis Material</div>
                            </div>
                            <div className="text-center">
                                <a
                                    href="/products"
                                    className="inline-flex items-center bg-white text-pink-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                                >
                                    Lihat Katalog
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
                            Mengapa Memilih Kami?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Kami berkomitmen memberikan layanan terbaik dengan kualitas material yang terjamin dan harga yang kompetitif
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
                        <div className="bg-gradient-to-br from-pink-50 to-violet-50 rounded-2xl p-8 border border-pink-100">
                            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
                                <CheckCircle className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Kualitas Terjamin</h3>
                            <p className="text-gray-600">Semua material kami telah melalui quality control ketat untuk memastikan kualitas terbaik</p>
                        </div>

                        <div className="bg-gradient-to-br from-pink-50 to-violet-50 rounded-2xl p-8 border border-pink-100">
                            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
                                <Truck className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Pengiriman Cepat</h3>
                            <p className="text-gray-600">Layanan pengiriman cepat ke seluruh Indonesia dengan tracking real-time</p>
                        </div>

                        <div className="bg-gradient-to-br from-pink-50 to-violet-50 rounded-2xl p-8 border border-pink-100">
                            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
                                <DollarSign className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Harga Terbaik</h3>
                            <p className="text-gray-600">Kami menawarkan harga kompetitif dengan diskon khusus untuk pembelian grosir</p>
                        </div>

                        <div className="bg-gradient-to-br from-pink-50 to-violet-50 rounded-2xl p-8 border border-pink-100">
                            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
                                <Users className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Konsultasi Gratis</h3>
                            <p className="text-gray-600">Tim ahli kami siap memberikan saran dan rekomendasi material yang tepat</p>
                        </div>

                        <div className="bg-gradient-to-br from-pink-50 to-violet-50 rounded-2xl p-8 border border-pink-100">
                            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
                                <Shield className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Garansi Material</h3>
                            <p className="text-gray-600">Garansi pengembalian dan penggantian untuk material yang bermasalah</p>
                        </div>

                        <div className="bg-gradient-to-br from-pink-50 to-violet-50 rounded-2xl p-8 border border-pink-100">
                            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
                                <Phone className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Layanan Pelanggan 24/7</h3>
                            <p className="text-gray-600">Tim customer service kami siap membantu Anda kapan saja, 24 jam sehari</p>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}

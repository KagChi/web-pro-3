import React from 'react';
import { Head } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { BaseLayout } from '@/layouts';
import { Product } from '@/types';

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ products }: Props) {
    return (
        <BaseLayout>
            <Head title="Products" />
            
            {/* Hero Section */}
            <header className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 overflow-hidden">
                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000" />
                
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8" data-aos="fade-up">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-white/90 text-sm font-medium">Material Bangunan Terlengkap</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
                        <span className="bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                            Katalog Produk
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Material Bangunan
                        </span>
                    </h1>
                    
                    <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                        Temukan berbagai kebutuhan material bangunan berkualitas dengan harga terbaik dan layanan pengiriman yang cepat
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="300">
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white/90 text-sm">Gratis Ongkir</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white/90 text-sm">Garansi 100%</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white/90 text-sm">24/7 Support</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                        {products.data.map((product) => (
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

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="flex justify-center mt-12">
                            <nav className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100">
                                {products.current_page > 1 && (
                                    <a
                                        href={`/products?page=${products.current_page - 1}`}
                                        className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 bg-white rounded-xl hover:bg-gray-50 hover:text-pink-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Sebelumnya
                                    </a>
                                )}
                                
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                                        <a
                                            key={page}
                                            href={`/products?page=${page}`}
                                            className={`flex items-center justify-center w-10 h-10 text-sm font-semibold rounded-xl transition-all duration-300 ${
                                                page === products.current_page
                                                    ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg shadow-pink-500/25'
                                                    : 'text-gray-600 bg-white hover:bg-gray-50 hover:text-pink-600 shadow-sm hover:shadow-md'
                                            }`}
                                        >
                                            {page}
                                        </a>
                                    ))}
                                </div>
                                
                                {products.current_page < products.last_page && (
                                    <a
                                        href={`/products?page=${products.current_page + 1}`}
                                        className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 bg-white rounded-xl hover:bg-gray-50 hover:text-pink-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        Selanjutnya
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
            </section>
        </BaseLayout>
    );
}

import React from 'react';
import { Head } from '@inertiajs/react';
import { BaseLayout } from '@/layouts';
import { Product as ProductType } from '@/types';
import Product from '@/components/Product';

interface Props {
    products: {
        data: ProductType[];
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
                        {products.data.map((product) => <Product product={product} />)}
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

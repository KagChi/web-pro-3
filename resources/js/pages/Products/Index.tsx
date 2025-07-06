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
            <header className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
                        Katalog Produk Material Bangunan
                    </h1>
                    <p className="text-lg text-white/90 mb-6" data-aos="fade-up" data-aos-delay="100">
                        Temukan berbagai kebutuhan material bangunan berkualitas dengan harga terbaik
                    </p>
                </div>
            </header>

            {/* Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Semua Produk Kami</h2>
                        <p className="text-gray-500">Pilih material bangunan yang sesuai dengan kebutuhan Anda</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                        {products.data.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl overflow-hidden flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
                                <div
                                    className="h-48 bg-cover bg-center"
                                    style={{ backgroundImage: `url(/storage/${product.image})` }}
                                />
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                                    <p className="text-gray-600 mb-4 flex-1">{product.desc}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium">
                                            Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                        </span>
                                        <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition text-sm font-semibold flex gap-2 items-center">
                                            Tambah <ShoppingCart size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="flex justify-center">
                            <nav className="flex items-center space-x-2">
                                {products.current_page > 1 && (
                                    <a
                                        href={`/products?page=${products.current_page - 1}`}
                                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Sebelumnya
                                    </a>
                                )}
                                
                                {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                                    <a
                                        key={page}
                                        href={`/products?page=${page}`}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                                            page === products.current_page
                                                ? 'bg-pink-600 text-white'
                                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </a>
                                ))}
                                
                                {products.current_page < products.last_page && (
                                    <a
                                        href={`/products?page=${products.current_page + 1}`}
                                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Selanjutnya
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

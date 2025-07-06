import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product as ProductType } from '@/types';
import toast from 'react-hot-toast';
import { useFingerprint } from '@/hooks/fp';

interface ProductProps {
    product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
    const { getFingerprint } = useFingerprint();

    const handleAddToCart = async () => {
        const promise = new Promise(async (resolve, reject) => {
            try {
                const fingerprint = await getFingerprint();

                const response = await fetch('/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        fingerprint: fingerprint,
                        product_id: product.id,
                        quantity: 1,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add to cart');
                }

                resolve('Produk berhasil ditambahkan ke keranjang!');
            } catch (error) {
                console.error('Error adding to cart:', error);
                reject('Gagal menambahkan produk ke keranjang');
            }
        });

        toast.promise(promise, {
            loading: 'Menambahkan ke keranjang...',
            success: (message) => message as string,
            error: (message) => message as string,
        });
    };

    return (
        <div
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
                            onClick={handleAddToCart}
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
    );
};

export default Product;

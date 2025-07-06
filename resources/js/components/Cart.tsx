import { useFingerprint } from "@/hooks/fp";
import { Product } from "@/types";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

interface Cart {
    id: number;
    fingerprint: string;
    items: CartItem[];
}

export function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, [isOpen]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const { getFingerprint } = useFingerprint();
            const fingerprint = await getFingerprint();
            const response = await fetch('/api/cart?fingerprint=' + fingerprint);
            if (response.ok) {
                const data = await response.json();
                setCart(data || null);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (productId: number) => {
        try {
            const { getFingerprint } = useFingerprint();
            const fingerprint = await getFingerprint();
            const response = await fetch(`/api/cart/${cart!.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fingerprint,
                    product_id: productId,
                    quantity: 0
                })
            });
            
            if (response.ok) {
                await fetchCart();
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
        try {
            const { getFingerprint } = useFingerprint();
            const fingerprint = await getFingerprint();
            const response = await fetch(`/api/cart/${cart!.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fingerprint,
                    product_id: productId,
                    quantity: newQuantity
                })
            });
            
            if (response.ok) {
                await fetchCart();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const cartItems = cart?.items || [];
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="relative">
            {/* Tombol Keranjang */}
            <div 
                className="group relative flex items-center space-x-2 cursor-pointer gap-2 p-2 rounded-xl hover:bg-pink-50 transition-all duration-300"
                onClick={() => setIsOpen(true)}
            >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {new Intl.NumberFormat('id-ID').format(totalItems)}
                        </span>
                    )}
                </div>
                <span className="text-gray-700 font-semibold text-base block">
                    Keranjang
                </span>
            </div>

            {/* Panel Keranjang yang dirender via Portal */}
            {isOpen && createPortal(
                <>
                    {/* Overlay Latar Belakang */}
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-300" 
                        onClick={() => setIsOpen(false)} 
                    />

                    {/* Panel Keranjang */}
                    <div className="fixed top-0 right-0 z-50 w-full md:w-[420px] h-screen bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 rounded-none md:rounded-l-3xl overflow-hidden animate-in slide-in-from-right duration-300">
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-violet-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
                                            Keranjang Belanja
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">{new Intl.NumberFormat('id-ID').format(totalItems)} item</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="p-3 rounded-xl hover:bg-white/80 transition-all duration-200 group"
                                    >
                                        <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                                    </button>
                                </div>
                            </div>

                            {/* Konten Keranjang */}
                            {loading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                                        <p className="text-gray-500 mt-2">Loading...</p>
                                    </div>
                                </div>
                            ) : cartItems.length > 0 ? (
                                <>
                                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="group relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative">
                                                        <img 
                                                            src={item.product.image} 
                                                            alt={item.product.title}
                                                            className="w-20 h-20 rounded-xl object-cover shadow-md"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-gray-900 text-sm truncate">{item.product.title}</h3>
                                                        <p className="text-sm text-pink-600 font-bold mt-1">
                                                            Rp {new Intl.NumberFormat('id-ID').format(item.product.price)}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end space-y-2">
                                                        <button 
                                                            onClick={() => handleRemoveItem(item.product.id)}
                                                            className="p-1 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                                                            <button 
                                                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                                className="w-6 h-6 rounded-md hover:bg-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <Minus className="w-3 h-3 text-gray-600" />
                                                            </button>
                                                            <span className="text-sm font-medium text-gray-900 min-w-[20px] text-center">
                                                                {new Intl.NumberFormat('id-ID').format(item.quantity)}
                                                            </span>
                                                            <button 
                                                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                                                                className="w-6 h-6 rounded-md hover:bg-white transition-colors flex items-center justify-center"
                                                            >
                                                                <Plus className="w-3 h-3 text-gray-600" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-gray-500">Subtotal</span>
                                                        <span className="text-sm font-bold text-gray-900">
                                                            Rp {new Intl.NumberFormat('id-ID').format(item.product.price * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-pink-50 to-violet-50">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-gray-800">Total</span>
                                                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
                                                    Rp {new Intl.NumberFormat('id-ID').format(totalPrice)}
                                                </span>
                                            </div>
                                            <button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-4 px-6 rounded-2xl font-semibold hover:from-pink-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
                                                Lanjutkan ke Pembayaran
                                            </button>
                                            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                                                <div className="flex items-center space-x-1">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                    <span>Pembayaran Aman</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                    <span>Gratis Ongkir</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center py-16 px-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-violet-100 rounded-full flex items-center justify-center mb-6">
                                        <ShoppingCart className="w-12 h-12 text-pink-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Keranjang Anda kosong</h3>
                                    <p className="text-gray-500 mb-6">Tambahkan beberapa produk menarik untuk memulai</p>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-violet-600 transition-all duration-300"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>,
                document.body // Portal target
            )}
        </div>
    );
}
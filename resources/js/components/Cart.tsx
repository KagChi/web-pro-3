import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Cart() {
    const [isOpen, setIsOpen] = useState(false);

    const cartItems = [
        {
            id: 1,
            name: "Cat Premium",
            price: 150000,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=100&h=100&fit=crop"
        },
        {
            id: 2,
            name: "Kit Cat",
            price: 299000,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=100&h=100&fit=crop"
        }
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
                            {totalItems}
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
                                        <p className="text-sm text-gray-500 mt-1">{totalItems} item</p>
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
                            {cartItems.length > 0 ? (
                                <>
                                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="group relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            className="w-20 h-20 rounded-xl object-cover shadow-md"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h3>
                                                        <p className="text-sm text-pink-600 font-bold mt-1">
                                                            Rp {item.price.toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end space-y-2">
                                                        <button className="p-1 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                                                            <button className="w-6 h-6 rounded-md hover:bg-white transition-colors flex items-center justify-center">
                                                                <Minus className="w-3 h-3 text-gray-600" />
                                                            </button>
                                                            <span className="text-sm font-medium text-gray-900 min-w-[20px] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button className="w-6 h-6 rounded-md hover:bg-white transition-colors flex items-center justify-center">
                                                                <Plus className="w-3 h-3 text-gray-600" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-gray-500">Subtotal</span>
                                                        <span className="text-sm font-bold text-gray-900">
                                                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
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
                                                    Rp {totalPrice.toLocaleString('id-ID')}
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
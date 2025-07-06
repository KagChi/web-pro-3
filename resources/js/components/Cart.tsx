import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";

export function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    
    // Contoh item keranjang
    const cartItems = [
        {
            id: 1,
            name: "Semen Portland",
            price: 85000,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=100&h=100&fit=crop"
        },
        {
            id: 2,
            name: "Pipa PVC 4 inch",
            price: 125000,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=100&h=100&fit=crop"
        }
    ];

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="relative">
            <div 
                className="flex items-center space-x-2 cursor-pointer gap-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-pink-100">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
                </div>
                <span className="text-gray-700 font-bold text-sm md:text-base inline">{totalItems} Item</span>
            </div>

            {isOpen && (
                <>
                    {/* Overlay mobile */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Dropdown keranjang - posisi dan ukuran responsif */}
                    <div className="fixed md:absolute top-0 md:top-full right-0 md:right-0 mt-0 md:mt-2 bg-white rounded-none md:rounded-xl shadow-2xl border border-gray-100 w-full h-full md:w-96 md:h-auto z-50 backdrop-blur-sm md:backdrop-blur-none">
                        <div className="p-4 md:p-6 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Keranjang Belanja</h2>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                            
                            {cartItems.length > 0 ? (
                                <>
                                    <div className="space-y-4 mb-6 flex-1 overflow-y-auto">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-3 md:space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl object-cover shadow-sm flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 truncate text-sm md:text-base">{item.name}</h3>
                                                    <p className="text-xs md:text-sm text-gray-500 mt-1">Jumlah: {item.quantity}</p>
                                                    <p className="text-xs md:text-sm text-pink-600 font-medium mt-1">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-xs md:text-sm text-gray-400">Rp {item.price.toLocaleString('id-ID')} per item</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 mt-auto">
                                        <div className="flex justify-between items-center mb-4 md:mb-6">
                                            <span className="text-base md:text-lg font-bold text-gray-800">Total:</span>
                                            <span className="text-lg md:text-xl font-bold text-pink-500">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                        </div>
                                        <button className="w-full bg-pink-500 text-white py-3 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold hover:bg-pink-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-sm md:text-base">
                                            Lanjutkan ke Pembayaran
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8 md:py-12 flex-1 flex flex-col justify-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                        <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 text-base md:text-lg font-medium">Keranjang belanja kosong</p>
                                    <p className="text-gray-400 text-xs md:text-sm mt-1">Tambahkan beberapa item untuk memulai</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
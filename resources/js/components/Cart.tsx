import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Cart() {
    const [isOpen, setIsOpen] = useState(false);

    const cartItems = [
        {
            id: 1,
            name: "Premium Nail Polish",
            price: 15.99,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=100&h=100&fit=crop"
        },
        {
            id: 2,
            name: "Nail Art Kit",
            price: 29.99,
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
            {/* Cart Button */}
            <div 
                className="flex items-center space-x-2 cursor-pointer gap-2"
                onClick={() => setIsOpen(true)}
            >
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-pink-100">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
                </div>
                <span className="text-gray-700 font-bold text-sm md:text-base hidden sm:block">
                    {totalItems} Items
                </span>
            </div>

            {/* Cart Panel rendered via Portal */}
            {isOpen && createPortal(
                <>
                    {/* Background Overlay */}
                    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />

                    {/* Cart Panel */}
                    <div className="fixed top-0 right-0 z-50 w-full md:w-96 h-screen bg-white shadow-2xl border-l border-gray-200 rounded-none md:rounded-l-xl overflow-y-auto">
                        <div className="p-6 flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            {/* Cart Content */}
                            {cartItems.length > 0 ? (
                                <>
                                    <div className="flex-1 overflow-y-auto space-y-4">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex items-center space-x-4">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-xl object-cover shadow-sm"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                    <p className="text-sm text-pink-600 font-medium">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-base font-bold text-gray-800">Total:</span>
                                            <span className="text-lg font-bold text-pink-500">${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <button className="w-full bg-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-pink-600 transition-all duration-200 shadow-lg">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                                    <ShoppingCart className="w-10 h-10 text-gray-400 mb-4" />
                                    <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                                    <p className="text-gray-400 text-sm mt-1">Add some items to get started</p>
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
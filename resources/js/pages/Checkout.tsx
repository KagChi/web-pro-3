import { Cart } from '@/types';
import { useEffect, useState } from 'react';
import { useFingerprint } from '@/hooks/fp';
import { CheckoutLayout } from '@/layouts/Checkout';
import { ShoppingCart, ArrowLeft, CreditCard, Shield, Truck, Plus, Minus, Trash2 } from 'lucide-react';

export default function Checkout() {
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState<Cart | null>(null);
    const { getFingerprint } = useFingerprint();

    const fetchCart = async () => {
        try {
            setLoading(true);
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

    const updateQuantity = async (productId: number, newQuantity: number) => {
        try {
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

    const removeItem = async (productId: number) => {
        try {
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

    useEffect(() => {
        fetchCart();
    }, []);

    const subtotal = cart?.items.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0) || 0;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <CheckoutLayout>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-32 w-32 border-4 border-pink-200 border-t-pink-600"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShoppingCart className="w-8 h-8 text-pink-600 animate-pulse" />
                            </div>
                        </div>
                    </div>
                ) : cart && cart.items.length > 0 ? (
                    <div className="container mx-auto px-4 py-8">
                        {/* Header */}
                        <div className="mb-8">
                            <a href="/" className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors mb-4">
                                <ArrowLeft className="w-5 h-5" />
                                <span className="font-medium">Kembali ke Toko</span>
                            </a>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
                                Checkout
                            </h1>
                            <p className="text-gray-600 mt-2">Lengkapi pesanan Anda dengan aman</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Order Summary */}
                            <div className="lg:col-span-2">
                                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                                        <ShoppingCart className="w-6 h-6 text-pink-600" />
                                        <span>Ringkasan Pesanan</span>
                                    </h2>
                                    <div className="space-y-6">
                                        {cart.items.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-pink-50 to-violet-50 rounded-2xl border border-pink-100/50">
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative">
                                                        <img 
                                                            src={item.product.image} 
                                                            alt={item.product.title}
                                                            className="w-20 h-20 object-cover rounded-xl shadow-lg"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 text-lg">{item.product.title}</h3>
                                                        <p className="text-gray-600">Rp {new Intl.NumberFormat('id-ID').format(item.product.price)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center space-x-2 bg-white rounded-xl p-2 shadow-sm">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-100 hover:bg-violet-200 text-violet-600 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    
                                                    {/* Item Total */}
                                                    <div className="text-right min-w-[120px]">
                                                        <p className="font-bold text-lg text-gray-800">
                                                            Rp {new Intl.NumberFormat('id-ID').format(item.product.price * item.quantity)}
                                                        </p>
                                                    </div>
                                                    
                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => removeItem(item.product.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                                        title="Hapus item"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Order Total */}
                            <div className="lg:col-span-1">
                                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 sticky top-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                                        <CreditCard className="w-6 h-6 text-violet-600" />
                                        <span>Total Pembayaran</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-semibold text-gray-800">Rp {new Intl.NumberFormat('id-ID').format(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <span className="text-gray-600">Pajak (10%):</span>
                                            <span className="font-semibold text-gray-800">Rp {new Intl.NumberFormat('id-ID').format(tax)}</span>
                                        </div>
                                        <div className="pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold text-gray-800">Total:</span>
                                                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
                                                    Rp {new Intl.NumberFormat('id-ID').format(total)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-4 px-6 rounded-2xl font-semibold hover:from-pink-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] mt-8 flex items-center justify-center space-x-2">
                                        <Shield className="w-5 h-5" />
                                        <span>Lanjutkan ke Pembayaran</span>
                                    </button>
                                    
                                    {/* Trust Indicators */}
                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            <span>Pembayaran 100% Aman</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                                            <Truck className="w-4 h-4 text-blue-500" />
                                            <span>Gratis Ongkir</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                                            <Shield className="w-4 h-4 text-green-500" />
                                            <span>Garansi 30 Hari</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center max-w-md mx-auto">
                            <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <ShoppingCart className="w-16 h-16 text-pink-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Keranjang Anda Kosong</h2>
                            <p className="text-gray-600 mb-8 text-lg">Tambahkan beberapa produk menarik untuk melanjutkan checkout</p>
                            <a href="/" className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white py-4 px-8 rounded-2xl font-semibold hover:from-pink-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Lanjutkan Belanja</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </CheckoutLayout>
    );
}

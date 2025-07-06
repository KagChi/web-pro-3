import { CheckoutLayout } from '@/layouts/Checkout';
import { Order } from '@/types';
import { Head } from '@inertiajs/react';

export default function Info({ order }: { order: Order }) {
    console.log(order);

    return (
        <CheckoutLayout>
            <Head title="Informasi Pesanan" />

            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="p-4 border-b border-white/10">
                        <a
                            href="/checkout/history"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-sm font-semibold rounded-lg hover:from-pink-600 hover:to-violet-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Kembali ke Riwayat
                        </a>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Header */}
                        <div className="relative p-8 border-b border-white/10 bg-gradient-to-br from-gray-50/50 via-white/30 to-gray-50/50">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-violet-500/5 rounded-t-3xl"></div>
                            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                <div className="mb-6 lg:mb-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                                Informasi Pesanan
                                            </h1>
                                            <p className="text-lg text-gray-600 flex items-center gap-2 mt-1">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                Pesanan #{order.id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="inline-flex capitalize items-center px-6 py-3 rounded-2xl text-base font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {order.status.replace(/_/g, ' ')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Client Information */}
                        <div className="p-8 border-b border-white/10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Personal Information */}
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Informasi Pribadi
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Nama Lengkap</p>
                                                <p className="font-semibold text-gray-900">{order.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-semibold text-gray-900">{order.email}</p>
                                            </div>
                                        </div>
                                        {order.phone && (
                                            <div className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Nomor Telepon</p>
                                                    <p className="font-semibold text-gray-900">{order.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Alamat Pengiriman
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="relative flex items-start p-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-500 mb-2">Alamat Lengkap</p>
                                                    <p className="font-semibold text-gray-900 leading-relaxed">{order.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="relative flex items-center p-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500 mb-1">Kota</p>
                                                    <p className="font-semibold text-gray-900">{order.city}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="relative flex items-center p-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500 mb-1">Kode Pos</p>
                                                    <p className="font-semibold text-gray-900">{order.postal_code}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Order Details */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            Detail Pesanan
                                        </h2>
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-50 hover:shadow-md transition-all duration-300">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-violet-100 rounded-xl flex items-center justify-center mr-4">
                                                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 mb-1">{item.product.title}</h3>
                                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-gray-900">Rp {item.price.toLocaleString('id-ID')}</p>
                                                        <p className="text-sm text-gray-500">per item</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div>
                                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm sticky top-8">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                            Ringkasan Pesanan
                                        </h2>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-600 text-sm">Total Items</span>
                                                <span className="font-medium text-gray-900">{order.items.length}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-600 text-sm">Tanggal Pesanan</span>
                                                <span className="font-medium text-gray-900 text-sm">
                                                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="border-t border-gray-100 pt-3 mt-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-base font-semibold text-gray-900">Total Pembayaran</span>
                                                    <span className="text-xl font-bold text-gray-900">
                                                        {new Intl.NumberFormat('id-ID', {
                                                            style: 'currency',
                                                            currency: 'IDR',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        }).format(order.total_amount)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {order.status === 'payment_required' && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6 col-span-3">
                                        <h3 className="text-lg font-semibold text-blue-900 mb-4">
                                            Informasi Pembayaran
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="bg-white rounded-lg p-4 border border-blue-100">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Bank Tujuan</span>
                                                    <span className="text-sm font-semibold text-blue-900">Bank XYZ</span>
                                                </div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Nomor Rekening</span>
                                                    <span className="text-sm font-mono font-semibold text-blue-900">1234-5678-9012-3456</span>
                                                </div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Atas Nama</span>
                                                    <span className="text-sm font-semibold text-blue-900">PT. XYZ Indonesia</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-700">Jumlah Transfer</span>
                                                    <span className="text-sm font-bold text-blue-900">
                                                        {new Intl.NumberFormat('id-ID', {
                                                            style: 'currency',
                                                            currency: 'IDR',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        }).format(order.total_amount)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h4 className="text-sm font-medium text-yellow-800">Penting!</h4>
                                                        <div className="mt-1 text-sm text-yellow-700">
                                                            <p>• Pastikan jumlah transfer sesuai dengan total pembayaran</p>
                                                            <p>• Simpan bukti transfer untuk konfirmasi</p>
                                                            <p>• Pembayaran akan diverifikasi dalam 1x24 jam</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={async () => {
                                                try {
                                                    const response = await fetch(`/api/order/${order.id}/pay`, {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                    });

                                                    if (response.ok) {
                                                        window.location.reload();
                                                    } else {
                                                        const error = await response.json();
                                                        alert('Error: ' + (error.error || 'Failed to update payment status'));
                                                    }
                                                } catch (error) {
                                                    console.error('Error:', error);
                                                    alert('Error: Failed to update payment status');
                                                }
                                            }}
                                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Saya Sudah Bayar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CheckoutLayout>
    );
}

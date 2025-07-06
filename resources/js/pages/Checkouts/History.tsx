import { CheckoutLayout } from '@/layouts/Checkout';
import { JSX, useEffect, useState } from 'react';
import { useFingerprint } from '@/hooks/fp';
import { Order } from '@/types';

interface PaginatedResponse {
    data: Order[];
    links: {
        first: string | null;
        last: string | null;
        next: string | null;
        prev: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
}

const statusPillMap: Record<
    string,
    {
        bg: string;
        border: string;
        text: string;
        icon: JSX.Element;
    }
> = {
    payment_required: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        icon: (
            <svg className="w-5 h-5 text-orange-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
        ),
    },
    pending: {
        bg: 'bg-amber-50',
        border: 'border-amber-300',
        text: 'text-amber-700',
        icon: (
            <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" fill="#fff8e1" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
        ),
    },
    processing: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: (
            <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
        ),
    },
    shipped: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-700',
        icon: (
            <svg className="w-5 h-5 text-indigo-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
            </svg>
        ),
    },
    delivered: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-700',
        icon: (
            <svg className="w-5 h-5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        ),
    },
    cancelled: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        icon: (
            <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        ),
    },
};

function StatusPill({ status }: { status: string }) {
    const pill = statusPillMap[status] || {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-700',
        icon: null,
    };
    return (
        <span
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-semibold ${pill.bg} ${pill.text} ${pill.border} border-2`}
            style={{ minWidth: 140, justifyContent: 'center' }}
        >
            {pill.icon}
            <span className="text-sm capitalize">{status.replace(/_/g, ' ')}</span>
        </span>
    );
}

export default function History() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const { getFingerprint } = useFingerprint();

    const fetchOrders = async (page: number = 1) => {
        try {
            setLoading(true);
            const fingerprint = await getFingerprint();
            const response = await fetch(`/api/order?fingerprint=${fingerprint}&page=${page}&per_page=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data: PaginatedResponse = await response.json();
                setOrders(data.data);
                setCurrentPage(data.meta.current_page);
                setTotalPages(data.meta.last_page);
                setTotalOrders(data.meta.total);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchOrders(page);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <CheckoutLayout>
                <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center max-w-md mx-auto">
                            <div className="relative mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-violet-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent"></div>
                                </div>
                                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-3xl blur-xl animate-pulse"></div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Memuat Riwayat</h3>
                            <p className="text-gray-600 text-sm">Mengambil data pesanan Anda...</p>
                        </div>
                    </div>
                </div>
            </CheckoutLayout>
        );
    }

    return (
        <CheckoutLayout>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Back Button */}
                    <div className="mb-8">
                        <a
                            href="/"
                            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 hover:text-gray-900"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Kembali
                        </a>
                    </div>

                    <div className="relative mb-16">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-3xl blur-3xl"></div>
                        <div className="relative text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl mb-6 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                                Riwayat Pesanan
                            </h1>
                            <p className="text-xl text-gray-600 mb-3 max-w-2xl mx-auto leading-relaxed">
                                Lihat semua pesanan yang telah Anda buat
                            </p>
                            {totalOrders > 0 && (
                                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                    <span className="text-sm font-medium text-gray-700">
                                        Total {totalOrders} pesanan ditemukan
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Belum ada pesanan
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Anda belum memiliki riwayat pesanan. Mulai berbelanja sekarang!
                            </p>
                            <a
                                href="/products"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Mulai Berbelanja
                            </a>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-6 mb-8">
                                {orders.map((order) => (
                                    <div key={order.id} className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
                                        {/* Header Section */}
                                        <div className="relative p-8 border-b border-white/10 bg-gradient-to-br from-gray-50/50 via-white/30 to-gray-50/50">
                                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-violet-500/5 rounded-t-3xl"></div>
                                            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                                <div className="mb-6 lg:mb-0">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                                                Pesanan #{order.id}
                                                            </h3>
                                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                {formatDate(order.created_at)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={`/checkout/${order.id}`}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Lihat Detail
                                                    </a>
                                                </div>
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                                                    <div className="flex items-center">
                                                        <StatusPill status={order.status} />
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-gray-500 mb-1">Total Pembayaran</p>
                                                        <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
                                                            Rp {order.total_amount.toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8">
                                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                                {/* Shipping Information */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                        <h4 className="text-lg font-bold text-gray-900">Informasi Pengiriman</h4>
                                                    </div>
                                                    <div className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-2xl p-6 border border-blue-100/50">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-blue-600 font-medium">Nama</p>
                                                                        <p className="text-sm font-semibold text-gray-900">{order.name}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-blue-600 font-medium">Email</p>
                                                                        <p className="text-sm font-semibold text-gray-900">{order.email}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-blue-600 font-medium">Telepon</p>
                                                                        <p className="text-sm font-semibold text-gray-900">{order.phone}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <div className="flex items-start gap-3">
                                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                                                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-blue-600 font-medium">Alamat</p>
                                                                        <p className="text-sm font-semibold text-gray-900">{order.address}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-blue-600 font-medium">Kota</p>
                                                                        <p className="text-sm font-semibold text-gray-900">{order.city}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-blue-600 font-medium">Kode Pos</p>
                                                                        <p className="text-sm font-semibold text-gray-900">{order.postal_code}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Items List */}
                                            <div className="mt-8">
                                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                                                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                            <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                            </svg>
                                                            Detail Produk
                                                        </h3>
                                                    </div>
                                                    <div className="divide-y divide-gray-100">
                                                        {order.items.map((item, itemIndex) => (
                                                            <div key={itemIndex} className="p-6 hover:bg-gray-50/50 transition-colors duration-200">
                                                                <div className="flex items-start gap-4">
                                                                    <div className="relative">
                                                                        <img 
                                                                            src={item.product.image} 
                                                                            alt={item.product.title}
                                                                            className="w-16 h-16 object-cover rounded-xl shadow-sm"
                                                                        />
                                                                        {item.quantity > 1 && (
                                                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
                                                                                <span className="text-xs font-bold text-white">{item.quantity}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-start justify-between">
                                                                            <div className="flex-1">
                                                                                <h4 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                                                                                    {item.product.title}
                                                                                </h4>
                                                                                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                                                                                    {item.product.desc}
                                                                                </p>
                                                                            </div>
                                                                            <div className="text-right ml-4">
                                                                                <div className="text-lg font-bold text-gray-900">
                                                                                    Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                                                                                </div>
                                                                                {item.quantity > 1 && (
                                                                                    <div className="text-sm text-gray-500 mt-1">
                                                                                        @ Rp {new Intl.NumberFormat('id-ID').format(item.price / item.quantity)}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-medium text-gray-600">
                                                                Total {order.items.length} produk
                                                            </span>
                                                            <div className="text-right">
                                                                <div className="text-sm text-gray-600">Total Harga</div>
                                                                <div className="text-xl font-bold text-gray-900">
                                                                    Rp {new Intl.NumberFormat('id-ID').format(order.total_amount)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-8">
                                <nav className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100">
                                    {currentPage > 1 && (
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 bg-white rounded-xl hover:bg-gray-50 hover:text-pink-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Sebelumnya
                                        </button>
                                    )}

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`flex items-center justify-center w-10 h-10 text-sm font-semibold rounded-xl transition-all duration-300 ${page === currentPage
                                                        ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg shadow-pink-500/25'
                                                        : 'text-gray-600 bg-white hover:bg-gray-50 hover:text-pink-600 shadow-sm hover:shadow-md'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    {currentPage < totalPages && (
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 bg-white rounded-xl hover:bg-gray-50 hover:text-pink-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                        >
                                            Selanjutnya
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                </nav>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </CheckoutLayout>
    );
}

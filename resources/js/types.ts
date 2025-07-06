export type Product = {
    id: number;
    title: string;
    desc: string;
    price: number;
    image: string;
    created_at: string;
    updated_at: string;
};

export type CartItem = {
    id: number;
    product: Product;
    quantity: number;
};

export type Cart = {
    id: number;
    fingerprint: string;
    items: CartItem[];
};

export type OrderItem = {
    id: number;
    order_id: number;
    product_id: number;
    product: Product;
    quantity: number;
    price: number;
    created_at: string;
    updated_at: string;
};

export type Order = {
    id: number;
    status: "cancelled" | "delivered" | "pending" | "processing" | "shipped";
    total_amount: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    fingerprint: string;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
};

export interface Product {
    id: number;
    title: string;
    desc: string;
    price: number;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}
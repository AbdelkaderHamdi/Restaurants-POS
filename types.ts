export enum View {
    Waiter = 'waiter',
    Manager = 'manager',
}

export enum OrderStatus {
    Pending = 'Pending',
    Served = 'Served',
    Paid = 'Paid',
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
    image_url: string;
    description?: string;
}

export interface OrderItem extends MenuItem {
    quantity: number;
}

export interface Order {
    id: number;
    tableNumber: number;
    waiterId: number;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    timestamp: Date;
}

export interface Waiter {
    id: number;
    name: string;
}
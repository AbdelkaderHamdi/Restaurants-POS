import React from 'react';
import { MenuItem, Order, OrderStatus, Waiter } from './types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
    { id: 1, name: 'Espresso', price: 2.50, category: 'Coffee', image_url: 'https://picsum.photos/id/225/100', description: 'A strong shot of coffee.' },
    { id: 2, name: 'Latte', price: 4.00, category: 'Coffee', image_url: 'https://picsum.photos/id/431/100', description: 'Espresso with steamed milk.' },
    { id: 3, name: 'Cappuccino', price: 3.50, category: 'Coffee', image_url: 'https://picsum.photos/id/30/100', description: 'Espresso, hot milk, and steamed-milk foam.' },
    { id: 4, name: 'Iced Tea', price: 2.00, category: 'Drinks', image_url: 'https://picsum.photos/id/1060/100', description: 'Chilled sweet tea.' },
    { id: 5, name: 'Croissant', price: 2.75, category: 'Pastries', image_url: 'https://picsum.photos/id/368/100', description: 'A buttery, flaky pastry.' },
    { id: 6, name: 'Avocado Toast', price: 8.50, category: 'Food', image_url: 'https://picsum.photos/id/102/100', description: 'Toast with smashed avocado, salt, pepper.' },
    { id: 7, name: 'Pancakes', price: 9.00, category: 'Food', image_url: 'https://picsum.photos/id/326/100', description: 'Fluffy pancakes with syrup.' },
    { id: 8, name: 'Orange Juice', price: 3.00, category: 'Drinks', image_url: 'https://picsum.photos/id/25/100', description: 'Freshly squeezed orange juice.' },
];

export const WAITERS: Waiter[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Peter Jones' },
];

export const INITIAL_ORDERS: Order[] = [
    {
        id: 1,
        tableNumber: 3,
        waiterId: 1,
        items: [
            { ...INITIAL_MENU_ITEMS[0], quantity: 2 },
            { ...INITIAL_MENU_ITEMS[4], quantity: 1 },
        ],
        total: 2.50 * 2 + 2.75,
        status: OrderStatus.Served,
        timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    },
    {
        id: 2,
        tableNumber: 5,
        waiterId: 2,
        items: [
            { ...INITIAL_MENU_ITEMS[5], quantity: 1 },
            { ...INITIAL_MENU_ITEMS[7], quantity: 1 },
        ],
        total: 8.50 + 3.00,
        status: OrderStatus.Paid,
        timestamp: new Date(Date.now() - 3600000 * 1.5), // 1.5 hours ago
    },
    {
        id: 3,
        tableNumber: 1,
        waiterId: 1,
        items: [
            { ...INITIAL_MENU_ITEMS[1], quantity: 1 },
            { ...INITIAL_MENU_ITEMS[2], quantity: 1 },
            { ...INITIAL_MENU_ITEMS[6], quantity: 1 },
        ],
        total: 4.00 + 3.50 + 9.00,
        status: OrderStatus.Pending,
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    },
     {
        id: 4,
        tableNumber: 8,
        waiterId: 3,
        items: [
            { ...INITIAL_MENU_ITEMS[3], quantity: 2 },
        ],
        total: 2.00 * 2,
        status: OrderStatus.Served,
        timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
    },
];

export const Icons = {
    Revenue: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /></svg>,
    Orders: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    AvgOrder: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    Waiter: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    Table: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" /></svg>
};
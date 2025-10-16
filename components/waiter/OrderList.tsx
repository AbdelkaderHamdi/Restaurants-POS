
import React from 'react';
import { Order, OrderStatus } from '../../types';
import OrderCard from './OrderCard';

interface OrderListProps {
    orders: Order[];
    updateOrderStatus: (orderId: number, status: OrderStatus) => void;
    filter: OrderStatus | 'All';
    setFilter: (filter: OrderStatus | 'All') => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, updateOrderStatus, filter, setFilter }) => {
    const filters: (OrderStatus | 'All')[] = ['All', OrderStatus.Pending, OrderStatus.Served, OrderStatus.Paid];
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-700">Active Orders</h2>
            
            <div className="flex space-x-2 mb-6 border-b pb-4">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                            filter === f
                                ? 'bg-sky-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {orders.length > 0 ? (
                    orders.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()).map(order => (
                        <OrderCard key={order.id} order={order} updateOrderStatus={updateOrderStatus} />
                    ))
                ) : (
                    <p className="text-slate-500 text-center py-10">No {filter !== 'All' && filter.toLowerCase()} orders found.</p>
                )}
            </div>
        </div>
    );
};

export default OrderList;

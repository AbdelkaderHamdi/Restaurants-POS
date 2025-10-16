
import React from 'react';
import { Order, OrderStatus } from '../../types';
import { WAITERS } from '../../constants';

interface OrderCardProps {
    order: Order;
    updateOrderStatus: (orderId: number, status: OrderStatus) => void;
}

const getStatusClass = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Pending:
            return 'bg-yellow-100 text-yellow-800';
        case OrderStatus.Served:
            return 'bg-blue-100 text-blue-800';
        case OrderStatus.Paid:
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-slate-100 text-slate-800';
    }
};

const OrderCard: React.FC<OrderCardProps> = ({ order, updateOrderStatus }) => {
    const waiterName = WAITERS.find(w => w.id === order.waiterId)?.name || 'Unknown';

    return (
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-lg font-bold">Table {order.tableNumber}</h3>
                    <p className="text-sm text-slate-500">Waiter: {waiterName}</p>
                    <p className="text-xs text-slate-400">{order.timestamp.toLocaleTimeString()}</p>
                </div>
                <div className="text-right">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(order.status)}`}>
                        {order.status}
                    </span>
                     <p className="text-lg font-bold text-slate-800 mt-1">${order.total.toFixed(2)}</p>
                </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
                <ul className="text-sm space-y-1 text-slate-600">
                    {order.items.map(item => (
                        <li key={item.id} className="flex justify-between">
                           <span>{item.quantity}x {item.name}</span>
                           <span>${(item.quantity * item.price).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {order.status !== OrderStatus.Paid && (
                <div className="flex justify-end space-x-2 mt-4">
                    {order.status === OrderStatus.Pending && (
                        <button onClick={() => updateOrderStatus(order.id, OrderStatus.Served)} className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600">Mark as Served</button>
                    )}
                     {order.status === OrderStatus.Served && (
                        <button onClick={() => updateOrderStatus(order.id, OrderStatus.Paid)} className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-md hover:bg-green-600">Mark as Paid</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderCard;


import React from 'react';
import { Order, OrderStatus } from '../../types';

interface LiveOrderFeedProps {
    orders: Order[];
}

const getStatusIndicatorClass = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Pending: return 'bg-yellow-400';
        case OrderStatus.Served: return 'bg-blue-400';
        case OrderStatus.Paid: return 'bg-green-400';
        default: return 'bg-slate-400';
    }
};

const LiveOrderFeed: React.FC<LiveOrderFeedProps> = ({ orders }) => {
    const recentOrders = orders
        .slice()
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10);

    return (
        <div>
            <h3 className="text-xl font-bold text-slate-700 mb-4">Live Order Feed</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {recentOrders.map(order => (
                    <div key={order.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <span className={`w-3 h-3 rounded-full flex-shrink-0 ${getStatusIndicatorClass(order.status)}`}></span>
                        <div className="flex-grow">
                            <p className="font-semibold">Table {order.tableNumber}</p>
                            <p className="text-xs text-slate-500">{order.status} - {order.timestamp.toLocaleTimeString()}</p>
                        </div>
                        <p className="font-bold text-slate-700">${order.total.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveOrderFeed;

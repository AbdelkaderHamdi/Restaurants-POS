
import React from 'react';
import { OrderItem } from '../../types';
import { WAITERS } from '../../constants';
import { Icons } from '../../constants';

interface OrderSummaryProps {
    items: OrderItem[];
    tableNumber: string;
    waiterId: string;
    onTableNumberChange: (value: string) => void;
    onWaiterIdChange: (value: string) => void;
    onUpdateQuantity: (itemId: number, newQuantity: number) => void;
    onSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    items,
    tableNumber,
    waiterId,
    onTableNumberChange,
    onWaiterIdChange,
    onUpdateQuantity,
    onSubmit,
}) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-700">New Order</h2>
            
            <div className="space-y-4 mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><Icons.Table /></span>
                    <input
                        type="number"
                        placeholder="Table Number"
                        value={tableNumber}
                        onChange={(e) => onTableNumberChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
                    />
                </div>
                <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><Icons.Waiter /></span>
                    <select
                        value={waiterId}
                        onChange={(e) => onWaiterIdChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition appearance-none"
                    >
                        {WAITERS.map(waiter => (
                            <option key={waiter.id} value={waiter.id}>{waiter.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="min-h-[150px] max-h-64 overflow-y-auto space-y-2 mb-4 pr-2">
                {items.length === 0 ? (
                    <p className="text-slate-500 text-center py-10">Select items from the menu</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-md">
                            <div>
                                <p className="font-semibold text-slate-800">{item.name}</p>
                                <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full bg-slate-200 hover:bg-red-200 text-red-600 font-bold">-</button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-slate-200 hover:bg-green-200 text-green-600 font-bold">+</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <button
                    onClick={onSubmit}
                    disabled={items.length === 0 || !tableNumber || !waiterId}
                    className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                    Submit Order
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;

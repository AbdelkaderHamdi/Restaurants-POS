import React, { useState, useMemo } from 'react';
import { Order, OrderStatus, OrderItem, MenuItem } from '../../types';
import { WAITERS } from '../../constants';
import MenuGrid from './MenuGrid';
import OrderSummary from './OrderSummary';
import OrderList from './OrderList';

interface WaiterDashboardProps {
    orders: Order[];
    menuItems: MenuItem[];
    addOrder: (newOrder: Omit<Order, 'id' | 'timestamp' | 'status'>) => void;
    updateOrderStatus: (orderId: number, status: OrderStatus) => void;
}

const WaiterDashboard: React.FC<WaiterDashboardProps> = ({ orders, menuItems, addOrder, updateOrderStatus }) => {
    const [currentOrderItems, setCurrentOrderItems] = useState<OrderItem[]>([]);
    const [tableNumber, setTableNumber] = useState<string>('');
    const [waiterId, setWaiterId] = useState<string>(WAITERS[0]?.id.toString() || '');
    const [filter, setFilter] = useState<OrderStatus | 'All'>('All');

    const handleAddItem = (item: MenuItem) => {
        setCurrentOrderItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            setCurrentOrderItems(prevItems => prevItems.filter(i => i.id !== itemId));
        } else {
            setCurrentOrderItems(prevItems =>
                prevItems.map(i => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
            );
        }
    };
    
    const handleSubmitOrder = () => {
        if (currentOrderItems.length === 0 || !tableNumber || !waiterId) {
            alert('Please select items, table number, and waiter.');
            return;
        }
        const total = currentOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        addOrder({
            tableNumber: parseInt(tableNumber, 10),
            waiterId: parseInt(waiterId, 10),
            items: currentOrderItems,
            total,
        });
        setCurrentOrderItems([]);
        setTableNumber('');
    };

    const filteredOrders = useMemo(() => {
        if (filter === 'All') return orders;
        return orders.filter(order => order.status === filter);
    }, [orders, filter]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <MenuGrid menuItems={menuItems} onAddItem={handleAddItem} />
                <OrderList 
                    orders={filteredOrders} 
                    updateOrderStatus={updateOrderStatus} 
                    filter={filter} 
                    setFilter={setFilter}
                />
            </div>
            <div className="lg:col-span-1">
                <OrderSummary
                    items={currentOrderItems}
                    tableNumber={tableNumber}
                    waiterId={waiterId}
                    onTableNumberChange={setTableNumber}
                    onWaiterIdChange={setWaiterId}
                    onUpdateQuantity={handleUpdateQuantity}
                    onSubmit={handleSubmitOrder}
                />
            </div>
        </div>
    );
};

export default WaiterDashboard;
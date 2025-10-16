import React, { useState, useCallback, useEffect } from 'react';
import { View, Order, OrderStatus, MenuItem } from './types';
import { INITIAL_ORDERS } from './constants';
import { supabase } from './services/supabase';
import Header from './components/shared/Header';
import WaiterDashboard from './components/waiter/WaiterDashboard';
import ManagerDashboard from './components/manager/ManagerDashboard';

const App: React.FC = () => {
    const [view, setView] = useState<View>(View.Waiter);
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMenuItems = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from('menu_items').select('*').order('id');
        if (error) {
            console.error('Error fetching menu items:', error);
        } else {
            setMenuItems(data || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchMenuItems();
    }, [fetchMenuItems]);

    const addOrder = useCallback((newOrder: Omit<Order, 'id' | 'timestamp' | 'status'>) => {
        setOrders(prevOrders => [
            ...prevOrders,
            {
                ...newOrder,
                id: Date.now(),
                timestamp: new Date(),
                status: OrderStatus.Pending,
            }
        ]);
    }, []);

    const updateOrderStatus = useCallback((orderId: number, status: OrderStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    }, []);

    const addMenuItem = useCallback(async (item: Omit<MenuItem, 'id'>) => {
        const { data, error } = await supabase
            .from('menu_items')
            .insert([item])
            .select();
        
        if (error) {
            console.error("Error adding item:", error);
        } else if (data) {
            setMenuItems(prev => [...prev, data[0]]);
        }
    }, []);

    const updateMenuItem = useCallback(async (updatedItem: MenuItem) => {
        const { data, error } = await supabase
            .from('menu_items')
            .update(updatedItem)
            .eq('id', updatedItem.id)
            .select();

        if (error) {
            console.error("Error updating item:", error);
        } else if (data) {
            setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? data[0] : item));
        }
    }, []);

    const deleteMenuItem = useCallback(async (itemId: number) => {
        const { error } = await supabase
            .from('menu_items')
            .delete()
            .eq('id', itemId);

        if (error) {
            console.error("Error deleting item:", error);
        } else {
            setMenuItems(prev => prev.filter(item => item.id !== itemId));
        }
    }, []);


    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
            <Header currentView={view} setView={setView} />
            <main className="p-4 sm:p-6 lg:p-8">
                 {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-xl text-slate-500">Loading menu from the kitchen...</p>
                    </div>
                ) : view === View.Waiter ? (
                    <WaiterDashboard
                        orders={orders}
                        menuItems={menuItems}
                        addOrder={addOrder}
                        updateOrderStatus={updateOrderStatus}
                    />
                ) : (
                    <ManagerDashboard 
                        orders={orders} 
                        menuItems={menuItems}
                        onAddMenuItem={addMenuItem}
                        onUpdateMenuItem={updateMenuItem}
                        onDeleteMenuItem={deleteMenuItem}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
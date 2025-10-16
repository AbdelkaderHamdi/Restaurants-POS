import React, { useMemo } from 'react';
import { Order, MenuItem } from '../../types';
import { Icons } from '../../constants';
import KPI from './KPI';
import TopSellingChart from './TopSellingChart';
import WaiterPerformanceChart from './WaiterPerformanceChart';
import LiveOrderFeed from './LiveOrderFeed';
import ProductManagement from './ProductManagement';

interface ManagerDashboardProps {
    orders: Order[];
    menuItems: MenuItem[];
    onAddMenuItem: (item: Omit<MenuItem, 'id'>) => void;
    onUpdateMenuItem: (item: MenuItem) => void;
    onDeleteMenuItem: (itemId: number) => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ 
    orders, 
    menuItems, 
    onAddMenuItem, 
    onUpdateMenuItem, 
    onDeleteMenuItem 
}) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysOrders = useMemo(() => orders.filter(o => o.timestamp >= today), [orders]);

    const totalRevenue = useMemo(() => todaysOrders.reduce((sum, order) => sum + order.total, 0), [todaysOrders]);
    const totalOrders = useMemo(() => todaysOrders.length, [todaysOrders]);
    const avgOrderValue = useMemo(() => (totalOrders > 0 ? totalRevenue / totalOrders : 0), [totalRevenue, totalOrders]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPI
                    title="Today's Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={<Icons.Revenue />}
                    color="bg-green-500"
                />
                <KPI
                    title="Today's Orders"
                    value={totalOrders.toString()}
                    icon={<Icons.Orders />}
                    color="bg-sky-500"
                />
                <KPI
                    title="Avg. Order Value"
                    value={`$${avgOrderValue.toFixed(2)}`}
                    icon={<Icons.AvgOrder />}
                    color="bg-amber-500"
                />
            </div>

            <ProductManagement 
                menuItems={menuItems}
                onAddMenuItem={onAddMenuItem}
                onUpdateMenuItem={onUpdateMenuItem}
                onDeleteMenuItem={onDeleteMenuItem}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                 <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-lg">
                     <h3 className="text-xl font-bold text-slate-700 mb-4">Top Selling Items (All Time)</h3>
                    <TopSellingChart orders={orders} />
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <LiveOrderFeed orders={orders} />
                </div>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-lg">
                 <h3 className="text-xl font-bold text-slate-700 mb-4">Waiter Performance (All Time Sales)</h3>
                <WaiterPerformanceChart orders={orders} />
            </div>
        </div>
    );
};

export default ManagerDashboard;
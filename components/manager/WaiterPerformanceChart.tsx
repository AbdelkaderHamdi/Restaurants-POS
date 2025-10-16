import React, { useMemo } from 'react';
import { Order } from '../../types';
import { WAITERS } from '../../constants';

// const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = (window as any).Recharts;

interface WaiterPerformanceChartProps {
    orders: Order[];
}

const WaiterPerformanceChart: React.FC<WaiterPerformanceChartProps> = ({ orders }) => {
    if (!(window as any).Recharts) {
        return <div style={{ width: '100%', height: 300 }} className="flex items-center justify-center text-slate-500">Loading Chart...</div>;
    }
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = (window as any).Recharts;

    const chartData = useMemo(() => {
        const waiterSales: { [key: number]: number } = {};
        orders.forEach(order => {
            waiterSales[order.waiterId] = (waiterSales[order.waiterId] || 0) + order.total;
        });

        return WAITERS.map(waiter => ({
            name: waiter.name,
            sales: waiterSales[waiter.id] || 0,
        })).sort((a,b) => b.sales - a.sales);
    }, [orders]);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                    <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} cursor={{fill: 'rgba(241, 245, 249, 0.5)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}/>
                    <Bar dataKey="sales" fill="#10b981" name="Total Sales" radius={[0, 4, 4, 0]} barSize={25} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WaiterPerformanceChart;
import React, { useMemo } from 'react';
import { Order } from '../../types';

// Destructuring from window.Recharts as per instructions
// const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = (window as any).Recharts;

interface TopSellingChartProps {
    orders: Order[];
}

const TopSellingChart: React.FC<TopSellingChartProps> = ({ orders }) => {
    if (!(window as any).Recharts) {
        return <div style={{ width: '100%', height: 300 }} className="flex items-center justify-center text-slate-500">Loading Chart...</div>;
    }
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = (window as any).Recharts;

    const chartData = useMemo(() => {
        const itemCounts: { [key: string]: number } = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
            });
        });
        
        return Object.entries(itemCounts)
            .map(([name, quantity]) => ({ name, quantity }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 7); // Top 7 items
    }, [orders]);
    
    return (
         <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{fill: 'rgba(241, 245, 249, 0.5)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}/>
                    <Bar dataKey="quantity" fill="#0ea5e9" name="Quantity Sold" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopSellingChart;

import React from 'react';

interface KPIProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

const KPI: React.FC<KPIProps> = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
            <div className={`p-4 rounded-full ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <p className="text-3xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );
};

export default KPI;

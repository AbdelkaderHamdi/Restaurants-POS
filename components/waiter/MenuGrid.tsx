import React from 'react';
import { MenuItem as MenuItemType } from '../../types';
import MenuItemCard from './MenuItemCard';

interface MenuGridProps {
    menuItems: MenuItemType[];
    onAddItem: (item: MenuItemType) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ menuItems, onAddItem }) => {
    const categories = [...new Set(menuItems.map(item => item.category))];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-700">Menu</h2>
            {categories.map(category => (
                <div key={category} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-slate-600 border-b pb-2">{category}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {menuItems.filter(item => item.category === category).map(item => (
                            <MenuItemCard key={item.id} item={item} onAddItem={onAddItem} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuGrid;

import React from 'react';
import { MenuItem as MenuItemType } from '../../types';

interface MenuItemCardProps {
    item: MenuItemType;
    onAddItem: (item: MenuItemType) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddItem }) => {
    return (
        <button
            onClick={() => onAddItem(item)}
            className="group text-center bg-slate-50 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75"
        >
            <img src={item.image_url} alt={item.name} className="w-20 h-20 mx-auto rounded-full object-cover mb-3 border-2 border-slate-200 group-hover:border-sky-400 transition-colors" />
            <p className="font-semibold text-slate-800">{item.name}</p>
            <p className="text-sm text-green-600 font-medium">${item.price.toFixed(2)}</p>
        </button>
    );
};

export default MenuItemCard;
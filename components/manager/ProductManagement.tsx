import React, { useState } from 'react';
import { MenuItem } from '../../types';
import Modal from '../shared/Modal';
import ProductForm from './ProductForm';

interface ProductManagementProps {
    menuItems: MenuItem[];
    onAddMenuItem: (item: Omit<MenuItem, 'id'>) => void;
    onUpdateMenuItem: (item: MenuItem) => void;
    onDeleteMenuItem: (itemId: number) => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({
    menuItems,
    onAddMenuItem,
    onUpdateMenuItem,
    onDeleteMenuItem,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    const handleOpenModal = (item: MenuItem | null = null) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingItem(null);
        setIsModalOpen(false);
    };

    const handleSave = (item: Omit<MenuItem, 'id'> | MenuItem) => {
        if ('id' in item) {
            onUpdateMenuItem(item);
        } else {
            onAddMenuItem(item);
        }
        handleCloseModal();
    };
    
    const handleDelete = (itemId: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            onDeleteMenuItem(itemId);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-700">Product Management</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-sky-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                >
                    Add Product
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {menuItems.map(item => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-md object-cover"/>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-500">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-500">${item.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button onClick={() => handleOpenModal(item)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingItem ? 'Edit Product' : 'Add Product'}>
                <ProductForm initialData={editingItem} onSave={handleSave} onCancel={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default ProductManagement;
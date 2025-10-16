import React, { useState, useEffect } from 'react';
import { MenuItem } from '../../types';

interface ProductFormProps {
    initialData: MenuItem | null;
    onSave: (item: Omit<MenuItem, 'id'> | MenuItem) => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image_url: '',
        description: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                price: initialData.price.toString(),
                category: initialData.category,
                image_url: initialData.image_url,
                description: initialData.description || '',
            });
        } else {
             setFormData({ name: '', price: '', category: '', image_url: '', description: '' });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(formData.price);
        if (isNaN(price) || price < 0) {
            alert('Please enter a valid price.');
            return;
        }

        const payload = {
            ...formData,
            price,
        };
        
        if (initialData) {
            onSave({ ...payload, id: initialData.id });
        } else {
            onSave(payload);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
            </div>
             <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price</label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required step="0.01" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
            </div>
             <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
            </div>
             <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-slate-700">Image URL</label>
                <input type="text" name="image_url" id="image_url" value={formData.image_url} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
            </div>
             <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                <button type="submit" className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">Save Product</button>
            </div>
        </form>
    );
};

export default ProductForm;
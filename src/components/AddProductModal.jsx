import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function AddProductModal({ isAddModalOpen, setIsAddModalOpen, formData, setFormData, formError, handleAddProduct }) {
  if (!isAddModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-rose-100 shadow-xl p-6 relative">
        <button
          onClick={() => setIsAddModalOpen(false)}
          className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold font-serif text-amber-950 mb-1">Add New Crochet Item</h2>
        <p className="text-xs text-amber-800/60 mb-4">Fill out all required fields. Total Inventory Value will automatically update.</p>

        {formError && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-2xl flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-amber-900 mb-1">Product Name *</label>
            <input
              type="text"
              placeholder="e.g. Lavender Blossom Stem"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-amber-900 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none bg-white"
              >
                <option value="Bouquets">Bouquets</option>
                <option value="Single Stems">Single Stems</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-amber-900 mb-1">Rating (1.0 - 5.0) *</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="5.0"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-3 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-amber-900 mb-1">Price (₱) *</label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 250"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-amber-900 mb-1">Stock Quantity *</label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 10"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-amber-900 mb-1">Feature Image URL *</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-amber-900 mb-1">Product Specifications *</label>
            <input
              type="text"
              placeholder="e.g. Milk cotton yarn, acrylic ribbon wrapper"
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              className="w-full px-3 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-amber-900 mb-1">Description *</label>
            <textarea
              rows="3"
              placeholder="Provide details about the handmade creation..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-amber-950 font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-rose-400 hover:bg-rose-500 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
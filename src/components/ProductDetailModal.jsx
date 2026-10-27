import React from 'react';
import { X, Star, ShoppingBag } from 'lucide-react';

export default function ProductDetailModal({ selectedProduct, setSelectedProduct, detailModalQty, setDetailModalQty, addToCart }) {
  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-rose-100 shadow-xl overflow-hidden relative">
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full border border-rose-100 text-rose-500 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="aspect-square bg-rose-50 relative">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            {selectedProduct.quantity < 5 && (
              <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                ⚠️ Low Stock
              </span>
            )}
          </div>

          <div className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-50 px-2.5 py-1 rounded-full">
                  {selectedProduct.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span>{selectedProduct.rating.toFixed(1)}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold font-serif text-amber-950">{selectedProduct.name}</h2>
              <p className="text-xs text-amber-900/80 leading-relaxed">{selectedProduct.description}</p>

              <div className="bg-rose-50/60 p-3 rounded-2xl space-y-1">
                <p className="text-[10px] font-bold uppercase text-rose-400">Specifications</p>
                <p className="text-xs font-medium text-amber-900">{selectedProduct.specs}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-gray-50 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Unit Price</span>
                  <span className="text-sm font-bold text-rose-500">₱{selectedProduct.price.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Available Stock</span>
                  <span className="text-sm font-bold text-amber-950">{selectedProduct.quantity} units</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-rose-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900">Quantity</span>
                <div className="flex items-center gap-2 bg-rose-50 p-1 rounded-xl border border-rose-100">
                  <button
                    onClick={() => setDetailModalQty(q => Math.max(1, q - 1))}
                    disabled={detailModalQty <= 1}
                    className="w-7 h-7 rounded-lg bg-white font-bold text-rose-600 hover:bg-rose-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-xs shadow-2xs cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold px-2 text-amber-950">{detailModalQty}</span>
                  <button
                    onClick={() => setDetailModalQty(q => Math.min(selectedProduct.quantity, q + 1))}
                    disabled={detailModalQty >= selectedProduct.quantity || selectedProduct.quantity === 0}
                    className="w-7 h-7 rounded-lg bg-white font-bold text-rose-600 hover:bg-rose-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-xs shadow-2xs cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-amber-900">Subtotal:</span>
                <span className="font-extrabold text-emerald-600 text-base">
                  ₱{(selectedProduct.price * detailModalQty).toLocaleString()}
                </span>
              </div>

              <button
                disabled={selectedProduct.quantity === 0}
                onClick={() => {
                  addToCart(selectedProduct, detailModalQty);
                  setSelectedProduct(null);
                }}
                className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedProduct.quantity === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-rose-400 hover:bg-rose-500 text-white shadow-md active:scale-98"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {selectedProduct.quantity === 0 ? "Out of Stock" : "Add to Shopping Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
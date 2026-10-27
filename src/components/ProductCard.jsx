import React from 'react';
import { Star, AlertTriangle, Info, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct, addToCart }) {
  const isLowStock = product.quantity < 5;
  const itemSubtotal = product.price * product.quantity;

  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group">
      <div 
        className="relative aspect-square w-full bg-rose-50 overflow-hidden cursor-pointer" 
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-rose-600 font-semibold text-[10px] px-2.5 py-1 rounded-full border border-rose-100 shadow-2xs">
          {product.category}
        </span>
        {isLowStock && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            ⚠️ Low Stock ({product.quantity} left)
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <span className={`text-xs font-semibold ${isLowStock ? "text-amber-600 font-bold" : "text-rose-400"}`}>
              In Stock: {product.quantity}
            </span>
          </div>

          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-lg font-bold text-amber-950 hover:text-rose-500 transition-colors cursor-pointer line-clamp-1 font-serif"
          >
            {product.name}
          </h3>
          
          <p className="text-xs text-amber-900/70 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-rose-100/70 space-y-3">
          <div className="flex items-center justify-between bg-rose-50/40 p-2.5 rounded-xl border border-rose-100/50">
            <div>
              <span className="text-[10px] text-amber-900/50 uppercase font-bold block">Unit Price</span>
              <span className="text-sm font-extrabold text-rose-500">₱{product.price.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-amber-900/50 uppercase font-bold block">Subtotal (P × Q)</span>
              <span className="text-sm font-bold text-emerald-600">₱{itemSubtotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectProduct(product)}
              className="flex-1 py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" /> Details
            </button>
            <button
              disabled={product.quantity === 0}
              onClick={() => addToCart(product, 1)}
              className={`py-2 px-4 text-xs font-semibold rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                product.quantity === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-rose-400 hover:bg-rose-500 text-white shadow-2xs active:scale-95"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {product.quantity === 0 ? "Out of Stock" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
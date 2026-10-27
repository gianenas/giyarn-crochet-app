import React from 'react';
import { Heart, Layers, AlertTriangle, Calculator } from 'lucide-react';

export default function InventorySummary({ products, totalStockUnits, overallTotalInventoryValue }) {
  return (
    <div className="bg-gradient-to-r from-rose-100/80 via-pink-100/60 to-emerald-100/70 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xs relative overflow-hidden">
      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-rose-600 uppercase tracking-wider mb-3 border border-rose-100">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> Product & Inventory Management
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-950">
          Giyarn Crochet Inventory Overview
        </h2>
        <p className="mt-2 text-sm text-amber-900/80 leading-relaxed">
          Track stock levels, monitor low inventory alerts, and maintain full transparency over product subtotals and overall inventory total valuation.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-rose-200/60 pt-6">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-rose-100">
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Total Products
          </div>
          <p className="text-2xl font-extrabold text-amber-950 mt-1">{products.length} Items</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-rose-100">
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Low Stock Warning
          </div>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">
            {products.filter(p => p.quantity < 5).length} Items
          </p>
        </div>

        <div className="bg-emerald-50/90 backdrop-blur-sm p-4 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-emerald-600" /> Total Inventory Value
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-1">
            ₱{overallTotalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
}

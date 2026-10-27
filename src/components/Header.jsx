import React from 'react';
import { Sparkles, Plus, ShoppingBasket } from 'lucide-react';

export default function Header({ products, totalStockUnits, overallTotalInventoryValue, setIsAddModalOpen, setIsCartOpen, cart }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-300 via-pink-200 to-emerald-200 flex items-center justify-center shadow-inner border border-white">
            <Sparkles className="w-6 h-6 text-rose-600 animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 via-pink-500 to-emerald-600 bg-clip-text text-transparent font-serif">
              Giyarn
            </h1>
            <p className="text-xs font-medium text-rose-400 -mt-1 tracking-wider uppercase">Handcrafted Crochet Shop</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-4 bg-rose-50/90 border border-rose-200/80 px-4 py-2 rounded-2xl text-xs font-medium text-rose-900 shadow-2xs">
            <div>
              <span className="text-rose-500 block text-[10px] uppercase font-bold">Total Products</span>
              <span className="text-sm font-bold text-amber-950">{products.length} Items ({totalStockUnits} pcs)</span>
            </div>
            <div className="h-6 w-[1px] bg-rose-200" />
            <div>
              <span className="text-emerald-600 block text-[10px] uppercase font-bold">Total Inventory Value</span>
              <span className="text-sm font-extrabold text-emerald-700">
                ₱{overallTotalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-semibold px-4 py-2.5 rounded-2xl shadow-md transition-all text-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-white border border-rose-200 hover:bg-rose-50 rounded-2xl text-rose-600 transition-colors shadow-xs cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <ShoppingBasket className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                {cart.reduce((a, c) => a + c.cartQuantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
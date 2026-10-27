import React from 'react';
import { ShoppingBasket, X, ShoppingBag, Trash2 } from 'lucide-react';

export default function CartDrawer({ isCartOpen, setIsCartOpen, cart, updateCartQty, setCart, cartTotal }) {
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-rose-100 flex flex-col justify-between">
          <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-bold font-serif text-amber-950">Shopping Cart</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="text-rose-400 hover:text-rose-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-rose-200 mx-auto mb-2" />
                <p className="text-sm font-semibold text-amber-900">Your cart is empty</p>
                <p className="text-xs text-amber-800/60 mt-1">Add items from the product list!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-rose-50/30 rounded-2xl border border-rose-100 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-amber-950 truncate">{item.name}</h4>
                    <p className="text-[10px] text-rose-500 font-bold mt-0.5">₱{item.price.toLocaleString()} each</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        className="w-5 h-5 rounded bg-white border border-rose-200 text-xs font-bold flex items-center justify-center text-rose-600 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold">{item.cartQuantity}</span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className="w-5 h-5 rounded bg-white border border-rose-200 text-xs font-bold flex items-center justify-center text-rose-600 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-extrabold text-emerald-600">
                      ₱{(item.price * item.cartQuantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => setCart(cart.filter(c => c.id !== item.id))}
                      className="text-rose-400 hover:text-rose-600 mt-2 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-rose-100 bg-rose-50/50 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-amber-900">Cart Total Amount:</span>
              <span className="text-xl font-extrabold text-emerald-600">
                ₱{cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={() => {
                alert("Thank you for ordering at Giyarn!");
                setCart([]);
                setIsCartOpen(false);
              }}
              className={`w-full py-3 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer ${
                cart.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white active:scale-98"
              }`}
            >
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
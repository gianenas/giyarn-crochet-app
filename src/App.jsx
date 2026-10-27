import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Plus, Tag, Package, Layers, LayoutGrid, List, AlertTriangle, Eye, X, PlusCircle, MinusCircle, CheckCircle2, Trash2, IndianRupee, Search
} from 'lucide-react';
import { INITIAL_PRODUCTS } from './data/products';
import Header from './components/Header';
import InventorySummary from './components/InventorySummary';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import AddProductModal from './components/AddProductModal';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [detailModalQty, setDetailModalQty] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    category: "Bouquets",
    price: "",
    quantity: "",
    rating: "5.0",
    specs: "",
    description: "",
    image: ""
  });
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const categories = ["All", "Bouquets", "Single Stems", "Accessories"];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const overallTotalInventoryValue = useMemo(() => {
    return products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [products]);

  const totalStockUnits = useMemo(() => {
    return products.reduce((acc, item) => acc + Number(item.quantity), 0);
  }, [products]);

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
  }, [cart]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    setFormError("");

    if (
      !formData.image.trim() ||
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.specs.trim() ||
      !formData.rating ||
      !formData.price ||
      !formData.quantity
    ) {
      setFormError("⚠️ Please fill in all required fields before submitting!");
      return;
    }

    const priceNum = parseFloat(formData.price);
    const qtyNum = parseInt(formData.quantity, 10);
    const ratingNum = parseFloat(formData.rating);

    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError("Price must be a valid positive number.");
      return;
    }
    if (isNaN(qtyNum) || qtyNum < 0) {
      setFormError("Quantity must be a non-negative integer.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price: priceNum,
      quantity: qtyNum,
      rating: ratingNum || 5.0,
      specs: formData.specs.trim(),
      description: formData.description.trim(),
      image: formData.image.trim()
    };

    setProducts([newProduct, ...products]);
    setFormData({
      name: "",
      category: "Bouquets",
      price: "",
      quantity: "",
      rating: "5.0",
      specs: "",
      description: "",
      image: ""
    });
    setIsAddModalOpen(false);
    setSuccessMsg(`"${newProduct.name}" added! Total Inventory Value automatically updated.`);
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  const addToCart = (product, qtyToAdd = 1) => {
    if (product.quantity <= 0) return;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        const newQty = Math.min(product.quantity, existing.cartQuantity + qtyToAdd);
        return prevCart.map(item => 
          item.id === product.id ? { ...item, cartQuantity: newQty } : item
        );
      } else {
        return [...prevCart, { ...product, cartQuantity: Math.min(product.quantity, qtyToAdd) }];
      }
    });
  };

  const updateCartQty = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const productInStock = products.find(p => p.id === id);
          const maxStock = productInStock ? productInStock.quantity : item.quantity;
          const nextQty = item.cartQuantity + delta;
          if (nextQty <= 0) return null;
          return { ...item, cartQuantity: Math.min(maxStock, nextQty) };
        }
        return item;
      }).filter(Boolean);
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-amber-950 font-sans selection:bg-rose-200">
      <Header
        products={products}
        totalStockUnits={totalStockUnits}
        overallTotalInventoryValue={overallTotalInventoryValue}
        setIsAddModalOpen={setIsAddModalOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center justify-between shadow-xs animate-bounce">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              {successMsg}
            </div>
            <button onClick={() => setSuccessMsg("")} className="text-emerald-500 hover:text-emerald-700 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <InventorySummary
          products={products}
          totalStockUnits={totalStockUnits}
          overallTotalInventoryValue={overallTotalInventoryValue}
        />

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-rose-400 text-white shadow-xs scale-105"
                    : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400" />
            <input
              type="text"
              placeholder="Search crochet bouquet items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 text-amber-950 placeholder-rose-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={(p) => { setSelectedProduct(p); setDetailModalQty(1); }}
              addToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-rose-100">
            <Package className="w-12 h-12 text-rose-200 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-amber-950">No products match your search</h3>
            <p className="text-xs text-amber-800/60 mt-1">Try resetting your filter or searching for another keyword.</p>
          </div>
        )}
      </main>

      <ProductDetailModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        detailModalQty={detailModalQty}
        setDetailModalQty={setDetailModalQty}
        addToCart={addToCart}
      />

      <AddProductModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        formData={formData}
        setFormData={setFormData}
        formError={formError}
        handleAddProduct={handleAddProduct}
      />

      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        updateCartQty={updateCartQty}
        setCart={setCart}
        cartTotal={cartTotal}
      />
    </div>
  );
}
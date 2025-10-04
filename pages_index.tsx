import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, Phone, Mail, Instagram, Shield, Droplet, Sparkles } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  scent: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "PRICKLEYS Handwash",
    scent: "Lemon",
    image: "https://1drv.ms/i/c/0da266427cb7fa47/EWXwYOMZgRdBlxihws4kV6QBgl3vKXUmF2mVnBMURaVPwg?e=t7b5at",
    originalPrice: 300,
    discountedPrice: 240,
    discount: 20
  },
  {
    id: 2,
    name: "PRICKLEYS Handwash",
    scent: "Lavender",
    image: "https://1drv.ms/i/c/0da266427cb7fa47/ETg3n7BoB_BAj4qmXpEi-woBtKNUUYAIxKNLZD5FYmPKYQ?e=V1m9t4",
    originalPrice: 300,
    discountedPrice: 240,
    discount: 20
  },
  {
    id: 3,
    name: "PRICKLEYS Handwash",
    scent: "Red Fruit",
    image: "https://1drv.ms/i/c/0da266427cb7fa47/Ee936st2nn5AvtcQTQKtuisB9ib4zaMe3dvscC7Vm5ME1g?e=zbk3CI",
    originalPrice: 300,
    discountedPrice: 240,
    discount: 20
  }
];

export default function PrickleysStore() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('prickleys-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('prickleys-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderDetails = {
      customer: customerInfo,
      items: cart.map(item => ({
        product: `${item.name} - ${item.scent}`,
        quantity: item.quantity,
        price: item.discountedPrice,
        subtotal: item.discountedPrice * item.quantity
      })),
      total: getTotalPrice(),
      orderDate: new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })
    };

    console.log('Order submitted to prickleysofficial254@gmail.com:', orderDetails);
    
    setOrderSubmitted(true);
    setCart([]);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setOrderSubmitted(false);
      setCustomerInfo({ name: '', email: '', phone: '', address: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PRICKLEYS
              </div>
              <span className="text-sm text-gray-500">Premium Handwash</span>
            </div>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Clean Hands, Happy Life
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Premium handwash that kills 99.9% germs while keeping your hands soft and fragrant
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Kills 99.9% Germs</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Droplet className="w-4 h-4 text-blue-600" />
                <span>Contains Moisturizers</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Beautiful Fragrance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={`${product.scent} Handwash`}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.className = 'bg-gray-200 border-2 border-dashed rounded-xl w-full h-64';
                  }}
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.scent} Scented
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Premium quality handwash with {product.scent.toLowerCase()} fragrance
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400 line-through">KSh {product.originalPrice}</span>
                  <span className="text-2xl font-bold text-blue-600">KSh {product.discountedPrice}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-8">
        <div className="bg-gray-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="tel:0710980632" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Phone size={20} />
              <span>0710980632</span>
            </a>
            <a href="mailto:prickleysofficial254@gmail.com" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Mail size={20} />
              <span>prickleysofficial254@gmail.com</span>
            </a>
            <a href="https://instagram.com/prickleys" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
              <Instagram size={20} />
              <span>@prickleys KE</span>
            </a>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-1">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                        <img 
                          src={item.image} 
                          alt={item.scent}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '';
                            e.currentTarget.className = 'bg-gray-200 border-2 border-dashed rounded-lg w-20 h-20';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.scent} Scented</h4>
                          <p className="text-gray-600">KSh {item.discountedPrice}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-xl">KSh {getTotalPrice()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-screen overflow-y-auto">
              {!orderSubmitted ? (
                <form onSubmit={handleSubmitOrder} className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Checkout</h2>
                    <button type="button" onClick={() => setIsCheckoutOpen(false)} className="p-1">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Delivery Address"
                      required
                      rows={3}
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-3">Order Summary</h3>
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between py-2 text-sm">
                        <span>{item.scent} x {item.quantity}</span>
                        <span>KSh {item.discountedPrice * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>KSh {getTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all"
                  >
                    Submit Order
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Your order will be sent to prickleysofficial254@gmail.com
                  </p>
                </form>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Order Submitted!</h3>
                  <p className="text-gray-600">Thank you for your order. We'll contact you shortly for delivery arrangements.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
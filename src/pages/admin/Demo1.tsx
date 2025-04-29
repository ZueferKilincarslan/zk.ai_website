import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Demo1: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'Premium Headphones',
      price: 199.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Wireless Speaker',
      price: 149.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=300&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Smart Watch',
      price: 299.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Helmet>
        <title>TechHub - Premium Electronics</title>
      </Helmet>

      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-blue-900">TechHub</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-blue-600 hover:text-blue-800 relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Premium Electronics</h2>
            <p className="text-xl text-blue-100">Discover the latest in tech innovation</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-600">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-blue-200">On orders over $50</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-blue-200">100% satisfaction guaranteed</p>
            </div>
            <div className="text-center">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-bold mb-2">Secure Checkout</h3>
              <p className="text-blue-200">Safe & easy payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2025 TechHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Demo1;
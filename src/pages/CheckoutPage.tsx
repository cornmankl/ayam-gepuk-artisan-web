import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircleIcon } from 'lucide-react';
type DeliveryMethod = 'delivery' | 'pickup';
type PaymentMethod = 'cash' | 'online-banking' | 'credit-card';
const CheckoutPage = () => {
  const {
    items,
    totalItems,
    totalPrice,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send the order to your backend here
    // Show success message
    setOrderPlaced(true);
    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 1000);
  };
  if (orderPlaced) {
    return <div className="bg-yellow-50 min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon size={40} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Order Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We've received your order and will begin
              processing it right away.
            </p>
            <p className="font-medium mb-8">
              {deliveryMethod === 'delivery' ? 'Your food will be delivered to your address soon.' : 'Your food will be ready for pickup shortly.'}
            </p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium" onClick={() => {
            navigate('/');
          }}>
              Return to Home
            </button>
          </div>
        </div>
      </div>;
  }
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  return <div className="bg-yellow-50 min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
          Checkout
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit}>
                {/* Delivery Method */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Delivery Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`border rounded-lg p-4 cursor-pointer ${deliveryMethod === 'delivery' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`} onClick={() => setDeliveryMethod('delivery')}>
                      <div className="flex items-center">
                        <input type="radio" name="deliveryMethod" checked={deliveryMethod === 'delivery'} onChange={() => setDeliveryMethod('delivery')} className="mr-2" />
                        <div>
                          <h3 className="font-medium">Delivery</h3>
                          <p className="text-sm text-gray-500">
                            Delivered to your address
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`border rounded-lg p-4 cursor-pointer ${deliveryMethod === 'pickup' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`} onClick={() => setDeliveryMethod('pickup')}>
                      <div className="flex items-center">
                        <input type="radio" name="deliveryMethod" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="mr-2" />
                        <div>
                          <h3 className="font-medium">Pickup</h3>
                          <p className="text-sm text-gray-500">
                            Pickup at our restaurant
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-gray-700 mb-1">
                        Email
                      </label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                  </div>
                </div>
                {/* Delivery Address (only if delivery is selected) */}
                {deliveryMethod === 'delivery' && <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                      Delivery Address
                    </h2>
                    <div>
                      <label htmlFor="address" className="block text-gray-700 mb-1">
                        Address *
                      </label>
                      <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" required={deliveryMethod === 'delivery'} />
                    </div>
                  </div>}
                {/* Order Notes */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Order Notes</h2>
                  <div>
                    <label htmlFor="notes" className="block text-gray-700 mb-1">
                      Special Instructions
                    </label>
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows={3} placeholder="Any special requests or instructions for your order" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                </div>
                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'cash' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`} onClick={() => setPaymentMethod('cash')}>
                      <div className="flex items-center">
                        <input type="radio" name="paymentMethod" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="mr-2" />
                        <div>
                          <h3 className="font-medium">
                            Cash on Delivery / Pickup
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'online-banking' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`} onClick={() => setPaymentMethod('online-banking')}>
                      <div className="flex items-center">
                        <input type="radio" name="paymentMethod" checked={paymentMethod === 'online-banking'} onChange={() => setPaymentMethod('online-banking')} className="mr-2" />
                        <div>
                          <h3 className="font-medium">Online Banking</h3>
                        </div>
                      </div>
                    </div>
                    <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'credit-card' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`} onClick={() => setPaymentMethod('credit-card')}>
                      <div className="flex items-center">
                        <input type="radio" name="paymentMethod" checked={paymentMethod === 'credit-card'} onChange={() => setPaymentMethod('credit-card')} className="mr-2" />
                        <div>
                          <h3 className="font-medium">Credit / Debit Card</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:hidden">
                  <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="max-h-64 overflow-y-auto mb-4">
                {items.map(item => <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 font-medium">
                        {item.quantity}
                      </span>
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                    <span className="font-medium">
                      RM {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>)}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">
                    RM {totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryMethod === 'delivery' ? 'RM 5.00' : 'RM 0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (6%)</span>
                  <span className="font-medium">
                    RM {(totalPrice * 0.06).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>
                      RM{' '}
                      {(totalPrice + (deliveryMethod === 'delivery' ? 5 : 0) + totalPrice * 0.06).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button type="submit" form="checkout-form" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium mt-6" onClick={handleSubmit}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default CheckoutPage;
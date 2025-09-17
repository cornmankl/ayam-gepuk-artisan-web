import { Link, useNavigate } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  if (items.length === 0) {
    return (
      <div className="bg-yellow-50 min-h-screen py-16 px-4">
        <div className="container mx-auto text-center max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon size={40} className="text-yellow-500" />
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/menu"
              className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-md font-medium"
            >
              Browse Our Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-yellow-50 min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
          Your Cart
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    Items ({totalItems})
                  </h2>
                  <button
                    className="text-red-600 hover:text-red-800 font-medium flex items-center"
                    onClick={clearCart}
                  >
                    <TrashIcon size={18} className="mr-1" />
                    Clear Cart
                  </button>
                </div>
                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="py-6 flex flex-col sm:flex-row"
                    >
                      <div className="sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:ml-6 flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="font-medium text-gray-900">
                            RM {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          RM {item.price.toFixed(2)} each
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              className="px-3 py-1 text-gray-500 hover:text-red-600"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <MinusIcon size={16} />
                            </button>
                            <span className="px-4 py-1 border-l border-r border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1 text-gray-500 hover:text-red-600"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <PlusIcon size={16} />
                            </button>
                          </div>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <TrashIcon size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    RM {totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">RM 5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (6%)</span>
                  <span className="font-medium">
                    RM {(totalPrice * 0.06).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>
                      RM {(totalPrice + 5 + totalPrice * 0.06).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium mt-6"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
              <Link
                to="/menu"
                className="block text-center text-red-600 hover:text-red-800 font-medium mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;

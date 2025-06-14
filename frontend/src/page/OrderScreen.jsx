import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderScreen = () => {
  const { cartItems, itemPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state) => state.cart);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-gray-500">
        <h1 className="text-4xl font-bold text-error mb-4 animate-pulse">No Order Found ❌</h1>
        <Link to="/" className="btn btn-info">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6 flex justify-center items-center">
      <div className="bg-white/50 backdrop-blur-md border border-white/20 shadow-2xl w-full max-w-5xl rounded-2xl p-8 animate-slideUp">
        <h1 className="text-4xl font-extrabold text-center text-info mb-10 animate-glow">📦 Your Order</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-xl font-bold mb-4">Items</h2>
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>{item.qty} × ₹{item.price} = ₹{item.qty * item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow p-5 h-fit">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="space-y-2">
              <p>Items: ₹{itemPrice.toFixed(2)}</p>
              <p>Shipping: ₹{shippingPrice.toFixed(2)}</p>
              <p>Tax: ₹{taxPrice.toFixed(2)}</p>
              <hr />
              <p className="text-lg font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
            </div>

            <Link to="/" className="btn btn-success mt-6 w-full">Continue Shopping</Link>

            {/* Delivery Message at the Bottom */}
            <div className="bg-green-100 text-green-800 text-center text-base font-medium py-3 px-4 rounded-xl mt-6 animate-fadeIn bounce-slow shadow border border-green-300">
              🚚 Your product will be delivered in <span className="font-semibold">7 days</span>!
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 0.8s ease-out;
          }

          @keyframes glow {
            0%, 100% {
              text-shadow: 0 0 10px #22d3ee, 0 0 20px #3b82f6;
            }
            50% {
              text-shadow: 0 0 20px #06b6d4, 0 0 30px #2563eb;
            }
          }
          .animate-glow {
            animation: glow 2s infinite;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }

          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .bounce-slow {
            animation: bounceSlow 3s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default OrderScreen;

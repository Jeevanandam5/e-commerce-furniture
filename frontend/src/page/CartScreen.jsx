import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slice/cartSlice";
import { MdDelete } from "react-icons/md";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { 
    cartItems = [], 
    itemPrice = 0, 
    shippingPrice = 0, 
    taxPrice = 0, 
    totalPrice = 0 
  } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);

  // Convert all prices to numbers to ensure toFixed() works
  const numericItemPrice = Number(itemPrice);
  const numericShippingPrice = Number(shippingPrice);
  const numericTaxPrice = Number(taxPrice);
  const numericTotalPrice = Number(totalPrice);

  const isEmptyCart = cartItems.length === 0;

  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    if (!userInfo) {
      navigate("/login?redirect=/shipping");
    } else {
      navigate("/shipping");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-center text-info">Your Cart</h1>

      {isEmptyCart ? (
        <div className="text-center text-gray-500">
          <h2>Your cart is Empty ❌</h2>
          <Link to="/" className="btn btn-info mt-4">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto grid gap-6">
          <div className="space-y-4 mb-7">
            {cartItems.map((item) => (
              <div 
                key={item._id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white bg-opacity-60 backdrop-blur-md p-4 rounded-lg shadow-md hover:scale-[1.02] transition-all duration-300"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded-md" />
                <div className="flex-1 w-full sm:text-left text-center">
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-500">Price: ₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="select select-bordered w-16"
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button 
                    className="btn btn-outline btn-error btn-sm" 
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="container">
            <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-lg p-6 shadow-md h-fit transition-all animate-slideUp">
              <h2 className="text-xl font-bold mb-4 text-info">Order Summary</h2>
              <p className="mb-2">
                Total Items: <strong>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</strong>
              </p>
              <p className="mb-2">
                Items Price: <strong>₹{numericItemPrice.toFixed(2)}</strong>
              </p>
              <p className="mb-2">
                Shipping: <strong>₹{numericShippingPrice.toFixed(2)}</strong>
              </p>
              <p className="mb-2">
                Tax: <strong>₹{numericTaxPrice.toFixed(2)}</strong>
              </p>
              <p className="mb-4 text-lg font-bold">
                Total: <strong>₹{numericTotalPrice.toFixed(2)}</strong>
              </p>
              <button 
                className="btn btn-info w-full" 
                onClick={checkOutHandler} 
                disabled={isEmptyCart}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
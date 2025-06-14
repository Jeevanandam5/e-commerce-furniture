import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetproductDetailsQuery } from "../slice/productsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToCart } from "../slice/cartSlice";
import { toast } from "react-toastify";

const ProductScreen = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetproductDetailsQuery(id);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    if (!userInfo) {
      toast.error("Please login to add items to cart");
      return;
    }
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added to cart");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-50"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>

      <div className="relative z-10 container mx-auto p-6">
        <Link to="/" className="btn btn-neutral mb-6">
          ← Back
        </Link>

        <div className="grid md:grid-cols-2 gap-10 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-3xl font-bold ">{product.name}</h1>
            <p className="mt-2 text-gray-800">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold">₹{product.price}</p>
            <div className="mt-4 flex flex-col items-center md:items-start">
              <Rating value={product.rating} text={`${product.numReviews}`} />
            </div>

            <div>
              {product.countInStock > 0 ? (
                <div>
                  <p className="mt-2 text-success font-medium">In Stock ✅</p>
                  <div className="mt-4">
                    <h3 className="lable">
                      <span className="font-semibold">Quantity</span>
                    </h3>
                    <select
                      className="bg-transparent fieldset-legend select select-bordered w-full max-w-xs"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((item) => (
                        <option key={item + 1} value={item + 1}>
                          {item + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={addToCartHandler}
                    className="btn btn-secondary w-full mt-4"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-error font-semibold">Out of Stock ❌</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
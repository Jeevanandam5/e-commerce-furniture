import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Link to={`product/${product._id}`}>
            <div className="card w-full sm:w-80 md:w-100 bg-base-100 shadow-md mx-auto hover:shadow-xl transition-shadow duration-300 mb-10">
                <figure className="p-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-lg h-90 object-contain transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-sm"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="text-lg md:text-xl font-extrabold tracking-wide">{product.name}</h2>
                    <p className="line-clamp-2 text-gray-500">{product.description}</p>
                    <div>
                        <Rating value={product.rating} text={product.numReviews} />
                    </div>
                    <h3 className="card-actions mt-3">
                        <button className="btn btn-dash btn-info w-full">{product.price}</button>
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default Product;

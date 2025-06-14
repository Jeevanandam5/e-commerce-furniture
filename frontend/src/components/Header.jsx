import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slice/userApiSlice";
import { logout } from "../slice/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { cartItems = [] } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item?.qty || 0) * (item?.price || 0),
    0
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar container mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            ECOM
          </Link>
        </div>

        <div className="flex items-center gap-8">
          {/* Cart Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartItems.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">
                  {cartItems.length} Items
                </span>
                <span className="text-info">
                  Subtotal: ₹{subtotal.toFixed(0)}
                </span>
                <div className="card-actions">
                  <Link 
                    to="/cart" 
                    className="btn btn-info btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/cart');
                    }}
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Dropdown */}
          {userInfo ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow z-10 p-2"
              >
                <li>
                  <a className="justify-between">{userInfo.name}</a>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li onClick={logoutHandler}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"} className="btn btn-info">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
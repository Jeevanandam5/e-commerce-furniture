import { useState , useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch ,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slice/userApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from "../slice/authSlice";
import { useLocation } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const [loginApiCall, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect])


  const submitHandler = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Please fill in all fields');
    } else {
      try {
        const res = await loginApiCall({ email, password }).unwrap();

        dispatch(setCredentials({ ...res }));

        navigate('/');
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-100 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-xl p-8 border border-base-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-info">Welcome Back </h2>

        <form className="space-y-5" onSubmit={submitHandler}>
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with show/hide */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="Enter password"
                value={password} // ← must be `password` string
                onChange={(e) => setPassword(e.target.value)} // ← set function here
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-xl text-gray-500 hover:text-primary"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-info w-full mt-2">
            Sign In
          </button>
          
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="link link-info font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen
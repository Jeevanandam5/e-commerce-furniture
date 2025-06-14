import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slice/userApiSlice";
import { setCredentials } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const { userInfo } = useSelector((state) => state.auth);

  const [registerApiCall, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await registerApiCall({ name, email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      toast.success("Registered Successfully ");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-info">Register </h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-3 text-xl text-gray-500 hover:text-info"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          </div>
          <div className="relative">
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-3 text-xl text-gray-500 hover:text-info"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          </div>
          <button type="submit" className="btn btn-info w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="link link-info">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;

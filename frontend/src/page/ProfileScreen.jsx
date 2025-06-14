import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery, useUpdateProfileMutation } from "../slice/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [profile]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/")
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-300/40 to-blue-100/40 backdrop-blur-lg px-4 relative">

      <Link to="/"
        className="absolute top-6 left-6 mx-auto btn btn-sm btn-outline btn-neutral mb-6 z-10"
      >
        ← Back
      </Link>

      <div className="w-full max-w-lg bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/30 animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 drop-shadow-md mb-6">
          Update Profile
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="New Password (Optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-info w-full text-white tracking-wide"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Tailwind animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
};


export default ProfileScreen;

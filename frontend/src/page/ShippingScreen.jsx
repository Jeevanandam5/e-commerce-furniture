
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShippingScreen = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!address || !city || !postalCode || !country) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Shipping Info Saved ");
    navigate("/payment"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100/70 to-indigo-200/70 px-4">
      <div className="relative w-full max-w-2xl p-8 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
        {/* Back Button */}
        <button
          className="absolute top-4 left-4 btn btn-sm btn-outline btn-info"
          onClick={() => navigate("/cart")}>
          ← Back
        </button>

        <h2 className="text-4xl font-extrabold text-center text-info-700 drop-shadow mb-8">
          Shipping Details
        </h2>

        <form className="space-y-6" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Address"
            className="input input-bordered w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="input input-bordered w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pin Code"
            className="input input-bordered w-full"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            className="input input-bordered  w-full"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit" className="btn btn-info w-full text-white shadow-md hover:scale-[1.03] transition">
            Continue to Payment
          </button>
        </form>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 0.7s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default ShippingScreen;

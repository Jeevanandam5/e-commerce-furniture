import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            toast.error("Please select a payment method");
            return;
        }

        toast.success("Payment method selected");
        navigate("/order");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-purple-200 px-4">
            <div className="w-full max-w-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 animate-fadeIn">
                {/* Animated Header */}
                <h2 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 mb-10">
                    Payment
                </h2>

                <form onSubmit={submitHandler} className="space-y-6">
                    {/* <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text font-semibold text-lg">Online Pay</span>
                            <input
                                type="radio"
                                name="paymentMethod"
                                className="radio checked:bg-blue-500"
                                value="PayPal"
                                checked={paymentMethod === "PayPal"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text font-semibold text-lg">Pay To Card</span>
                            <input
                                type="radio"
                                name="paymentMethod"
                                className="radio checked:bg-purple-500"
                                value="Stripe"
                                checked={paymentMethod === "Stripe"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </label>
                    </div> */}

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text font-semibold text-lg">Cash on Delivery</span>
                            <input
                                type="radio"
                                name="paymentMethod"
                                className="radio checked:bg-green-500"
                                value="COD"
                                checked={paymentMethod === "COD"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </label>
                    </div>

                    <button type="submit" className="btn btn-info w-full shadow-md hover:scale-105 transition-all">
                        Continue
                    </button>
                </form>
            </div>

            {/* Animations */}
            <style>
                {`
          @keyframes glow {
            0% { text-shadow: 0 0 5px #c084fc, 0 0 10px #c084fc, 0 0 15px #7c3aed; }
            50% { text-shadow: 0 0 10px #c084fc, 0 0 20px #9333ea, 0 0 25px #6d28d9; }
            100% { text-shadow: 0 0 5px #c084fc, 0 0 10px #c084fc, 0 0 15px #7c3aed; }
          }
          .animate-glow {
            animation: glow 1.8s infinite alternate ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }
        `}
            </style>
        </div>
    );
};

export default PaymentScreen;

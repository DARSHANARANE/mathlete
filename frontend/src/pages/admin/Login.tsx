import React, { useState, useEffect } from "react";
import {
  FaUserShield,
  FaUser,
  FaLock,
  FaSignInAlt,
  FaArrowLeft,
  FaShieldAlt,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../../graphql/mutations";

// ✅ Types for Apollo
type LoginResponse = {
  login: {
    token: string;
    user: {
      name: string;
      email: string;
    };
  };
};

type LoginVariables = {
  email: string;
  password: string;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"default" | "success" | "error">(
    "default"
  );

  // ✅ Prevent flickering
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [login, { loading }] = useMutation<LoginResponse, LoginVariables>(
    LOGIN
  );
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // ✅ Redirect without flicker
      window.location.replace("/admin/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      if (!data) {
        throw new Error("No response from server");
      }

      // ✅ Save token
      localStorage.setItem("token", data.login.token);

      setStatus("success");
      toast.success("Login successful 🚀");

      setTimeout(() => {
        window.location.replace("/admin/dashboard");
      }, 1000);
    } catch (err: any) {
      setStatus("error");
      toast.error(err.message || "Login failed");

      setTimeout(() => {
        setStatus("default");
      }, 2000);
    }
  };

  const getButtonStyle = () => {
    if (status === "success") return "bg-green-500";
    if (status === "error") return "bg-red-500";
    return "bg-blue-600 hover:bg-blue-700";
  };

  const getButtonContent = () => {
    if (loading)
      return (
        <>
          <FaSpinner className="animate-spin" /> Authenticating...
        </>
      );

    if (status === "success")
      return (
        <>
          <FaCheck /> Success!
        </>
      );

    if (status === "error")
      return (
        <>
          <FaTimes /> Invalid Credentials
        </>
      );

    return (
      <>
        <FaSignInAlt /> Login
      </>
    );
  };

  // ✅ Show loader while checking token
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-2 text-blue-600 text-lg font-medium">
          <FaSpinner className="animate-spin" />
          Checking authentication...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <FaUserShield className="text-5xl text-blue-600 mx-auto mb-3" />
          <h1 className="text-2xl text-black font-bold ">Admin Login</h1>
          <p className="text-gray-500 text-sm">Access the Admin Panel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium mb-1 text-black">
              <FaUser /> Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mathlete.com"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium mb-1 text-black">
              <FaLock /> Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-400 outline-none text-black"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 text-white py-2 rounded-lg transition ${getButtonStyle()}`}
          >
            {getButtonContent()}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
          <button
            onClick={() => window.location.replace("/")}
            className="flex items-center gap-2 mx-auto hover:text-blue-600"
          >
            <FaArrowLeft /> Back to Student Portal
          </button>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p className="flex items-center justify-center gap-1 mb-1">
            <FaShieldAlt /> Secure Admin Access
          </p>

          <p>All login attempts are monitored</p>
        </div>
      </div>
    </div>
  );
}
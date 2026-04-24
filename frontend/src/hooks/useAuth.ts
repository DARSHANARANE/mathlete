import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove token
    localStorage.removeItem("token");

    // Optional: clear everything
    // localStorage.clear();

    // Redirect to login
    navigate("/admin/login", { replace: true });
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return {
    logout,
    isAuthenticated,
  };
};

export default useAuth;
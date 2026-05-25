import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../../frontend/src/components/common/homepage/ThemeContext";
import { useEffect } from "react";

function App() {
    useEffect(() => {
    fetch("https://mathlete-backend.onrender.com")
      .then(() => console.log("Backend awakened"))
      .catch((err) => console.log("Wake-up failed", err));
  }, []);
  return (
    <ThemeProvider>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        
        <Toaster position="top-center" />
        
        <AppRoutes />

      </div>
    </ThemeProvider>
  );
}

export default App;



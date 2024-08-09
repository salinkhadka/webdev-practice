// components/Main.tsx
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./main.css"; // Import the CSS file

function Main() {
  return (
    <div className="main-container">
      <div className="navbar-main">
        <Navbar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
  
export default Main;

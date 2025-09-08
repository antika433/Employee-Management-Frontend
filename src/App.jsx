import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <Router>
      <div className="mainn">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="logo">Employee Management</Link>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


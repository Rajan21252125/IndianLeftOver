import React from "react";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Setting from "./pages/Settings";
import Footer from "./component/Footer";
import FoodRecipe from "./pages/FoodRecipe";
import Recommend from "./pages/Recommend";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./constant/ThemeContext"; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <div className="container main">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/settings" element={<Setting />} />
            <Route exact path="/recipes1" element={<FoodRecipe />} />
            <Route exact path="/recommend" element={<Recommend />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../src/Components/Nabvar";
import Home from "./Views/Home";
import Category from "./Components/Category";
import Detalle from "./Views/Detalle";
import Search from "./Views/Search";
import { useState } from "react";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim().length > 0) {
      setSearchTerm(searchTerm);
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <>
      <Navbar handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} searchTerm={searchTerm} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Categoria/:tipo" element={<Category />} />
        <Route path="/Detalle/:id" element={<Detalle />} />
        <Route path="/Search/" element={<Search searchTerm={searchTerm} />} />
      </Routes>
    </>
  );
}

export default App;
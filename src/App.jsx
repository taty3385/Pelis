

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Nabvar.jsx";
import Home from "./Views/Home.jsx";
import Category from "./Components/Category.jsx";
import Detalle from "./Views/Detalle.jsx";
import Search from "./Views/Search.jsx";

import { FavoritosProvider } from "./Context/favoritos.jsx";
import React from "react";


function App() {
  return (
    <FavoritosProvider>
      <Router>
        <AppContent />
      </Router>
    </FavoritosProvider>
  );
}

function AppContent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

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
      <Navbar
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm}
      />
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
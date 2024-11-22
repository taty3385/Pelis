import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../src/Components/Nabvar";
import Home from "./Views/Home";
import Category from "./Components/Category";
import Detalle from "./Views/Detalle";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Categoria/:tipo" element={<Category />} />
        <Route path="/Detalle/:id" element={<Detalle />} />
      </Routes>
    </Router>
  );
}

export default App;

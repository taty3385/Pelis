
import  { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  const agregarFavorito = (pelicula) => {
    setFavoritos((prev) => {
      if (prev.find((f) => f.id === pelicula.id)) return prev;
      return [...prev, pelicula];
    });
  };

  const eliminarFavorito = (id) => {
    setFavoritos((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, agregarFavorito, eliminarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}

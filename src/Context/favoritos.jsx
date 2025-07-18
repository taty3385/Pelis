
import  { createContext, useContext, useState, useEffect } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const [inicializado, setInicializado] = useState(false);

  // Cargar favoritos desde localStorage al montar el componente
  useEffect(() => {
    try {
      const favoritosGuardados = localStorage.getItem('favoritos');
      if (favoritosGuardados) {
        const favoritosParsed = JSON.parse(favoritosGuardados);
        setFavoritos(favoritosParsed);
        console.log('Favoritos cargados desde localStorage:', favoritosParsed);
      } else {
        console.log('No hay favoritos guardados en localStorage');
      }
    } catch (error) {
      console.error('Error al cargar favoritos desde localStorage:', error);
    } finally {
      setInicializado(true);
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambie el estado (solo después de la carga inicial)
  useEffect(() => {
    if (inicializado) {
      try {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        console.log('Favoritos guardados en localStorage:', favoritos);
      } catch (error) {
        console.error('Error al guardar favoritos en localStorage:', error);
      }
    }
  }, [favoritos, inicializado]);

  const agregarFavorito = (pelicula) => {
    setFavoritos((prev) => {
      if (prev.find((f) => f.id === pelicula.id)) return prev;
      return [...prev, pelicula];
    });
  };

  const eliminarFavorito = (id) => {
    setFavoritos((prev) => prev.filter((f) => f.id !== id));
  };

  const esFavorito = (id) => {
    return favoritos.some((f) => f.id === id);
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, agregarFavorito, eliminarFavorito, esFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}

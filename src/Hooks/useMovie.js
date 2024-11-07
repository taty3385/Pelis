import axios from "axios";
import * as React from "react";
import { useState } from "react";

export default function useMovie() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`
    },
  };

  async function fetchData(category) {
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`; 
    try {
      const response = await axios.get(url, options);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error); 
    }
  }
  const handleImageLoad = () => {
    setLoading(false); // Marca las imágenes como cargadas
  };
  return {
    handleCloseNavMenu,
    anchorElNav,
    fetchData,
    movies,
    handleImageLoad,
    loading
  };
}

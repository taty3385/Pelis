import axios from "axios";
import * as React from "react";
import { useState } from "react";

export default function useMovie() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const apiKey = import.meta.env.VITE_API_KEY;
  const [page, setPage] = useState(1); 
  const [perPage] = useState(14); // Número de películas por página
  const [totalResults, setTotalResults] = useState(0);
 
  
  const [movieDetails, setMovieDetails] = useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`
    },
  };
  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const fetchData = async (category) => {
    const validPage = Math.min(Math.max(page, 1), 500);  
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${validPage}&per_page=${perPage}`;
  
    try {
      const response = await axios.get(url, options); 
      setMovies(response.data.results);  // 
      setTotalResults(response.data.total_pages);  
    } catch (error) {
      console.error("Error fetching data:", error);  
    }
  };
  

  const getId = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=es-ES`;
    try {
      const response = await axios.get(url, options);
      setMovieDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleImageLoad = () => {
    setLoading(false);
  };

  const getCategoryTitle = (tipo) => {
    switch (tipo) {
      case 'popular':
        return  "Populares";
      case 'top_rated':
        return 'Últimos Lanzamientos';
      default:
        return 'Categoría Desconocida';
    }
  };


  return {
    handleCloseNavMenu,
    anchorElNav,
    fetchData,
    movies,
    handleImageLoad,
    loading,
    perPage,
    page,
    handlePageChange,
    totalResults,
    getCategoryTitle,
    setPage,
   
    getId,
    movieDetails
  };
}

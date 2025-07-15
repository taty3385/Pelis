import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function useMovie() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_API_KEY;
  const [page, setPage] = useState(1);
  const [perPage] = useState(14);
  const [totalResults, setTotalResults] = useState(0);
  const [movieDetails, setMovieDetails] = useState(null);
  const [results, setResults] = useState([]);
  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchData = useCallback(async (category) => {
    const validPage = Math.min(Math.max(page, 1), 500);
    const url = `https://api.themoviedb.org/3/movie/${category}?language=es-Es&page=${validPage}&per_page=${perPage}`;

    try {
      const response = await axios.get(url, options);
      setMovies(response.data.results);
      setTotalResults(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  const getId = useCallback(async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=es-ES`;
    try {
      const response = await axios.get(url, options);
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  const handleImageLoad = () => {
    setLoading(false);
  };

  const getCategoryTitle = (tipo) => {
    switch (tipo) {
      case "popular":
        return "Populares";
      case "top_rated":
        return "Últimos Lanzamientos";
      default:
        return "Categoría Desconocida";
    }
  };

  const handleCardClick = (id) => {
    navigate(`/Detalle/${id}`);
  };

  const fetchResults = async (buscar) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${buscar}&include_adult=false&language=en-Es&page=1`;
    try {
      const response = await axios.get(url, options);
      if (!response) {
        throw new Error("Network response was not ok");
      } else {
        const data = response.data;
        setResults(data.results);
      }
    } catch (error) {
      console.error("Error fetching the search results:", error);
    }
  };

  const fetchVedeos = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    try {
      const response = await axios.get(url, options);
      const data = response.data;
      console.log("Videos:", data); // aquí ves los trailers en consola
      
      const youtubeTrailers = data.results.filter(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      setVideos(youtubeTrailers);
      return youtubeTrailers;
    } catch (error) {
      console.error("Error fetching the videos:", error);
      return [];
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
    handleCardClick,
    getId,
    movieDetails,
    fetchResults,
    results,
    fetchVedeos,
    videos,
  };
}

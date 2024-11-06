import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

export default function useMovie() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [movies, setMovies] = useState([]); 
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };

       const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2NmODY1MDIxODFhOGFjZjBjYjA5MDQ5ZDAxNTIwOCIsIm5iZiI6MTczMDgzODE0NS4zOTg4NTMzLCJzdWIiOiI2NjNjMGU0MGExYzdhZDdmOTEzMzhhMzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BqKloj_5fDq5v3m-oQco8kn6GyQ7IiGYe8wmY8zX-6Y'
        }
      };
      
      async function fetchData() {
        try {
          const response = await axios.get(url, options);
       
          setMovies(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error); // Muestra el error en caso de fallo
        }
      }
    
  return {
    handleCloseNavMenu,
    anchorElNav,
    fetchData,
    movies
    }
}

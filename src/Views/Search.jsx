
import { useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";
import useMovie from "../Hooks/useMovie";
import MovieCard from "../Components/movieCard";

export default function Search({ searchTerm }) {
  const { results, fetchResults, handleCardClick } = useMovie();

  useEffect(() => {
    if (searchTerm) {
      fetchResults(searchTerm);
    }
  }, [searchTerm, fetchResults]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom component="h1" align="center">
        Resultados de búsqueda para: {searchTerm}
      </Typography>
      <Grid container spacing={2}>
        {results.length > 0 ? (
          results.map((result) => (
            <MovieCard key={result.id} movie={result} handleCardClick={handleCardClick} />
          ))
        ) : (
          <Box  width="100%" display="flex" justifyContent="center">
          <Typography variant="body1" align="center" >No se encontraron resultados.</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
}
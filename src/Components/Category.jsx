
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Pagination, Grid2 } from "@mui/material";
import useMovie from "../Hooks/useMovie";
import MovieCard from "./movieCard";

export default function Category() {
  const { tipo } = useParams();
  const {
    fetchData,
    movies,
    totalResults,
    page,
    setPage,
    handlePageChange,
    perPage,
    getCategoryTitle,
    handleCardClick,
  } = useMovie();

  const title = getCategoryTitle(tipo);

  useEffect(() => {
    setPage(1);
  }, [tipo, setPage]);

  useEffect(() => {
    fetchData(tipo, page, perPage);
  }, [tipo, page, perPage]);

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Typography sx={{ textAlign: "center" }} variant="h4" mb={2}>
        {title}
      </Typography>
      <Grid2 container spacing={3} justifyContent="center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} handleCardClick={handleCardClick} />
        ))}
      </Grid2>

      {totalResults > perPage && (
        <Pagination
          count={Math.ceil(totalResults / perPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ mt: 3 }}
        />
      )}
    </Box>
  );
}
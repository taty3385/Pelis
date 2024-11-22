import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Pagination,
  Grid2,
} from "@mui/material";

import useMovie from "../Hooks/useMovie";

export default function Category() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const {
    fetchData,
    movies,
    totalResults,
    page,
    setPage,
    handlePageChange,
    perPage,
    getCategoryTitle,
  } = useMovie();
  
  
  const title = getCategoryTitle(tipo);
  
  const handleCardClick = (id) => {
    navigate(`/Detalle/${id}`); 
  };
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
          <Grid2
            item
            xs={12}
            sm={6}
            md={4}
            key={movie.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", 
            }}
          > 
            <Card
              sx={{
                width: "19vw", 
                display: "flex",
                flexDirection: "column",
                height: "475px",
              }}
              onClick={()=> handleCardClick(movie.id)}
            >
              <CardMedia
                component="img"
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : "/default-image.jpg"
                }
                alt={`Póster de la película ${movie.title}`}
                sx={{
                  width: "19vw",
                  height: "400px", 
                  objectFit: "cover", 
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1, 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
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

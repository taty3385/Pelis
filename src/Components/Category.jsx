import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Pagination, Grid } from "@mui/material";
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
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
          fontWeight: "bold",
          mb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2 },
        }}
        variant="h4"
      >
        {title}
      </Typography>

      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          width: "100%",
          justifyContent: "center",
          px: { xs: 0, sm: 1, md: 2 },
          margin: 0,
          "& .MuiGrid-item": {
            paddingLeft: { xs: "4px", sm: "8px", md: "12px" },
            paddingTop: { xs: "4px", sm: "8px", md: "12px" },
          },
          // Breakpoint personalizado para 408px
          "@media (max-width: 408px)": {
            "& .MuiGrid-item": {
              paddingLeft: "8px",
              paddingTop: "8px",
            },
          },
        }}
      >
        {movies.map((movie) => (
          <Grid
            item
            key={movie.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2.4}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: { xs: 2, sm: 3, md: 4 },
              minHeight: { xs: "350px", sm: "300px", md: "350px", lg: "400px" },
            }}
          >
            <MovieCard movie={movie} handleCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>

      {totalResults > perPage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1, sm: 2 },
          }}
        >
          <Pagination
            count={Math.ceil(totalResults / perPage)}
            page={page}
            onChange={(event, value) => handlePageChange(value)}
            color="primary"
            size="medium"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#fff",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                minWidth: { xs: "28px", sm: "32px" },
                height: { xs: "28px", sm: "32px" },
                margin: { xs: "0 2px", sm: "0 4px" },
              },
              "& .Mui-selected": {
                color: "#fff",
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
              "& .MuiPaginationItem-ellipsis": {
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

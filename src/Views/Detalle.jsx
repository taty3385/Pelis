import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useMovie from "../Hooks/useMovie";

export default function Detalle() {
  const { getId, movieDetails } = useMovie();
  const { id } = useParams();
  console.log("ID de la película:", id);

  useEffect(() => {
    if (id) {
      getId(id);
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${
          movieDetails?.backdrop_path || "default-image.jpg"
        }')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Filtro oscuro encima de la imagen */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      {/* Contenido sobre la imagen */}
      <Box sx={{ position: "relative", zIndex: 1, padding: 2 }}>
        <Typography
          variant="h4"
          color="white"
          textAlign="center"
          sx={{ marginBottom: 5 }}
        >
          {movieDetails?.title || "Detalles de la Película"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          {/* Descripción de la película */}

          <Box sx={{ width: "30%", height: "500px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
              alt={movieDetails?.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box
            sx={{
              width: "60%",
              height: "100%",
              margin: "80px",
            }}
          >
            <Typography variant="body1" color="white">
              {movieDetails?.overview || "No hay descripción disponible."}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "15px",
              }}
            >
              {movieDetails?.genres?.length > 0 ? (
                movieDetails.genres.map((genre, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        marginRight: "8px",
                      }}
                    />
                    <Typography variant="body1" color="white">
                      {genre.name}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" color="white">
                  No hay géneros disponibles
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useMovie from "../Hooks/useMovie";
import TheatersIcon from "@mui/icons-material/Theaters";
import ModalComponent from "../Components/ModalComponent";

export default function Detalle() {
  const { getId, movieDetails, fetchVedeos ,videos,setVideos ,open,setOpen,selectedVideoKey,setSelectedVideoKey  } = useMovie();
  const { id } = useParams();
 

  // Cuando cambia el id, obtenemos los datos y los trailers
  useEffect(() => {
    if (id) {
      getId(id);
      fetchVedeos(id).then((data) => {
        setVideos(data);
        console.log("Videos:", data);
      });
    }
  }, [id]);

  // Abre el modal y guarda la key del trailer seleccionado
  const handleOpen = (key) => {
    if (key) {
      console.log("Video key:", key);
      setSelectedVideoKey(key);
      setOpen(true);
    } else {
      console.error("No video key provided");
    }
  };

  // Cierra el modal y limpia la key seleccionada
  const handleClose = () => {
    setOpen(false);
    setSelectedVideoKey(null);
  };

  const genreEmojis = {
    Drama: "🎭",
    Comedia: "😂",
    Acción: "🎬",
    Terror: "😱",
    "Ciencia ficción": "👽",
    Romance: "💑",
    Fantasía: "🐉",
    Western: "🤠",
    Misterio: "🕵️‍♂️",
    Musical: "🎸",
    Educativa: "🎓",
    Deportiva: "🏆",
    Animación: "🎨",
    Histórica: "🕰",
    Aventura: "🚀",
    Crimen: "🔫",
    Historia: "📚",
    Bélica: "💣",
    Familia: "👨‍👩‍👧‍👦",
    Suspense: "🤯",
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
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
      <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "flex-start" },
            gap: { xs: 3, md: 4 },
            alignItems: { xs: "center", md: "flex-start" },
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Imagen de la película - Aparece después en móvil, primero en desktop */}
          <Box
            sx={{
              width: { xs: "100%", sm: "80%", md: "40%" },
              maxWidth: { xs: "300px", sm: "400px", md: "none" },
              order: { xs: 2, md: 1 },
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              mt: { xs: 2, md: 6 },
              mr: { md: 3 },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: { xs: "400px", sm: "500px", md: "600px" },
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                border: "2px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
                alt={movieDetails?.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Box>

          {/* Información de la película - Aparece primero en móvil, después en desktop */}
          <Box
            sx={{
              width: { xs: "100%", md: "55%" },
              order: { xs: 1, md: 2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: { xs: "center", md: "flex-start" },
              mt: { xs: 2, md: 6 },
              ml: { md: 2 },
            }}
          >
            {/* Título y botón de trailer */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                justifyContent: { xs: "center", sm: "space-between" },
                width: "100%",
                mb: { xs: 2, sm: 3 },
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                variant="h4"
                color="white"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                  textAlign: { xs: "center", sm: "left" },
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                  lineHeight: 1.2,
                  mb: { xs: 1, sm: 0 },
                  flex: 1,
                }}
              >
                {movieDetails?.title || "Detalles de la Película"}
              </Typography>

              {/* Botón de trailer */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "flex-end" },
                }}
              >
                {videos && videos.length > 0 ? (
                  <Button
                    onClick={() => handleOpen(videos[0].key)}
                    sx={{
                      color: "white",
                      padding: { xs: "8px 16px", sm: "10px 20px" },
                      borderRadius: "8px",
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TheatersIcon
                      sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
                    />
                    <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
                  </Button>
                ) : (
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      textAlign: "center",
                    }}
                  >
                    No hay trailers disponibles
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Descripción */}
            <Typography
              variant="body1"
              color="white"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                lineHeight: 1.6,
                textAlign: { xs: "center", sm: "left" },
                textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                mb: { xs: 2, sm: 3 },
                maxWidth: "100%",
              }}
            >
              {movieDetails?.overview || "No hay descripción disponible."}
            </Typography>

            {/* Géneros */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                color="white"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  fontWeight: "bold",
                  mb: 1,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                Géneros:
              </Typography>
              {movieDetails?.genres?.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  {movieDetails.genres.map((genre, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        padding: "4px 12px",
                        margin: "2px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="white"
                        sx={{
                          fontSize: { xs: "0.8rem", sm: "0.9rem" },
                          fontWeight: 500,
                        }}
                      >
                        {genreEmojis[genre.name] || "🎬"} {genre.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                  }}
                >
                  No hay géneros disponibles
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Modal para el video */}
        <ModalComponent
          open={open}
          handleClose={handleClose}
          videoKey={selectedVideoKey}
        />
      </Box>
    </Box>
  );
}

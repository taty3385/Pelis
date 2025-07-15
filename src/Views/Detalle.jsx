// import  { useEffect, useState } from "react";
// import { Box, Button, Typography } from "@mui/material";
// import { useParams } from "react-router-dom";
// import useMovie from "../Hooks/useMovie";
// import TheatersIcon from "@mui/icons-material/Theaters";
// import ModalComponent from "../Components/ModalComponent";

// export default function Detalle() {
//   const { getId, movieDetails, fetchVedeos } = useMovie();
//   const { id } = useParams();
//   const [open, setOpen] = useState(false);
//   const [videos, setVideos] = useState(null);
//   console.log(videos);

//   const handleOpen = (key) => {
//     if (key) {
//       console.log("Video key:", key);

//       setVideos(key); // Guarda el key del video seleccionado
//       setOpen(true); // Abre el modal
//     } else {
//       console.error("No video key provided");
//     }
//   };
//   const handleClose = () => {
//     setOpen(false);
//     setVideos(null);
//   }; // Cierra el modal y resetea el video;

//   useEffect(() => {
//     if (id) {
//       console.log("Fetching data for ID:", id);
//       getId(id);
//       fetchVedeos(id);
//     }
//   }, []);

//   const genreEmojis = {
//     Drama: "🎭",
//     Comedia: "😂",
//     Acción: "🎬",
//     Terror: "😱",
//     "Ciencia ficción": "👽",
//     Romance: "💑",
//     Fantasía: "🐉",
//     Western: "🤠",
//     Misterio: "🕵️‍♂️",
//     Musical: "🎸",
//     Educativa: "🎓",
//     Deportiva: "🏆",
//     Animación: "🎨",
//     Histórica: "🕰",
//     Aventura: "🚀",
//     Crimen: "🔫",
//     Historia: "📚",
//     Bélica: "💣",
//     Familia: "👨‍👩‍👧‍👦",

//     Suspense: "🤯",
//   };

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//         backgroundImage: `url('https://image.tmdb.org/t/p/original/${
//           movieDetails?.backdrop_path || "default-image.jpg"
//         }')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Filtro oscuro encima de la imagen */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//         }}
//       />
//       {/* Contenido sobre la imagen */}
//       <Box sx={{ position: "relative", zIndex: 1, padding: 2 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 2,
//             alignItems: "flex-start",
//           }}
//         >
//           {/* Descripción de la película */}
//           <Box sx={{ width: "30%", height: "500px" }}>
//             <img
//               src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
//               alt={movieDetails?.title}
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             />
//           </Box>

//           <Box
//             sx={{
//               width: "60%",
//               height: "100%",
//               margin: "80px",
//             }}
//           >
//             {videos?.length > 0 ? (
              
//               videos.map((videoItem, index) => (
//                 <Button
//                   key={index}
//                   onClick={() => handleOpen(videoItem.key)}
//                   variant="contained"
//                   color="primary"
//                   sx={{ marginBottom: "8px" }}
//                 >
//                   <TheatersIcon />
//                   {videoItem.name}
//                 </Button>
//               ))
//             ) : (
//               <Typography>No hay trailers disponibles.</Typography>
//             )}

//             <Typography
//               variant="h4"
//               color="white"
//               textAlign="center"
//               paddingTop="5px"
//               sx={{ marginBottom: 5 }}
//             >
//               {movieDetails?.title || "Detalles de la Película"}
//             </Typography>
//             <Typography variant="body1" color="white">
//               {movieDetails?.overview || "No hay descripción disponible."}
//             </Typography>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginTop: "15px",
//               }}
//             >
//               {movieDetails?.genres?.length > 0 ? (
//                 movieDetails.genres.map((genre, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: "8px",
//                         height: "8px",
//                         borderRadius: "50%",

//                         marginRight: "8px",
//                       }}
//                     />
//                     <Typography variant="body1" color="white">
//                       {genreEmojis[genre.name] || ""} {genre.name}
//                     </Typography>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography variant="body1" color="white">
//                   No hay géneros disponibles
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//           {/* Modal para el video */}
//           <ModalComponent
//             open={open}
//             handleClose={handleClose}
//             videoKey={videos}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useMovie from "../Hooks/useMovie";
import TheatersIcon from "@mui/icons-material/Theaters";
import ModalComponent from "../Components/ModalComponent";

export default function Detalle() {
  const { getId, movieDetails, fetchVedeos } = useMovie();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState([]); // array de trailers
  const [selectedVideoKey, setSelectedVideoKey] = useState(null); // key seleccionada

  // Cuando cambia el id, obtenemos los datos y los trailers
  useEffect(() => {
    if (id) {
      getId(id);
      fetchVedeos(id).then((data) => {
        setVideos(data); // data debe ser un array de trailers
        console.log("Videos:", data); // aquí ves los trailers en consola
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
            {/* Botones para ver los trailers */}
          {videos && videos.length > 0 ? (
            videos.map((videoItem, index) => (
              <Button
                key={index}
                onClick={() => handleOpen(videoItem.key)}
                variant="contained"
                color="primary"
                sx={{ marginBottom: "8px" }}
              >
                <TheatersIcon />
              
              </Button>
            ))
          ) : (
            <Typography>No hay trailers disponibles.</Typography>
          )}
            <Typography
              variant="h4"
              color="white"
              textAlign="center"
              paddingTop="5px"
              sx={{ marginBottom: 5 }}
            >
              {movieDetails?.title || "Detalles de la Película"}
            </Typography>
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
                        marginRight: "8px",
                      }}
                    />
                    <Typography variant="body1" color="white">
                      {genreEmojis[genre.name] || ""} {genre.name}
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
          {/* Modal para el video */}
          <ModalComponent
            open={open}
            handleClose={handleClose}
            videoKey={selectedVideoKey}
          />
        </Box>
      </Box>
    </Box>
  );
}
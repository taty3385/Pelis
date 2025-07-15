
// import  { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Pagination, Grid2 } from "@mui/material";
// import useMovie from "../Hooks/useMovie";
// import MovieCard from "./movieCard";

// export default function Category() {
//   const { tipo } = useParams();
//   const {
//     fetchData,
//     movies,
//     totalResults,
//     page,
//     setPage,
//     handlePageChange,
//     perPage,
//     getCategoryTitle,
//     handleCardClick,
//   } = useMovie();

//   const title = getCategoryTitle(tipo);

//   useEffect(() => {
//     setPage(1);
//   }, [tipo, setPage]);

//   useEffect(() => {
//     fetchData(tipo, page, perPage);
//   }, [tipo, page, perPage]);

//   return (
//     <Box p={2} backgroundColor="yellow">
//       <Typography sx={{ textAlign: "center" }} variant="h4" mb={2}>
//         {title}
//       </Typography>
//       <Box/>

//       <Grid2 container spacing={2} sx={{ width: '100%', backgroundColor: "olive" , display: 'flex', justifyContent: 'center' }}>
//         {movies.map((movie) => (
//           <Grid2
//             key={movie.id}
//             xs={6}  // 2 por fila en móvil
//             sm={4}  // 3 por fila en tablet
//             md={3}  // 4 por fila en desktop
//             lg={2}  // 6 por fila en pantallas grandes
//             display="flex"
//           >
//             <MovieCard movie={movie} handleCardClick={handleCardClick} />
//           </Grid2>
//         ))}
//       </Grid2>

//       {totalResults > perPage && (
//         <Pagination
//           count={Math.ceil(totalResults / perPage)}
//           page={page}
//           onChange={(event, value) => handlePageChange(value)}
//           color="primary"
//           sx={{ mt: 3,
//             '& .MuiPaginationItem-root': {
//               color: '#fff',
//             },
//             '& .Mui-selected': {
//               color: '#fff',
//             },
//           }}
//         />
//       )}
//     </Box>
//   );
// }


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
    <Box p={2}>
      <Typography sx={{ textAlign: "center" }} variant="h4" mb={2}>
        {title}
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
        
          justifyContent: "center",
        }}
      >
        {movies.map((movie) => (
          <Grid
            item
            key={movie.id}
            xs={6}
            sm={4}
            md={3}
            lg={3}
            display="flex"
            justifyContent="center"
          >
            <MovieCard movie={movie} handleCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>

      {totalResults > perPage && (
        <Pagination
          count={Math.ceil(totalResults / perPage)}
          page={page}
          onChange={(event, value) => handlePageChange(value)}
          color="primary"
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            '& .MuiPaginationItem-root': {
              color: '#fff',
            },
            '& .Mui-selected': {
              color: '#fff',
            },
          }}
        />
      )}
    </Box>
  );
}

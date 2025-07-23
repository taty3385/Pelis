
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
    <Box sx={{ 
      padding: { xs: 2, sm: 3, md: 4 },
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '50vh'
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        component="h1" 
        align="center"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          fontWeight: 'bold',
          color: 'white',
          mb: { xs: 2, sm: 3, md: 4 },
          textAlign: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.2
        }}
      >
        Resultados de búsqueda para: "{searchTerm}"
      </Typography>
      <Grid 
        container 
        spacing={{ xs: 2, sm: 2, md: 3 }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        {results.length > 0 ? (
          results.map((result) => (
            <Grid 
              item 
              xs={6} 
              sm={4} 
              md={3} 
              lg={2.4}
              key={result.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch' // Para que todas las cards tengan la misma altura
              }}
            >
              <Box sx={{ 
                width: '100%',
                height: { xs: '280px', sm: '320px', md: '350px' }, // Altura fija responsiva
                display: 'flex'
              }}>
                <MovieCard movie={result} handleCardClick={handleCardClick} />
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box 
              sx={{ 
                width: "100%", 
                display: "flex", 
                justifyContent: "center",
                alignItems: 'center',
                minHeight: '200px',
                textAlign: 'center'
              }}
            >
              <Typography 
                variant="body1" 
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  maxWidth: '400px',
                  lineHeight: 1.5
                }}
              >
                No se encontraron resultados para "{searchTerm}". 
                <br />
                Intenta con otros términos de búsqueda.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
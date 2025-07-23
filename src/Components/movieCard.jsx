import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavoritos } from '../Context/favoritos.jsx';
import imgNoDisponible from '../assets/img-no-disponible.jpg';
export default function movieCard({ movie, handleCardClick }) {
  const { agregarFavorito, eliminarFavorito, esFavorito } = useFavoritos();
  const isFavorito = esFavorito(movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorito) {
      eliminarFavorito(movie.id);
    } else {
      agregarFavorito(movie);
    }
  };

  // Función para manejar errores de imagen
  const handleImageError = (e) => {
    e.target.src = imgNoDisponible;
  };

  // URL de la imagen con fallback
  const getImageUrl = () => {
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    return imgNoDisponible;
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%', // Ocupa todo el espacio disponible
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative',
        transition: "transform 0.2s, box-shadow 0.2s",
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.03)',
          cursor: 'pointer',
        }
      }}
      onClick={() => handleCardClick(movie.id)}
    >
      {/* Botón de favorito */}
      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: isFavorito ? '#ff1744' : 'white',
          padding: '6px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: isFavorito ? '#ff1744' : '#ff1744',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
        aria-label={isFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {isFavorito ? (
          <FavoriteIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
        )}
      </IconButton>
      <CardMedia
        component="img"
        src={getImageUrl()}
        alt={`Póster de la película ${movie.title}`}
        onError={handleImageError}
        sx={{
          width: '100%',
          flex: 1, // Ocupa el espacio disponible
          objectFit: 'cover',
          minHeight: 0 // Permite que flex funcione correctamente
        }}
      />
      <CardContent
        sx={{
          flexShrink: 0, // No se encoge
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: { xs: '8px', sm: '12px', md: '16px' }, // Padding responsivo
          minHeight: { xs: '48px', sm: '56px', md: '64px' } // Altura mínima responsiva
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            fontWeight: 600,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2, // Máximo 2 líneas
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.2,
            width: '100%',
            color: 'text.primary'
          }}
        >
          {movie.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
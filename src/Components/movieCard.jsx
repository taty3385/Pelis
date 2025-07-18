import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavoritos } from '../Context/favoritos.jsx';
import img from '../assets/img-no-disponible.jpg'
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

  return (
    <Card
      sx={{
        width: '100%',
        minWidth: 200,
        maxWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
            : `${img}`
        }
        alt={`Póster de la película ${movie.title}`}
        sx={{
          width: '100%',
          height: '80%',
          objectFit: 'cover',
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {movie.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
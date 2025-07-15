import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useFavoritos } from '../Context/favoritos.jsx';
import img from '../assets/img-no-disponible.jpg'
export default function movieCard({ movie, handleCardClick }) {
  const { favoritos, agregarFavorito, eliminarFavorito } = useFavoritos();
  const esFavorito = favoritos.some((f) => f.id === movie.id);

  const handleStarClick = (e) => {
    e.stopPropagation();
    if (esFavorito) {
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
      {/* Estrella de favorito */}
      <IconButton
        onClick={handleStarClick}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10,
          color: esFavorito ? '#FFD700' : '#B0B0B0',
          backgroundColor: 'rgba(0,0,0,0.6)',
          boxShadow: 2,
          width: 40,
          height: 40,
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' },
        }}
        aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {esFavorito ? <StarIcon fontSize="large" /> : <StarBorderIcon fontSize="large" />}
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
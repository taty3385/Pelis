import  { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import useMovie from "../Hooks/useMovie"; 
import { Box, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavoritos } from '../Context/favoritos.jsx';

export default function CarrucelMovie({ category, title }) {
  const { fetchData, movies, handleCardClick , } = useMovie();
  const { agregarFavorito, eliminarFavorito, esFavorito } = useFavoritos();

  useEffect(() => {
    fetchData(category);
  }, [fetchData, category]);

  const handleFavoriteClick = (movie, event) => {
    event.stopPropagation(); // Evita que se ejecute el click de la imagen
    if (esFavorito(movie.id)) {
      eliminarFavorito(movie.id);
    } else {
      agregarFavorito(movie);
    }
  };

  return (
    <Box sx={{ 
      marginBottom: { xs: '20px', sm: '25px', md: '30px' }, 
      marginTop: { xs: '8px', sm: '10px' },
      paddingX: { xs: 1, sm: 2 }
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          ml: { xs: 2, sm: 3, md: 5 }, 
          mb: { xs: 1, sm: 1.5, md: 2 },
          fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.125rem' }
        }}
      >
        {title}
      </Typography>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        modules={[Pagination, Navigation]}
        navigation
        className="mySwiper"
        style={{ 
          height: '50vh', 
          width: "100%",
          minHeight: '300px',
          '--swiper-navigation-color': '#ffffff',
          '--swiper-navigation-size': '25px',
        }}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 25,
          }
        }}
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Box sx={{ 
                height: '90%', 
                width:"100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}> 
                {/* Botón de favorito */}
                <IconButton
                  onClick={(e) => handleFavoriteClick(movie, e)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: esFavorito(movie.id) ? '#ff1744' : 'white',
                    padding: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: esFavorito(movie.id) ? '#ff1744' : '#ff1744',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {esFavorito(movie.id) ? (
                    <FavoriteIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
                  )}
                </IconButton>

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ 
                    width: '100%', 
                    height: '85%', 
                    objectFit: 'contain',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                  onClick={() => handleCardClick(movie.id)}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    textAlign: 'center', 
                    marginTop: '8px',
                    fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
                    fontWeight: 500,
                    color: 'white',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%'
                  }}
                >
                  {movie.title}
                </Typography>
              </Box>
            </SwiperSlide>
          ))
        ) : (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '300px',
            width: '100%'
          }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' },
                color: 'text.secondary'
              }}
            >
              Cargando películas...
            </Typography>
          </Box>
        )}
      </Swiper>
    </Box>
  );
}


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import useMovie from "../Hooks/useMovie";
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export default function CarrucelPlay() {
  const { fetchData, movies, handleImageLoad, loading, handleCardClick } = useMovie();
  const limitedMovies = movies.slice(0, 15);

  

  useEffect(() => {
    fetchData("upcoming");
  }, []);

  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        style={{ 
          height: '70vh', 
          width: '100%',
          minHeight: '300px',
          maxHeight: '600px'
        }}
      >
        {limitedMovies.length > 0 ? (
          limitedMovies.map((movie) => (
            <SwiperSlide key={movie.id} style={{ width: '100%', height: '100%' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: loading ? 'none' : 'block',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onClick={()=>handleCardClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  onLoad={handleImageLoad}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)',
                    color: 'white',
                    padding: { xs: '15px', sm: '20px', md: '25px' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Box 
                    sx={{ 
                      width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
                      maxWidth: '600px'
                    }}
                  >
                    <Typography 
                      variant='h3' 
                      sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                        fontWeight: 'bold',
                        marginBottom: { xs: '10px', sm: '15px', md: '20px' },
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        lineHeight: 1.2
                      }}
                    >
                      {movie.title}
                    </Typography>
                    <Typography 
                      variant='body1'
                      sx={{
                        fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem', lg: '1.1rem' },
                        lineHeight: 1.4,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 3, sm: 4, md: 5 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxHeight: { xs: '4rem', sm: '5rem', md: '6rem' }
                      }}
                    >
                      {movie.overview}
                    </Typography>
                  </Box>
                </Box>
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
    </>
  );
}
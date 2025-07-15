import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import useMovie from "../Hooks/useMovie"; 
import { Box, Typography } from '@mui/material';

export default function CarrucelMovie({ category, title }) {
  const { fetchData, movies,handleCardClick } = useMovie();

  useEffect(() => {
    fetchData(category);
  }, [fetchData, category]);

  return (
    <Box sx={{ marginBottom: '30px', marginTop: '10px' }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        modules={[Pagination, Navigation]}
        navigation
        className="mySwiper"
        style={{ height: '50vh', width: "100%" }}
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Box sx={{ height: '90%', width:"100%" }}> 
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onClick={() => handleCardClick(movie.id)}
                />
              </Box>
              <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '10px' }}>
                {movie.title}
              </Typography>
            </SwiperSlide>
          ))
        ) : (
          <p>Cargando películas...</p>
        )}
      </Swiper>
    </Box>
  );
}


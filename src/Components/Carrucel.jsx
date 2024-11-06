

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import useMovie from "../Hooks/useMovie";
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function Carrucel() {
  const { fetchData, movies } = useMovie();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleImageLoad = () => {
    setLoading(false); // Marca las imágenes como cargadas
  };

  // Limitar las imágenes a las primeras 15
  const limitedMovies = movies.slice(0, 15);

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
        style={{ height: '70vh', width: '100vw', paddingTop: "3px"}} 
      >
        {limitedMovies.length > 0 ? (
          limitedMovies.map((movie) => (
            <SwiperSlide key={movie.id} style={{ width: '100vw', height: '100%' }}>
              <Box
                sx={{
                  width: '100vw', 
                  height: '100%', 
                  display: loading ? 'none' : 'block',
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  onLoad={handleImageLoad} 
                  style={{
                    width: '100vw', 
                    height: '100vh', 
                    objectFit: 'cover', 
                  }}
                />
              </Box>
            </SwiperSlide>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </Swiper>
    </>
  );
}

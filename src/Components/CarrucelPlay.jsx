

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import useMovie from "../Hooks/useMovie";
import { useEffect } from 'react';
import { Box } from '@mui/material';

export default function CarrucelPlay() {
  const { fetchData, movies ,handleImageLoad,loading } = useMovie();
  const limitedMovies = movies.slice(0, 15);

  useEffect(() => {
    fetchData("upcoming");
  }, [fetchData]);



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
        style={{ height: '70vh', width: '99%'}} 
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



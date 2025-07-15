

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Pagination, Autoplay } from 'swiper/modules';
// import useMovie from "../Hooks/useMovie";
// import { useEffect } from 'react';
// import { Box, Typography } from '@mui/material';

// export default function CarrucelPlay() {
//   const { fetchData, movies ,handleImageLoad,loading ,handleCardClick } = useMovie();
//   const limitedMovies = movies.slice(0, 15);

//   useEffect(() => {
//     fetchData("upcoming");
//   }, [fetchData]);



//   return (
//     <>
//       <Swiper
//         pagination={true}
//         modules={[Pagination, Autoplay]}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         className="mySwiper"
//         style={{ height: '70vh', width: '99%'}} 
//       >
//         {limitedMovies.length > 0 ? (
//           limitedMovies.map((movie) => (
//             <SwiperSlide key={movie.id}  style={{ width: '100vw', height: '100%' }}>
//               <Box
//                 sx={{
//                   width: '100vw', 
//                   height: '100%', 
//                   display: loading ? 'none' : 'block',
//                 }}
//               >
//                 <Typography variant='h3'>{movie.title}</Typography>
//                 console.log(movie);
                
//                 <Typography variant='h6'>{movie.overview}</Typography>
//                 <img
//                   src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
//                   alt={movie.title}
//                   onLoad={handleImageLoad} 
//                   style={{
//                     width: '100vw', 
//                     height: '100vh', 
//                     objectFit: 'cover', 
//                   }}
//                   onClick={() => handleCardClick(movie.id)}
//                 />
//               </Box>
//             </SwiperSlide>
//           ))
//         ) : (
//           <p>Loading movies...</p>
//         )}
//       </Swiper>
//     </>
//   );
// }


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
  console.log(movies);
  

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
        style={{ height: '70vh', width: '99%' }}
      >
        {limitedMovies.length > 0 ? (
          limitedMovies.map((movie) => (
            <SwiperSlide key={movie.id} style={{ width: '100vw', height: '100%' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100vw',
                  height: '100%',
                  display: loading ? 'none' : 'block',
                }}
                onClick={()=>handleCardClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  onLoad={handleImageLoad}
                  style={{
                    width: '100vw',
                    height: '100vh',
                   
                  }}
                 
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '95%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '20px',
                  }}
                > <Box width="35%" borderColor={"red"}>
                  <Typography variant='h3' mt={4} paddingBottom="20px">{movie.title}</Typography>
                  <Typography variant='h7'>{movie.overview}</Typography>
                  </Box>
                </Box>
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
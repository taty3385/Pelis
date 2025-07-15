import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import img from '../assets/img-no-disponible.jpg'
export default function movieCard({ movie, handleCardClick }) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={movie.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "19vw",
          display: "flex",
          flexDirection: "column",
          height: "350px",
        }}
        onClick={() => handleCardClick(movie.id)}
      >
        <CardMedia
          component="img"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : `${img}`
          }
          alt={`Póster de la película ${movie.title}`}
          sx={{
            width: "100%",
            height: "280px",
            objectFit:'inherit',
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "100%",
            }}
          >
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
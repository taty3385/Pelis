import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useFavoritos } from "../Context/favoritos.jsx";
import MenuItem from "@mui/material/MenuItem";
import { Link} from "react-router-dom";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../style/Search.style";
import useMovie from "../Hooks/useMovie";

function Navbar({ handleSearchSubmit ,handleSearchChange ,searchTerm}) { 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { favoritos } = useFavoritos();
  const {
    anchorElNav,
    handleCloseNavMenu,
   
  } = useMovie();


  const pages = ["Home", "Últimos Lanzamientos", "Populares" ,"⭐" ];



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/Pochoclos.png"
            alt="Logo"
            sx={{ height: 40, mr: 2 }}
          />

          {/* Menú para dispositivos móviles */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          {/* Menú para dispositivos de mayor tamaño */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              if (page === "Populares") {
                return (
                  <Button
                    key={page}
                    component={Link} 
                    to="categoria/popular" 
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </Button>
                );
              } else if (page === "Últimos Lanzamientos") {
                return (
                  <Button
                    key={page}
                    component={Link}
                    to="categoria/top_rated"
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </Button>
                );
              } else if (page === "⭐") {
                return (
                  <Button
                    key={page}
                    sx={{ my: 2, color: "yellow", display: "block", fontSize: 24 }}
                    onClick={handleOpen}
                  >
                    {page}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={page}
                    component={Link}
                    to="/" 
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </Button>
                );
              }
            })}
          </Box>

          {/* Barra de búsqueda */}
          <Box
            component="form"
           onSubmit={handleSearchSubmit}
            sx={{ display: "flex" }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
            <Button type="submit" sx={{ color: "white" }}>
              Buscar
            </Button>
          </Box>
        {/* Modal de favoritos */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-favoritos-title"
          aria-describedby="modal-favoritos-desc"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'rgba(0,0,0,0.7)',
            border: '2px solid #222',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}>
            {/* Botón de cierre */}
            <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 20 }}>
              <Button onClick={handleClose} sx={{ minWidth: 0, p: 0, color: 'rgba(255,255,255,0.7)', fontSize: 24, lineHeight: 1, background: 'transparent' }}>
                &#10005;
              </Button>
            </Box>
            <Typography id="modal-favoritos-title" variant="h6" component="h2" mb={2} color="rgba(255,255,255,0.9)">
              Mis Películas Favoritas
            </Typography>
            {favoritos.length === 0 ? (
              <Typography id="modal-favoritos-desc" color="rgba(255,255,255,0.7)">
                No tienes películas favoritas.
              </Typography>
            ) : (
              favoritos.map((pelicula) => (
                <Box key={pelicula.id} mb={1} display="flex" alignItems="center">
                  <Box
                    component="img"
                    src={pelicula.poster_path ? `https://image.tmdb.org/t/p/w92${pelicula.poster_path}` : "/img-no-disponible.jpg"}
                    alt={pelicula.title}
                    sx={{ width: 40, height: 60, objectFit: 'cover', mr: 2, borderRadius: 1, boxShadow: 2 }}
                  />
                  <Typography variant="body1" color="rgba(255,255,255,0.85)">{pelicula.title}</Typography>
                </Box>
              ))
            )}
          </Box>
        </Modal>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

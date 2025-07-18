import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useFavoritos } from "../Context/favoritos.jsx";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Search, SearchIconWrapper, StyledInputBase} from "../style/Search.style";
import useMovie from "../Hooks/useMovie.js";


function Navbar({ handleSearchSubmit ,handleSearchChange ,searchTerm}) { 
  const{ open, anchorElNav, handleOpen, handleClose, handleOpenNavMenu, handleCloseNavMenu ,use } = useMovie();
  const navigate = useNavigate();
  const { favoritos, eliminarFavorito } = useFavoritos();

  const handleMovieClick = (movieId) => {
    handleClose(); // Cierra el modal
    navigate(`/detalle/${movieId}`); // Navega al detalle
  };

  const handleDeleteFavorite = (e, movieId) => {
    e.stopPropagation(); // Evita que se active el click del contenedor
    eliminarFavorito(movieId);
  };

  const pages = ["Home", "Últimos Lanzamientos", "Populares" ,"⭐" ];



  return (
    <AppBar position="static"  sx={{ backgroundColor: "#1C1C1C", boxShadow: "none" }}>
      <Container maxWidth="xl"  >
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
        
          <Box
            component="img"
            src="/Pochoclos.png"
            alt="Logo"
            sx={{ 
              height: { sm: 35, md: 40 }, 
              mr: { sm: 1, md: 2 },
              display: { xs: "none", sm: "block" }
            }}
          />

          {/* Menú hamburguesa para móvil */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ p: 1 }}
            >
              <MenuIcon />
            </IconButton>
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
              sx={{ 
                display: { xs: "block", md: "none" },
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.95)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                },
                '& .MuiMenuItem-root': {
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffeb3b',
                  }
                }
              }}
            >
              {pages.map((page) => {
                if (page === "Populares") {
                  return (
                    <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to="categoria/popular">
                      <Typography sx={{ textAlign: "center", color: "white" }}>{page}</Typography>
                    </MenuItem>
                  );
                } else if (page === "Últimos Lanzamientos") {
                  return (
                    <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to="categoria/top_rated">
                      <Typography sx={{ textAlign: "center", color: "white" }}>{page}</Typography>
                    </MenuItem>
                  );
                } else if (page === "⭐") {
                  return (
                    <MenuItem key={page} onClick={() => { handleCloseNavMenu(); handleOpen(); }}>
                      <Typography sx={{ textAlign: "center", color: "yellow", fontSize: 18 }}>{page} Favoritos</Typography>
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to="/">
                      <Typography sx={{ textAlign: "center", color: "white" }}>{page}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>

          {/* Título para móvil */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              justifyContent: "center",
            }}
          >
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
                    sx={{ 
                      my: 2, 
                      color: "white", 
                      display: "block",
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                       
                        color: '#ffeb3b',
                        transform: 'translateY(-1px)',
                      }
                    }}
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
                    sx={{ 
                      my: 2, 
                      color: "white", 
                      display: "block",
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                
                        color: '#ffeb3b',
                        transform: 'translateY(-1px)',
                      }
                    }}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </Button>
                );
              } else if (page === "⭐") {
                return (
                  <Button
                    key={page}
                    sx={{ 
                      my: 2, 
                      color: "yellow", 
                      display: "block", 
                      fontSize: 16,
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#ffc107',
                        transform: 'translateY(-1px)',
                      }
                    }}
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
                    sx={{ 
                      my: 2, 
                      color: "white", 
                      display: "block",
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                       
                        color: '#ffeb3b',
                        transform: 'translateY(-1px)',
                      }
                    }}
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
            sx={{ 
              display: "flex",
              alignItems: "center",
              ml: { xs: 0, md: 2 },
              flexShrink: 0,
            }}
          >
            <Search sx={{ 
              width: { xs: "120px", sm: "150px", md: "200px" },
              '& .MuiInputBase-root': {
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }
              }
            }}>
              <SearchIconWrapper sx={{ 
                '& .MuiSvgIcon-root': {
                  fontSize: { xs: "1.2rem", sm: "1.5rem" }
                }
              }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: { xs: "8px 8px 8px 0", sm: "8px 8px 8px 0" },
                    paddingLeft: { xs: "calc(1em + 32px)", sm: "calc(1em + 32px)" },
                  }
                }}
              />
            </Search>
            <Button 
              type="submit" 
              sx={{ 
                color: "white",
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
                padding: { xs: "6px 8px", sm: "6px 12px", md: "6px 16px" },
                minWidth: { xs: "auto", sm: "64px" },
                ml: 1,
                borderRadius: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffeb3b',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "block" } }}>Buscar</Box>
              <SearchIcon sx={{ display: { xs: "block", sm: "none" }, fontSize: "1.2rem" }} />
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
            width: { xs: '90%', sm: '400px', md: '450px' },
            maxWidth: '500px',
            bgcolor: 'rgba(0,0,0,0.9)',
            border: '2px solid #333',
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            maxHeight: '80vh',
            overflowY: 'auto',
            backdropFilter: 'blur(10px)',
          }}>
            {/* Botón de cierre */}
            <Box sx={{ position: 'absolute', top: { xs: 4, sm: 8 }, right: { xs: 4, sm: 8 }, zIndex: 20 }}>
              <Button 
                onClick={handleClose} 
                sx={{ 
                  minWidth: 0, 
                  p: { xs: 0.5, sm: 1 }, 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: { xs: 18, sm: 20, md: 24 }, 
                  lineHeight: 1, 
                  background: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }
                }}
              >
                &#10005;
              </Button>
            </Box>
            <Typography 
              id="modal-favoritos-title" 
              variant="h6" 
              component="h2" 
              sx={{ 
                mb: { xs: 1.5, sm: 2 },
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                fontWeight: 'bold',
                textAlign: 'center',
                pr: { xs: 3, sm: 4 }
              }}
            >
              Mis Películas Favoritas
            </Typography>
            {favoritos.length === 0 ? (
              <Typography 
                id="modal-favoritos-desc" 
                sx={{ 
                  color: "rgba(255,255,255,0.7)",
                  textAlign: 'center',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  py: 2
                }}
              >
                No tienes películas favoritas aún.
              </Typography>
            ) : (
              <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {favoritos.map((pelicula) => (
                  <Box 
                    key={pelicula.id} 
                    onClick={() => handleMovieClick(pelicula.id)}
                    sx={{ 
                      mb: { xs: 1, sm: 1.5 }, 
                      display: "flex", 
                      alignItems: "center",
                      p: { xs: 1, sm: 1.5 },
                      borderRadius: 1,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={pelicula.poster_path ? `https://image.tmdb.org/t/p/w92${pelicula.poster_path}` : "/img-no-disponible.jpg"}
                      alt={pelicula.title}
                      sx={{ 
                        width: { xs: 35, sm: 40 }, 
                        height: { xs: 52, sm: 60 }, 
                        objectFit: 'cover', 
                        mr: { xs: 1.5, sm: 2 }, 
                        borderRadius: 1, 
                        boxShadow: 2,
                        flexShrink: 0
                      }}
                    />
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: "rgba(255,255,255,0.85)",
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                        lineHeight: 1.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        flex: 1,
                        pr: { xs: 1, sm: 1.5 }
                      }}
                    >
                      {pelicula.title}
                    </Typography>
                    <IconButton
                      onClick={(e) => handleDeleteFavorite(e, pelicula.id)}
                      sx={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        padding: { xs: 0.5, sm: 0.75 },
                        '&:hover': {
                          color: '#ff4444',
                          backgroundColor: 'rgba(255,68,68,0.1)',
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Modal>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

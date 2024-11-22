import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom"; 
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../style/Search.style";
import useMovie from "../Hooks/useMovie";

function Nabvar() {
  const pages = ["Home", "Últimos Lanzamientos", "Populares"];
  const {
    anchorElNav,
    handleCloseNavMenu,
    handleSearchChange,
    searchTerm,
    handleSearchSubmit,
  } = useMovie();

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
                    component={Link} // Envuelve el botón en el Link
                    to="categoria/popular" // Ruta de redirección
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
                    component={Link} // Envuelve el botón en el Link
                    to="categoria/top_rated" // Ruta de redirección para "Últimos Lanzamientos"
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={page}
                    component={Link}
                    to="/" // Ruta de redirección para "Home"
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
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nabvar;

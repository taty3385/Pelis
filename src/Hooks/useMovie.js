import * as React from 'react';

export default function useMovie() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
  return {
    handleCloseNavMenu,
    anchorElNav
    }
}

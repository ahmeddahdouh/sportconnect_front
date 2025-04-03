import React from 'react';
import { Paper, IconButton, InputBase, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// Styles personnalisés
const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: 500,
  padding: '8px 16px',
  borderRadius: '30px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  fontSize: '1rem',
  color: '#333',
  '& input::placeholder': {
    color: '#999',
    fontWeight: '400',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: '8px',
  '& svg': {
    color: '#6366f1',
    fontSize: '1.2rem',
  },
}));

const SearchComponent = ({ filterEvents }) => {
  return (
    <StyledPaper>
      {/* Icône de menu */}
      <StyledIconButton aria-label="menu">
        <MenuIcon />
      </StyledIconButton>

      {/* Champ de recherche */}
      <StyledInputBase
        placeholder="Trouvez Votre plaisir ⛹️🎾⛳"
        inputProps={{ 'aria-label': 'Rechercher un événement' }}
        onChange={filterEvents}
      />

      {/* Icône de recherche */}
      <StyledIconButton type="button" aria-label="search">
        <SearchIcon />
      </StyledIconButton>
    </StyledPaper>
  );
};

export default SearchComponent;
import React from 'react';
import { Paper, IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = ({ filterEvents }) => {
    return (
        <Paper
            component="form"
            className="w-full"
            sx={{ display: 'flex', alignItems: 'center', }}
        >
            <input
                type="text"
                placeholder="Rechercher des événements..."
                onChange={filterEvents}
                className="py-2 px-3 flex-1 outline-none text-black"
            />

            <IconButton type="button"  aria-label="search">
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
};

export default SearchComponent;

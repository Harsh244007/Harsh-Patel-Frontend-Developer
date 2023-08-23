import React from 'react';

const Banner = React.lazy(() => import('./Banner'));
const SearchForm = React.lazy(() => import('./SearchForm'));
const DataGrid = React.lazy(() => import('./DataGrid'));

export { Banner, SearchForm, DataGrid };

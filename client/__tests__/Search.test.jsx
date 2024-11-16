import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Search from "../src/components/Pages/Search";

test('render search page', () => {

    const mockHandleSearchInput = jest.fn(); 
      const searchText = ''; 
  
      render(
        <MemoryRouter>
            <Search searchText={searchText} handleSearchInput={mockHandleSearchInput} />
        </MemoryRouter>
    );
  
      const searchInput = screen.getByPlaceholderText('Search');
      expect(searchInput).toBeInTheDocument();
  })
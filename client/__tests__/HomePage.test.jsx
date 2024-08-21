import React from "react";
import { render, screen, waitFor, fireEvent, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../src/context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import Homepage from '../src/components/Homepage';


const renderHomePage = () => {
    render(
        <MemoryRouter>
            <Homepage />
        </MemoryRouter>
    );
}
test('render homepage side menubar', () => {
 
  renderHomePage();
  expect(screen.queryByText('Alumni Hub')).toBeInTheDocument()
  expect(screen.queryByText('Home')).toBeInTheDocument()
  expect(screen.queryByText('Search')).toBeInTheDocument()
  expect(screen.queryByText('Notifications')).toBeInTheDocument()
  expect(screen.queryByText('Network')).toBeInTheDocument()
  expect(screen.queryByText('Interactions')).toBeInTheDocument()
//   expect(screen.queryByText('Settings')).toBeInTheDocument()
})

test('render create post functionalities', () => {
  renderHomePage();
  expect(screen.getByPlaceholderText('Type something...')).toBeInTheDocument()
})

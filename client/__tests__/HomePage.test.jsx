import React from "react";
import { render, screen, waitFor, fireEvent, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../src/context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import HomepageContent from "../src/components/Homepage UI/HomepageContent";
import HomepageMenu from "../src/components/Homepage UI/HomepageMenu";
import HomepageContentPost from "../src/components/Homepage UI/HomepageContentPost";
import Homepage from "../src/components/Homepage";
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



// beforeEach(() => {
//   // Add the modal container to the DOM before each test
//   const modalRoot = document.createElement('div');
//   modalRoot.setAttribute('id', 'modal');
//   document.body.appendChild(modalRoot);
// });

// afterEach(() => {
//   // Clean up after each test
//   const modalRoot = document.getElementById('modal');
//   if (modalRoot) {
//       document.body.removeChild(modalRoot);
//   }
// });

// test('render create post functionalities', () => {
//   renderHomePage();
//   expect(screen.getByPlaceholderText('Type something...')).toBeInTheDocument()
// })

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../src/components/SignUp';

test('renders First Name input field', () => {
    render(
        <MemoryRouter>
            <SignUp />
        </MemoryRouter>
    );
    const firstNameInput = screen.getByLabelText('First name');
    expect(firstNameInput).toBeInTheDocument();
    const lastNameInput = screen.getByLabelText('Last name');
    expect(lastNameInput).toBeInTheDocument();
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();
    const c_idInput = screen.getByLabelText('College ID');
    expect(c_idInput).toBeInTheDocument();
    const dobInput = screen.getByLabelText('Date of Birth');
    expect(dobInput).toBeInTheDocument();
    const passingYearInput = screen.getByLabelText('Passing Year');
    expect(passingYearInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    expect(confirmPasswordInput).toBeInTheDocument();
    // const registerButton = screen.getByRole('button', { name: 'Register' });
    // expect(registerButton).toBeInTheDocument();
    const loginLink = screen.getByRole('link', { name: 'Login' });
    expect(loginLink).toBeInTheDocument();
});


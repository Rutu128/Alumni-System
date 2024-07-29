import React from 'react';
import { render, screen, waitFor, fireEvent, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../src/components/SignUp';
import { UserContext } from '../src/context/UserContext';

const renderSignUp = () =>
    render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
    );


test('renders SignUp component', () => {
    renderSignUp();
    expect(screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === 'Start your journey with Alumni Hub';
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children).every(
            (child) => !hasText(child)
        );
        return elementHasText && childrenDontHaveText;
    })).toBeInTheDocument();
});

test('renders input fields', () => {
    renderSignUp();
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
    
    const loginLink = screen.getByRole('link', { name: 'Login' });
    expect(loginLink).toBeInTheDocument();
});

test('Error message for empty input fields', async() => {
    renderSignUp();
    const registerButton = screen.getByText('Create Account');
    expect(registerButton).toBeInTheDocument();
    fireEvent.click(registerButton);
    await waitFor(() => expect(screen.getByText(/This field is required!/i)).toBeInTheDocument());
})

it('displays error message for invalid email', async () => {

    renderSignUp();
    fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('College ID'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText('Passing Year'), { target: { value: '2024' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password1!' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => expect(screen.queryByText('Enter a valid email!')).toBeInTheDocument());
});


test('validate password length', async () => {
    renderSignUp();

    fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('College ID'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText('Passing Year'), { target: { value: '2024' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => expect(screen.queryByText('Password must be minimum of 6 characters')).toBeInTheDocument());
})

test('Password and confirm password should match', async () => {
    renderSignUp();

    fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('College ID'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText('Passing Year'), { target: { value: '2024' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test@123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Test@1234' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => expect(screen.queryByText('Password and confirm password Does not match')).toBeInTheDocument());
})

test('successful form submission calls registerUser', async () => {

    const mockRegisterUser = jest.fn().mockResolvedValue({ status: 200 });
    const userDetail = {}; // Mock user detail
  
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ userDetail, registerUser: mockRegisterUser }}>
          <SignUp />
        </UserContext.Provider>
      </MemoryRouter>
    );

  
    const firstNameInput = screen.getByLabelText(/First name/i);
    const lastNameInput = screen.getByLabelText(/Last name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const c_idInput = screen.getByLabelText(/College ID/i);
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    const passingYearInput = screen.getByLabelText(/Passing Year/i);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(c_idInput, { target: { value: '12345' } });
    fireEvent.change(dobInput, { target: { value: '2000-01-01' } });
    fireEvent.change(passingYearInput, { target: { value: '2024' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByText(/Create Account/i));

    await waitFor(() => {
        expect(mockRegisterUser).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            c_id: '12345',
            dob: '2000-01-01',
            passingYear: '2024',
            password: 'Password1!'
        });
    });
});

test('handles API response correctly', async () => {
    const mockRegisterUser = jest.fn().mockResolvedValue({ status: 200 });
  const userDetail = {};  // Mock user detail

  render(
    <MemoryRouter>
      <UserContext.Provider value={{ userDetail, registerUser: mockRegisterUser }}>
        <SignUp />
      </UserContext.Provider>
    </MemoryRouter>
  );
    const firstNameInput = screen.getByLabelText(/First name/i);
    const lastNameInput = screen.getByLabelText(/Last name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const c_idInput = screen.getByLabelText(/College ID/i);
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    const passingYearInput = screen.getByLabelText(/Passing Year/i);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(c_idInput, { target: { value: '12345' } });
    fireEvent.change(dobInput, { target: { value: '2000-01-01' } });
    fireEvent.change(passingYearInput, { target: { value: '2024' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByText(/Create Account/i));

    await waitFor(() => {
        expect(mockRegisterUser).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            c_id: '12345',
            dob: '2000-01-01',
            passingYear: '2024',
            password: 'Password1!'
        });
    });

    // Add more cases for different API responses like 409, 500, etc.
});

// test('password visibility toggle', () => {
//     renderSignUp();
//     const passwordInput = screen.getByLabelText('Password');
//     const toggleButton = screen.getByRole('button', { name: /showPassword/i });

//     fireEvent.click(toggleButton);
//     expect(passwordInput.type).toBe('text');

//     fireEvent.click(toggleButton);
//     expect(passwordInput.type).toBe('password');
// });
import React from 'react';
import { render, screen, waitFor, fireEvent, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../src/context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import Login from '../src/components/Login';

const mockLoginUser = jest.fn();

const renderLoginComponent = () => {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{ loginUser: mockLoginUser }}>
        <Login />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

test('renders initial state of Login component', () => {
  renderLoginComponent();

  const LoginInput = screen.getByLabelText('Email');
  expect(LoginInput).toBeInTheDocument();
  expect (LoginInput).toHaveValue('');
  const PasswordInput = screen.getByLabelText('Password');
  expect(PasswordInput).toBeInTheDocument();
  expect (PasswordInput).toHaveValue('');
  const submitButton = screen.getByText('Login');
  expect(submitButton).toBeInTheDocument();

  expect(screen.queryByText('this field is required!')).not.toBeInTheDocument();
})

test('Updates input fields correctly', () => {
  renderLoginComponent();

  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@gmail.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test@123456' } });
  expect(screen.getByLabelText('Email')).toHaveValue('test@gmail.com');
  expect(screen.getByLabelText('Password')).toHaveValue('Test@123456');
})

test('Validates email input', () => {
    renderLoginComponent();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test@123456' } });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.queryByText('Enter a valid email!')).toBeInTheDocument();
})

test('Validates empty password input', () => {
    renderLoginComponent();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@gmailcom' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.queryByText('This field is required!')).toBeInTheDocument();
})

test('Trims spaces in input fields', () => {
    renderLoginComponent();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: ' test@gmailcom ' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: ' Test@123456 ' } });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.queryByText('Spaces are not allowed')).toBeInTheDocument();
})

// test('Successful login', async() => {
//     const mockRegisterUser = jest.fn().mockResolvedValue({ status: 200 });
//     const userDetail = {}; // Mock user detail
  
//     render(
//       <MemoryRouter>
//         <UserContext.Provider value={{ userDetail, registerUser: mockRegisterUser }}>
//           <Login />
//         </UserContext.Provider>
//       </MemoryRouter>
//     );

  
//     fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@gmailcom' } });
//     fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test@123456' } });
//     fireEvent.click(screen.getByText('Login'));

//     await waitFor(() => {
//         expect(mockRegisterUser).toHaveBeenCalledWith({
//             email: 'test@gmailcom',
//             password: 'Test@123456'
//         });
//     });

// })

// test('Login failure - user not found', async() => {
//     const loginUser = jest.fn().mockResolvedValue({ status: 404 });
//     renderLoginComponent();

//     fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@gmailcom' } });
//     fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test@123456' } });
//     fireEvent.click(screen.getByText('Login'));
//     await waitFor(() => expect(screen.queryByText('User with entered email does not exist!')).toBeInTheDocument());
// })
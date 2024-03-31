import App from '../src/App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWithRouter';

// Informations from Login Page
const TITLE = 'User Manager System';
const SUBTITLE = 'Manage your users in a simple and easy way';
const TEST_CREDENTIALS = 'Test the system with credentials';
const CREDENTIALS = 'rick@admin.com / secret_admin';

// Form elements
const TITLE_FORM = 'User Login';
const EMAIL_INPUT = 'Email';
const PASSWORD_INPUT = 'Password';
const BUTTON_LOGIN = 'Login';

describe('Tests Login Page', () => {
  it('1.1 should render elements information login page', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getByText(SUBTITLE)).toBeInTheDocument();
    expect(screen.getByText(TEST_CREDENTIALS)).toBeInTheDocument();
    expect(screen.getByText(CREDENTIALS)).toBeInTheDocument();
  })

  it('1.2 should render form elements', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(TITLE_FORM)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_LOGIN })).toBeInTheDocument();
  });

  it('1.3 should login with success', async () => {
    renderWithRouter(<App />);
    const email = 'rick@admin.com';
    const password = 'secret_admin';
    const buttonLogin = screen.getByRole('button', { name: BUTTON_LOGIN });
    const emailInput = screen.getByPlaceholderText(EMAIL_INPUT);
    const passwordInput = screen.getByPlaceholderText(PASSWORD_INPUT);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(buttonLogin);
  });

  it('1.4 should login success and redirect to home page', async () => {
    renderWithRouter(<App />);
    const email = 'rick@admin.com';
    const password = 'secret_admin';
    const buttonLogin = screen.getByRole('button', { name: BUTTON_LOGIN });
    const emailInput = screen.getByPlaceholderText(EMAIL_INPUT);
    const passwordInput = screen.getByPlaceholderText(PASSWORD_INPUT);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(buttonLogin);
  });
});
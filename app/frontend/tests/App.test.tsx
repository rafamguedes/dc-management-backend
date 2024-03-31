import App from '../src/App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWithRouter';
import Header from '../src/components/Header/Header';
import NavBarSide from '../src/components/NavBar/NavBarSide';
import UserTable from '../src/components/Table/Table';

// Login Page
const TITLE_LOGIN = 'User Manager System';
const SUBTITLE = 'Manage your users in a simple and easy way';
const TEST_CREDENTIALS = 'Test the system with credentials';
const CREDENTIALS = 'rick@admin.com / secret_admin';

// Form elements Login Page
const TITLE_FORM = 'User Login';
const EMAIL_INPUT = 'Email';
const PASSWORD_INPUT = 'Password';
const BUTTON_LOGIN = 'Login';

// Header Component
const TITLE_DASHBOARD = 'Dashboard';
const INPUT_SEARCH = 'Search';
const ICONS_HEADER = 'iconsHeader';

// NavBarSide Component
const BUTTON_LOGOUT = 'Logout';
const LINK_DASHBOARD = 'Dashboard';
const LINK_CREATE_USER = 'Create User';
const DEVELOPER = 'Developed by Rafael Guedes';

describe('Tests Login Page', () => {
  it('1.1 should render elements information login page', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(TITLE_LOGIN)).toBeInTheDocument();
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
});

describe('Tests Header Component', () => {
  it('2.1 should render Header', () => {
    renderWithRouter(<Header handleSearch={() => {}} />); // Add a mock function for the 'handleSearch' prop

    expect(screen.getByText(TITLE_DASHBOARD)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(INPUT_SEARCH)).toBeInTheDocument();
    expect(screen.getByTestId(ICONS_HEADER)).toBeInTheDocument();
  });
});

describe('Tests NavBarSide component', () => {
  it('3.1 should render NavBarSide', () => {
    renderWithRouter(<NavBarSide />);

    expect(screen.getByRole('button', { name: BUTTON_LOGOUT })).toBeInTheDocument();
    expect(screen.getByText(LINK_DASHBOARD)).toBeInTheDocument();
    expect(screen.getByText(LINK_CREATE_USER)).toBeInTheDocument();
    expect(screen.getByText(DEVELOPER)).toBeInTheDocument();
  });
});

describe('Tests UserTable component', () => {
  it('4.1 should render UserTable', () => {
    renderWithRouter(
      <UserTable
        users={[]}
        editingId={0}
        editedRole=""
        handleUpdate={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
        setEditedRole={() => {}}
      />
    );

    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('4.2 should render UserTable with users', () => {
    const users = [
      {
        id: 1,
        image: 'https://example.com/image.jpg',
        username: 'Rafael Guedes',
        role: 'admin',
        email: 'rafa@gmail.com',
      },
      {
        id: 2,
        image: 'https://example.com/image.jpg',
        username: 'Lorena Mota',
        role: 'user',
        email: 'lorena@gmail.com',
      },
    ];

    renderWithRouter(
      <UserTable
        users={users.map(user => ({ ...user, password: '', id: user.id.toString() }))}
        editingId={0}
        editedRole=""
        handleUpdate={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
        setEditedRole={() => {}}
      />
    );

    expect(screen.getByText('Rafael Guedes')).toBeInTheDocument();
    expect(screen.getByText('Lorena Mota')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('rafa@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('lorena@gmail.com')).toBeInTheDocument();
  });

  it('4.3 should render UserTable with input to edit role', () => {
    const users = [
      {
        id: 1,
        image: 'https://example.com/image.jpg',
        username: 'Rafael Guedes',
        role: 'admin',
        email: 'rafa@gmail.com',
      },
    ];

    renderWithRouter(
      <UserTable
        users={users.map(user => ({ ...user, password: '', id: user.id.toString() }))}
        editingId={1}
        editedRole="user"
        handleUpdate={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
        setEditedRole={() => {}}
      />
    );

    expect(screen.getByDisplayValue('user')).toBeInTheDocument();
  });
});
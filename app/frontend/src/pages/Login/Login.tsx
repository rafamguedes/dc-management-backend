import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../../services/authService';
import Swal from 'sweetalert2';
import { 
  Container, 
  Paper, 
  Title,
  TextInput, 
  PasswordInput, 
  Button, 
  Stack,
  LoadingOverlay,
  Center
} from '@mantine/core';

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    if (!email || !/^\S+@\S+$/.test(email)) {
      newErrors.email = 'Invalid email';
    }
    
    if (!password || password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await login({ email, password });

      if (response && response.token) {
        localStorage.setItem('token', response.token);
        if ('user' in response) {
          localStorage.setItem('user', JSON.stringify((response as any).user));
        }
        
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          showConfirmButton: false,
          timer: 1500,
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Failed to login:', error);
      
      let errorMessage = 'An error occurred during login';
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = 'Invalid email or password';
            break;
          case 404:
            errorMessage = 'User not found';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later';
            break;
          default:
            errorMessage = error.response.data?.message || 'Login failed';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection';
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" style={{ minHeight: '100vh' }}>
      <Center style={{ minHeight: '100vh' }}>
        <Stack w="60%" gap="xl">
          <Paper shadow="md" p="xl" radius="md" withBorder>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            
            <Stack gap="md">
              
              <Title order={2} ta="center" mb="md">
                Login
              </Title>

              <form onSubmit={handleSubmit}>
                <Stack gap="md">
                  <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    data-testid="email-input"
                  />

                  <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    data-testid="password-input"
                  />

                  <Button 
                    type="submit" 
                    fullWidth 
                    loading={loading}
                    data-testid="login-button"
                    size="md"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Paper>
        </Stack>
      </Center>
    </Container>
  );
}
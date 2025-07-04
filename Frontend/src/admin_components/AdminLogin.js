import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import Header from '../components/Header';

const commonFields = [
  { controlId: 'email', label: 'Email', type: 'email' },
  { controlId: 'password', label: 'Password', type: 'password' },
];

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const token = Cookies.getItem('jwtToken');
  const adminToken = localStorage.getItem('adminJwtToken');

  useEffect(() => {
    console.log(adminToken);
    if (token) {
      navigate('/'); // Redirect to home if token exists
    } else if (adminToken) {
      navigate('/admin/all-products'); // Redirect to admin if an admin token exists
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5100/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          Cookies.setItem('jwtToken', data.token, { expires: 30 });
          Cookies.setItem('userId', data.user._id);
          Cookies.setItem('userName', data.user.firstname);
          navigate('/');
        } else if (data.jwtToken) {
          localStorage.setItem('adminJwtToken', data.jwtToken, { expires: 30 });
          Cookies.setItem('userName', data.user.firstname);
          navigate('/admin/dashboard');
        }
      } else {
        alert("Email or Password didn't match");
      }
    } catch (error) {
      alert('Error during login:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlelogin = () => {
    alert('Login Successfull');
    navigate('/admin/dashboard');
  };

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Header />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '90vh', paddingTop: '2rem', paddingBottom: '2rem' }}
      >
        <Card
          className="shadow p-4"
          style={{
            width: '400px',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
          }}
        >
          <Card.Body>
            <h2
              className="mb-4"
              style={{
                color: '#6ba229', // Updated to your green
                fontWeight: '700',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                textAlign: 'center',
              }}
            >
              Admin Login
            </h2>
            <Form onSubmit={handleSubmit}>
              {commonFields.map((field) => (
                <Form.Group
                  style={{ textAlign: 'start', marginBottom: '15px' }}
                  controlId={field.controlId}
                  key={field.controlId}
                >
                  <Form.Label
                    style={{
                      fontWeight: '600',
                      color: '#333',
                      fontSize: '1rem',
                      marginBottom: '6px',
                    }}
                  >
                    {field.label}
                  </Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    name={field.controlId}
                    value={formData[field.controlId]}
                    onChange={handleInputChange}
                    required
                    style={{
                      borderRadius: '6px',
                      borderColor: '#a3d39c',
                      padding: '10px',
                      fontSize: '1rem',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#6ba229')}
                    onBlur={(e) => (e.target.style.borderColor = '#a3d39c')}
                  />
                </Form.Group>
              ))}
              <Button
                onClick={handlelogin}
                className="w-100 mt-3"
                style={{
                  backgroundColor: '#6ba229', // Your green
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  padding: '10px 0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(107, 162, 41, 0.3)',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#579118')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#6ba229')}
              >
                Login
              </Button>
            </Form>
            <p
              style={{
                marginTop: '20px',
                fontSize: '0.9rem',
                textAlign: 'center',
                color: '#555',
              }}
            >
              Don't have an account?{' '}
              <Link
                to="/asignup"
                style={{ color: '#f68b1e', fontWeight: '600', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Sign Up
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminLogin;

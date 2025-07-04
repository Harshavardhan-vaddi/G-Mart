import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import Header from '../Header';

const commonFields = [
  { controlId: 'email', label: 'Email', type: 'email' },
  { controlId: 'password', label: 'Password', type: 'password' },
];

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const token = Cookies.getItem('jwtToken');
  const adminToken = localStorage.getItem('adminJwtToken');

  useEffect(() => {
    if (token) {
      navigate('/');
    } else if (adminToken) {
      navigate('/admin/all-products');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5100/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          Cookies.setItem('jwtToken', data.token, { expires: 30 });
          Cookies.setItem('userId', data.user._id);
          Cookies.setItem('userName', data.user.firstname);
          navigate('/');
          alert('Login successful!');
        } else if (data.jwtToken) {
          localStorage.setItem('adminJwtToken', data.jwtToken);
          Cookies.setItem('userName', data.user.firstname);
          navigate('/admin/dashboard');
        }
      } else {
        alert("Email or password didn't match");
      }
    } catch (error) {
      alert('Error during login: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <Header />
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', paddingTop: '10vh' }}>
        <Card className="shadow p-4" style={{ width: '400px', borderRadius: '12px' }}>
          <Card.Body>
            <h2 className="mb-4 text-center" style={{ color: '#52a447', fontWeight: 'bold' }}>Login</h2>
            <Form onSubmit={handleSubmit}>
              {commonFields.map((field) => (
                <Form.Group controlId={field.controlId} key={field.controlId} className="mb-3 text-start">
                  <Form.Label style={{ fontWeight: '600', color: '#444' }}>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    name={field.controlId}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={formData[field.controlId]}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>
              ))}
              <Button type="submit" className="w-100 mt-3" style={{
                backgroundColor: '#52a447',
                border: 'none',
                borderRadius: '30px',
                padding: '10px',
                fontWeight: 'bold'
              }}>
                Login
              </Button>
            </Form>
            <p className="mt-3 text-center">
              Don't have an account? <Link to="/signup" style={{ color: '#52a447', textDecoration: 'none' }}>Sign Up</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;

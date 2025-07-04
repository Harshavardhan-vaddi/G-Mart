import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';

const commonFields = [
  { controlId: 'firstName', label: 'First Name', type: 'text' },
  { controlId: 'lastName', label: 'Last Name', type: 'text' },
  { controlId: 'username', label: 'User Name', type: 'text' },
  { controlId: 'email', label: 'Email', type: 'email' },
  { controlId: 'password', label: 'Password', type: 'password' },
];

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5100/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        alert('Registration successful!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert('Registration failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <Header />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', paddingTop: '10vh' }}
      >
        <Card className="shadow p-4" style={{ width: '400px' }}>
          <Card.Body>
            <h2 className="mb-4 text-center" style={{ color: '#27ae60' }}>
              Sign Up
            </h2>
            <Form onSubmit={handleSubmit} autoComplete="off">
              {commonFields.map((field) => (
                <Form.Group
                  style={{ textAlign: 'start', marginBottom: '15px' }}
                  controlId={field.controlId}
                  key={field.controlId}
                >
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    name={field.controlId}
                    value={formData[field.controlId]}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              ))}
              <Button
                type="submit"
                className="w-100 mt-3"
                style={{ backgroundColor: '#27ae60', borderColor: '#27ae60' }}
              >
                Sign Up
              </Button>
            </Form>
            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Registration;

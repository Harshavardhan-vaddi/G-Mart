import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const green = '#6ba229';

const commonFields = [
    { controlId: "username", label: "UserName", type: "text" },
    { controlId: "email", label: "Email", type: "email" },
    { controlId: "password", label: "Password", type: "password" },
];

const AdminSignup = () => {
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Registered Successfully!');
                navigate('/alogin');
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

    const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    const cardBgColor = green;
    const cardTextColor = 'white';
    const inputBgColor = 'white';
    const buttonBgColor = green;
    const buttonHoverColor = '#578219'; // A darker shade of green for hover
    const linkColor = '#c2de84'; // lighter green for links

    return (
        <div>
            <Header />
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh', paddingTop: '10vh', fontFamily }}
            >
                <Card
                    className="shadow p-4"
                    style={{
                        width: '400px',
                        backgroundColor: cardBgColor,
                        color: cardTextColor,
                        borderRadius: '10px',
                    }}
                >
                    <Card.Body>
                        <h2 className="mb-4" style={{ color: cardTextColor }}>
                            Sign Up
                        </h2>
                        <Form onSubmit={handleSubmit}>
                            {commonFields.map((field) => (
                                <Form.Group
                                    style={{ textAlign: 'start', marginBottom: '10px' }}
                                    controlId={field.controlId}
                                    key={field.controlId}
                                >
                                    <Form.Label style={{ color: cardTextColor }}>
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
                                            backgroundColor: inputBgColor,
                                            borderRadius: '5px',
                                            borderColor: '#ccc',
                                        }}
                                    />
                                </Form.Group>
                            ))}
                            <Button
                                type="submit"
                                className="w-100 mt-3"
                                style={{
                                    backgroundColor: buttonBgColor,
                                    borderColor: buttonBgColor,
                                    color: cardTextColor,
                                    fontWeight: 'bold',
                                    borderRadius: '5px',
                                }}
                                onMouseOver={e => (e.currentTarget.style.backgroundColor = buttonHoverColor)}
                                onMouseOut={e => (e.currentTarget.style.backgroundColor = buttonBgColor)}
                            >
                                Sign Up
                            </Button>
                        </Form>
                        <p style={{ marginTop: '10px', color: cardTextColor }}>
                            Already have an account?{' '}
                            <Link to="/alogin" style={{ color: linkColor }}>
                                Log In
                            </Link>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AdminSignup;

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

const Unavbar = () => {
  const get = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('adminJwtToken');
    navigate('/');
  };

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const navbarBgColor = '#6ba229'; // Your green color
  const navbarTextColor = 'white';

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: navbarBgColor, fontFamily }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/uhome"
          style={{ color: navbarTextColor, fontFamily, fontWeight: 'bold' }}
        >
          Grocery Web App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {[
              { to: '/admin/dashboard', label: 'Dashboard' },
              { to: '/admin/users', label: 'Users' },
              { to: '/admin/all-products', label: 'Products' },
              { to: '/admin/add-product', label: 'Add Product' },
              { to: '/admin/orders', label: 'Orders' },
            ].map(({ to, label }) => (
              <Nav.Link
                key={label}
                as={Link}
                to={to}
                style={{
                  color: navbarTextColor,
                  fontSize: '22px',
                  fontStyle: 'italic',
                  fontFamily,
                  marginRight: '15px',
                }}
              >
                {label}
              </Nav.Link>
            ))}
            <Nav.Link
              onClick={handleLogout}
              style={{
                color: navbarTextColor,
                fontSize: '22px',
                fontStyle: 'italic',
                fontFamily,
                cursor: 'pointer',
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unavbar;

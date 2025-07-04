import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = Cookies.getItem("jwtToken");
  const adminToken = localStorage.getItem("adminJwtToken");

  useEffect(() => {
    setIsAdmin(!!adminToken);
  }, [adminToken]);

  const navigate = useNavigate();

  const onLogout = () => {
    const res = window.confirm("Are you sure you want to log out?");
    if (res) {
      Cookies.removeItem('adminJwtToken');
      Cookies.removeItem('jwtToken');
      localStorage.clear();
      navigate('/login');
    }
  };

  // 🌿 BigBasket-style color
  const green = '#6ba229';

  const navbarStyle = {
    padding: '0 30px',
    minHeight: '10vh',
    width: '100%',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    zIndex: 1000,
    fontFamily: 'Segoe UI, sans-serif',
  };

  const brandStyle = {
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    color: green,
  };

  const navLinkStyle = {
    fontWeight: 500,
    color: green,
    marginRight: '15px',
    transition: 'color 0.3s ease',
  };

  return (
    <Navbar fixed="top" expand="lg" style={navbarStyle} variant="light">
      <Navbar.Brand>
        <Link to={isAdmin ? '/admin/dashboard' : '/'} style={brandStyle}>G-Mart</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto">
          {isAdmin ? (
            <>
              <NavLink to="/admin/dashboard" className="nav-link" style={navLinkStyle}>Home</NavLink>
              <NavLink to="/admin/all-products" className="nav-link" style={navLinkStyle}>Products</NavLink>
              <NavLink to="/admin/orders" className="nav-link" style={navLinkStyle}>Orders</NavLink>
              <NavLink to="/admin/users" className="nav-link" style={navLinkStyle}>Users</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className="nav-link" style={navLinkStyle}>Home</NavLink>
              <NavLink to="/my-cart" className="nav-link" style={navLinkStyle}>MyCart</NavLink>
              <NavLink to="/my-orders" className="nav-link" style={navLinkStyle}>Orders</NavLink>
              <NavLink to="/my-history" className="nav-link" style={navLinkStyle}>History</NavLink>
            </>
          )}
        </Nav>

        <Nav>
          {!token && !adminToken ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <NavLink to="/login" className="nav-link" style={navLinkStyle}>User Login</NavLink>
              <span className="nav-link" style={{ color: green }}>/</span>
              <NavLink to="/alogin" className="nav-link" style={navLinkStyle}>Admin Login</NavLink>
            </div>
          ) : (
            <NavLink to="/login" className="nav-link" style={navLinkStyle} onClick={onLogout}>
              Logout
            </NavLink>
          )}

          {isAdmin && (
            <NavDropdown title="More" id="admin-dropdown" menuVariant="light">
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Support</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginModal from './SignIn'; // Import the Login Modal
import '../../css/HomePage.css';

const Header = () => {
  const navigate = useNavigate();
  
  // State to manage authentication status and role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false); // State to control LoginModal

  // Check localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  // Logout handler: removes stored token/role and redirects
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('doctordetails');
    localStorage.removeItem('user');
    localStorage.removeItem('userobj');
    localStorage.removeItem('doctorid');
    setIsAuthenticated(false);
    setRole(null);
    navigate('/'); 
  };

  // Handle the Find Doctors button click
  const handleFindDoctorsClick = () => {
    if (!isAuthenticated) {
      setShowLogin(true); // Show the login modal if not authenticated
    } else {
      navigate('/find-doctors'); // Navigate to Find Doctors page if authenticated
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm modern-header">
        <Container>
          <Navbar.Brand href="/">CareBuddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Find Doctors button */}
              <Nav.Link onClick={handleFindDoctorsClick}>Find Doctors</Nav.Link>

              {/* Conditionally show dashboard links based on the role */}
              {isAuthenticated && role === 'PATIENT' && (
                <Nav.Link href="/patient-appointments">Patient Dashboard</Nav.Link>
              )}
              {isAuthenticated && role === 'ADMIN' && (
                <Nav.Link href="/admin/home">Admin Dashboard</Nav.Link>
              )}
              {isAuthenticated && role === 'DOCTOR' && (
                <Nav.Link href="/doctor/dashboard">Doctor Dashboard</Nav.Link>
              )}

              {/* Show Logout when authenticated, otherwise trigger LoginModal */}
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link onClick={() => setShowLogin(true)}>Login / Signup</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Include the Login Modal */}
      <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginModal from './SignIn'; // Import the Login Modal
import '../../css/HomePage.css';

const consultations = [
  { title: "Acne, pimple or skin issues", img: "/images/consult2.png" },
  { title: "Period doubts or Pregnancy", img: "/images/consult1.png" },
  { title: "Cold, cough or fever", img: "/images/consult3.png" }
];

const ConsultationSection = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const [showLogin, setShowLogin] = useState(false); // State to control LoginModal

  // Check localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Consult Now button click
  const handleConsultNowClick = () => {
    if (!isAuthenticated) {
      setShowLogin(true); // Show the login modal if not authenticated
    } else {
      navigate('/find-doctors'); // Navigate to Find Doctors page if authenticated
    }
  };

  return (
    <Container fluid className="py-5 modern-consultation" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
      <h2 className="text-center mb-4 component-title">Consultations</h2>
      <Row>
        {consultations.map((item, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card className="h-100 shadow-sm modern-card">
              <Card.Img
                style={{ width: "40%", margin: "0 auto", paddingTop: "1rem" }}
                variant="top"
                src={item.img}
                alt={item.title}
              />
              <Card.Body className="text-center">
                <Card.Title>{item.title}</Card.Title>
                <Button variant="success" onClick={handleConsultNowClick}>
                  Consult Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Include the Login Modal */}
      <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
    </Container>
  );
};

export default ConsultationSection;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeContent from './HomeContent/HomeContent';
import LoginContent from './LoginContent/LoginContent';
import SignupContent from './LoginContent/SignupContent';
import Footer from './Footer/Footer';
import AboutContent from './AboutContent/AboutContent';
import ServiceContent from './ServiceContent/ServiceContent';
import ContactContent from './ContactContent/ContactContent';
import LogoutContent from './LogoutContent/LogoutContent';
import JsonToUI from './JSONtoUI/JsonToUI';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 95vh;
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 0;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  flex: 1;
`;

const Header = styled.header`
  background-color: #3498db;
  height: 50px;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 15px;
`;

const Logo = styled.img`
  max-height: 60px; /* Adjust the height as needed */
`;

const Main = styled.main`
  padding: 20px 0;
`;
//const AboutContent = () => <p>This is the About page content.</p>;
//const ServicesContent = () => <p>This is the Services page content.</p>;
//const ContactContent = () => <p>This is the Contact page content.</p>;
const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Container>
      {/* <Router>
        <FormContainer>
          <Header>
            <NavLink to="/">
              <Logo src={'./MissionG3_logo.jpg'} alt="Logo" />
            </NavLink>
            <div>
              {authenticated ? (
                <>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/about">About</NavLink>
                  <NavLink to="/services">Services</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                  <NavLink to="/logout">Logout</NavLink>
                </>
              ) : (
                  <NavLink to="/login">Login</NavLink>
              )}
            </div>
          </Header>
          <Wrapper>
            <Main>
              <Routes>
                {authenticated ? <Route path="/about" element={<AboutContent />} /> : <Route path="/login" element={<LoginContent setAuthenticated={setAuthenticated} />} />}
                {authenticated ? <Route path="/services" element={<ServiceContent />} /> : <Route path="/login" element={<LoginContent setAuthenticated={setAuthenticated} />} />}
                {authenticated ? <Route path="/contact" element={<ContactContent />} /> : <Route path="/login" element={<LoginContent setAuthenticated={setAuthenticated} />} />}
                <Route path="/login" element={<LoginContent setAuthenticated={setAuthenticated} />} />
                <Route path="/signup" element={<SignupContent />} />
                <Route path="/logout" element={<LogoutContent setAuthenticated={setAuthenticated} />} />
                {authenticated ? <Route path="/" element={<HomeContent />} /> : null}
                {!authenticated ? <Route path="/login" element={<LoginContent setAuthenticated={setAuthenticated} />} /> : null}
              </Routes>
            </Main>
          </Wrapper>
          <Footer />
        </FormContainer>
      </Router> */}
      <JsonToUI />
    </Container>
  );
};

export default App;

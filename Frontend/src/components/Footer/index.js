import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #ffffff;
  color: #6ba229;
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
`;

const FooterText = styled.p`
  font-size: 14px;
  font-weight: 500;
  opacity: 0.95;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2025 G-Mart Grocery. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;

import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #ffffff;
  color: #6ba229;
  padding: 20px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: 500;
  color: #6ba229;
  opacity: 0.95;
`;

export const FooterLinks = styled.div`
  margin-top: 10px;
`;

export const FooterLink = styled.a`
  color: #6ba229;
  margin: 0 10px;
  text-decoration: none;
  font-weight: 500;
  transition: text-decoration 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

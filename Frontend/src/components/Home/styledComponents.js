import styled from 'styled-components';

export const HomeContainer = styled.div`
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 1200px;
  padding: 40px;
  width: 100%;
`;

export const CenteredRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentColumn = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

export const Heading = styled.h1`
  font-size: 3rem;
  color: #84c225; /* BigBasket green */
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Paragraph = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.6;
`;

export const PrimaryButton = styled.button`
  background-color: #84c225;
  color: white;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(132, 194, 37, 0.3);

  &:hover {
    background-color: #6ea81a;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
`;

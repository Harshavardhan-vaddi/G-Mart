import styled from 'styled-components';

export const ProductContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ProductName = styled.h3`
  font-size: 20px;
  color: #2e7d32; /* BigBasket green */
  font-weight: 600;
  margin: 12px 0 6px;
`;

export const ProductDescription = styled.p`
  color: #666666;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: #ff5722; /* Bright price tag */
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  background-color: #f6f6f6;
  margin-bottom: 12px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  gap: 8px;
`;

export const Button = styled.button`
  flex: 1;
  padding: 10px 14px;
  background-color: #43a047; /* BigBasket green */
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2e7d32;
  }
`;

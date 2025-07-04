import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import AdminNavabar from '../AdminNavbar';

const COLORS = {
  green: '#27ae60',
  greenDark: '#219150',
  textDark: '#3e3e3e',
  bgLight: '#f8f9fa',
};

const Container = styled.div`
  padding: 20px;
  margin-top: 10vh;
  text-align: start;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  text-align: center;
  color: ${COLORS.green};
  font-weight: 700;
  margin-bottom: 40px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const StyledCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  padding: 20px;
  text-align: center;

  .card-title {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: ${COLORS.textDark};
  }

  .card-text {
    font-size: 1.3rem;
    margin-bottom: 25px;
    color: ${COLORS.textDark};
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  font-weight: 600;
  background-color: ${COLORS.green};
  border: none;

  &:hover,
  &:focus {
    background-color: ${COLORS.greenDark};
    box-shadow: 0 0 8px ${COLORS.greenDark};
  }
`;

const Dashboard = () => {
  const [data, setData] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, productsResponse, ordersResponse] = await Promise.all([
          fetch('http://localhost:5100/users').then((res) => res.json()),
          fetch('http://localhost:5100/products').then((res) => res.json()),
          fetch('http://localhost:5100/orders').then((res) => res.json()),
        ]);

        setData({
          users: usersResponse.length,
          products: productsResponse.length,
          orders: ordersResponse.length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminNavabar />
      <Container>
        <Title>Dashboard</Title>
        <CardGrid>
          <StyledCard>
            <div className="card-title">Product Count</div>
            <div className="card-text">{data.products} Products</div>
            <Link to="/admin/all-products" style={{ textDecoration: 'none' }}>
              <StyledButton>View Products</StyledButton>
            </Link>
          </StyledCard>

          <StyledCard>
            <div className="card-title">User Count</div>
            <div className="card-text">{data.users} Users</div>
            <Link to="/admin/users" style={{ textDecoration: 'none' }}>
              <StyledButton>View Users</StyledButton>
            </Link>
          </StyledCard>

          <StyledCard>
            <div className="card-title">Order Count</div>
            <div className="card-text">{data.orders} Orders</div>
            <Link to="/admin/orders" style={{ textDecoration: 'none' }}>
              <StyledButton>View Orders</StyledButton>
            </Link>
          </StyledCard>

          <StyledCard>
            <div className="card-title">Add Product</div>
            <Link to="/admin/add-product" style={{ textDecoration: 'none' }}>
              <StyledButton style={{ backgroundColor: '#52a447' /* BigBasket green */ }}>
                Add
              </StyledButton>
            </Link>
          </StyledCard>
        </CardGrid>
      </Container>
    </>
  );
};

export default Dashboard;

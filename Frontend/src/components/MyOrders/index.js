import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookies';
import styled from 'styled-components';
import Header from '../Header';

// Styled Components with BigBasket theme
const Container = styled.div`
  padding: 30px;
  margin-top: 10vh;
  font-family: 'Segoe UI', sans-serif;
`;

const Heading = styled.h1`
  font-size: 32px;
  color: #52a447;
  text-align: center;
  margin-bottom: 30px;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderItem = styled.li`
  border: 2px solid ${props => props.status === 'Canceled' ? '#e74c3c' : '#f1c40f'};
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const Strong = styled.span`
  font-weight: bold;
  color: #333;
`;

const Label = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #555;
`;

const MyOrders = () => {
  const userId = Cookies.getItem('userId');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5100/my-orders/${userId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]);

  return (
    <div>
      <Header />
      <Container>
        <Heading>My Orders</Heading>
        <OrderList>
          {orders.map((order) =>
            order.status !== 'Delivered' ? (
              <OrderItem key={order._id} status={order.status}>
                <Label><Strong>Order ID:</Strong> {order._id}</Label>
                <Label><Strong>Name:</Strong> {order.firstname} {order.lastname}</Label>
                <Label><Strong>Phone:</Strong> {order.phone}</Label>
                <Label><Strong>Date:</Strong> {new Date(order.createdAt).toLocaleDateString()}</Label>
                <Label><Strong>Price:</Strong> ₹{order.price}</Label>
                <Label><Strong>Status:</Strong> {order.status}</Label>
                <Label><Strong>Payment Method:</Strong> {order.paymentMethod}</Label>
              </OrderItem>
            ) : null
          )}
        </OrderList>
      </Container>
    </div>
  );
};

export default MyOrders;

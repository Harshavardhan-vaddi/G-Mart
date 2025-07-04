import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookies';
import styled from 'styled-components';
import Header from '../Header';

// 🌿 Theme Color
const green = '#6ba229';
const red = '#ff4b5c';

// Styled Components
const Container = styled.div`
  padding: 40px 20px;
  margin-top: 10vh;
  text-align: start;
  font-family: 'Segoe UI', sans-serif;
`;

const Heading = styled.h1`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${green};
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 900px;
  margin: 0 auto;
`;

const OrderItem = styled.li`
  border: 2px solid ${({ status }) => (status === 'Delivered' ? green : red)};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const Strong = styled.span`
  font-weight: 600;
  display: inline-block;
  min-width: 130px;
  color: #333;
`;

const Text = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #555;
`;

const History = () => {
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
        <Heading>My Order History</Heading>
        <OrderList>
          {orders.map((order) => {
            const isDeliveredOrCanceled =
              order.status === 'Delivered' || order.status === 'Canceled';

            return isDeliveredOrCanceled ? (
              <OrderItem key={order._id} status={order.status}>
                <Text><Strong>Order ID:</Strong> {order._id}</Text>
                <Text><Strong>Name:</Strong> {order.firstname} {order.lastname}</Text>
                <Text><Strong>Phone:</Strong> {order.phone}</Text>
                <Text><Strong>Date:</Strong> {new Date(order.createdAt).toLocaleString()}</Text>
                <Text><Strong>Price:</Strong> ₹{order.price}</Text>
                <Text><Strong>Status:</Strong> {order.status}</Text>
                <Text><Strong>Payment:</Strong> {order.paymentMethod}</Text>
              </OrderItem>
            ) : null;
          })}
        </OrderList>
      </Container>
    </div>
  );
};

export default History;

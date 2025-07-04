import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LoaderSpinner from '../../components/LoaderSpinner';
import AdminNavbar from '../AdminNavbar';

// Styled components
const Container = styled.div`
  max-width: 900px;
  margin: 5vh auto 10vh;
  padding: 0 20px;
  text-align: start;
`;

const Heading = styled.h1`
  color: rgb(62, 62, 62);
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
`;

const OrderCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgb(0 0 0 / 0.15);
  }
`;

const OrderDetail = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#52a447')};
  color: ${(props) => (props.disabled ? '#666' : '#fff')};
  width: 160px;
  padding: 8px 10px;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#3d8534')};
  }
`;

const StatusForm = styled.form`
  margin-top: 15px;

  select {
    padding: 8px 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-right: 15px;
  }
`;

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [statusForm, setStatusForm] = useState({
    status: 'Confirmed',
  });

  useEffect(() => {
    // Simulate loading spinner
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get('http://localhost:5100/orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  };

  const handleStatusChange = (e) => {
    setStatusForm({ status: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5100/orders/${updatingOrderId}`, statusForm)
      .then(() => {
        setUpdatingOrderId(null);
        fetchOrders();
      })
      .catch((err) => console.error(err));
  };

  // Format date nicely
  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  return (
    <>
      <AdminNavbar />
      {isLoading ? (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoaderSpinner />
        </div>
      ) : (
        <Container>
          <Heading>Orders</Heading>
          {orders.length === 0 ? (
            <p>No orders in your shop!</p>
          ) : (
            orders.map((order) => (
              <OrderCard key={order._id}>
                <OrderDetail>
                  <strong>Order ID:</strong> {order._id}
                </OrderDetail>
                <OrderDetail>
                  <strong>Fullname:</strong> {order.firstname} {order.lastname}
                </OrderDetail>
                <OrderDetail>
                  <strong>Phone:</strong> {order.phone}
                </OrderDetail>
                <OrderDetail>
                  <strong>Product ID:</strong> {order.productId}
                </OrderDetail>
                <OrderDetail>
                  <strong>Quantity:</strong> {order.quantity}
                </OrderDetail>
                <OrderDetail>
                  <strong>Total price:</strong> ₹{order.price}
                </OrderDetail>
                <OrderDetail>
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </OrderDetail>
                <OrderDetail>
                  <strong>Address:</strong> {order.address}
                </OrderDetail>
                <OrderDetail>
                  <strong>Created At:</strong> {formatDate(order.createdAt)}
                </OrderDetail>

                {updatingOrderId === order._id ? (
                  <StatusForm onSubmit={onSubmit}>
                    <select value={statusForm.status} onChange={handleStatusChange}>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                    <Button type="submit">Save</Button>
                    <Button
                      type="button"
                      onClick={() => setUpdatingOrderId(null)}
                      style={{ backgroundColor: '#888', marginLeft: '10px' }}
                    >
                      Cancel
                    </Button>
                  </StatusForm>
                ) : (
                  <StatusRow>
                    <OrderDetail>
                      <strong>Status:</strong> {order.status}
                    </OrderDetail>
                    {order.status !== 'Canceled' && order.status !== 'Delivered' ? (
                      <Button onClick={() => {
                        setUpdatingOrderId(order._id);
                        setStatusForm({ status: order.status || 'Confirmed' });
                      }}>
                        Update Status
                      </Button>
                    ) : (
                      <Button disabled>
                        {order.status === 'Canceled' ? 'Customer Canceled' : 'Delivered'}
                      </Button>
                    )}
                  </StatusRow>
                )}
              </OrderCard>
            ))
          )}
        </Container>
      )}
    </>
  );
};

export default Orders;

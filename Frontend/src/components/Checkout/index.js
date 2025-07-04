import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookies';
import Header from '../Header';

// Styled Components
const FormContainer = styled.div`
  width: 600px;
  margin: 12vh auto;
  padding: 30px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', sans-serif;

  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }
`;

const FormHeader = styled.h2`
  font-size: 2rem;
  color: #6ba229;
  text-align: left;
  margin-bottom: 25px;
  font-weight: 700;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #6ba229;
    box-shadow: 0 0 0 2px rgba(107, 162, 41, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #6ba229;
    box-shadow: 0 0 0 2px rgba(107, 162, 41, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #6ba229;
    box-shadow: 0 0 0 2px rgba(107, 162, 41, 0.2);
  }
`;

const Button = styled.button`
  background-color: #6ba229;
  color: #fff;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a9222;
  }
`;

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    quantity: '',
    paymentMethod: 'cod',
    address: '',
  });

  const [productDetails, setProductDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5100/products/${id}`)
      .then((response) => {
        const productData = response.data;
        setProductDetails({
          ...formData,
          productName: productData.productname,
          price: productData.price,
        });
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.getItem('userId');
    const price = productDetails.price;
    const productname = productDetails.productName;

    const formDetails = {
      ...formData,
      user: userId,
      productId: id,
      price,
      productname,
    };

    try {
      await axios.post('http://localhost:5100/orders', formDetails);
      alert('Order placed successfully!');
      setFormData({
        firstname: '',
        lastname: '',
        phone: '',
        quantity: '',
        paymentMethod: 'cod',
        address: '',
      });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <Header />
      <FormContainer>
        <FormHeader>Order Details</FormHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>First Name:</Label>
            <Input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name:</Label>
            <Input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone:</Label>
            <Input
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Quantity:</Label>
            <Input
              type="text"
              name="quantity"
              placeholder="Enter the quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Address:</Label>
            <TextArea
              rows={4}
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Payment Method:</Label>
            <Select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </Select>
          </FormGroup>

          <Button type="submit">Place Order</Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Checkout;

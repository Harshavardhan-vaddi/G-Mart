import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavbar from '../AdminNavbar';

// Styled components
const Container = styled.div`
  max-width: 700px;
  margin: 5vh auto;
  text-align: start;
  background-color: skyblue;
  padding: 20px;
  border-radius: 8px;
`;

const Heading = styled.h1`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: rgb(62, 62, 62);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  min-height: 100px;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;

  &:hover {
    background-color: orangered;
  }
`;

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    rating: '',
  });

  useEffect(() => {
    // Fetch existing product data by ID
    axios.get(`http://localhost:5100/products/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5100/products/${id}`, formData);
      alert('Product updated successfully!');
      navigate('/admin/all-products'); // Redirect after update
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const { productname, description, price, image, category, countInStock, rating } = formData;

  return (
    <div>
      <AdminNavbar />
      <Heading>Update Product</Heading>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="productname">Product Name</Label>
            <Input
              type="text"
              name="productname"
              value={productname}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="rating">Rating</Label>
            <Input
              type="number"
              name="rating"
              value={rating}
              onChange={handleChange}
              placeholder="Enter product rating"
              min="0"
              max="5"
              step="0.1"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
              placeholder="Enter product price"
              min="0"
              step="0.01"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image">Image URL</Label>
            <Input
              type="text"
              name="image"
              value={image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="countInStock">Count in Stock</Label>
            <Input
              type="number"
              name="countInStock"
              value={countInStock}
              onChange={handleChange}
              placeholder="Enter count in stock"
              min="0"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
            />
          </FormGroup>
          <Button type="submit">Update Product</Button>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateProduct;

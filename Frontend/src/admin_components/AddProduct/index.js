import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AdminNavabar from '../AdminNavbar';

const COLORS = {
  green: '#27ae60',
  greenLight: '#2ecc71',
  greyLight: '#f4f6f8',
  textDark: '#3e3e3e',
  buttonHover: '#219150',
};

const Container = styled.div`
  max-width: 900px;
  margin: 5vh auto;
  padding: 30px 25px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: start;
`;

const Heading = styled.h1`
  color: ${COLORS.green};
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${COLORS.textDark};
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 25px;
  transition: border-color 0.3s ease;
  width: 100%;

  &:focus {
    border-color: ${COLORS.green};
    outline: none;
    box-shadow: 0 0 8px ${COLORS.greenLight};
  }
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 15px;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;
  width: 100%;

  &:focus {
    border-color: ${COLORS.green};
    outline: none;
    box-shadow: 0 0 8px ${COLORS.greenLight};
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 25px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  width: 100%;

  &:focus {
    border-color: ${COLORS.green};
    outline: none;
    box-shadow: 0 0 8px ${COLORS.greenLight};
  }
`;

const Button = styled.button`
  padding: 14px 20px;
  background-color: ${COLORS.green};
  color: white;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: ${COLORS.buttonHover};
  }
`;

const InputRowsContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    rating: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5100/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const {
    productname,
    description,
    price,
    image,
    category,
    countInStock,
    rating,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !productname ||
      !description ||
      !price ||
      !image ||
      !category ||
      !countInStock ||
      !rating
    ) {
      return alert('Please fill in all required fields');
    }

    try {
      const response = await axios.post('http://localhost:5100/add-products', {
        productname,
        description,
        price,
        image,
        category,
        countInStock,
        rating,
      });

      alert('Item added successfully');
      console.log('Product added:', response.data);

      setFormData({
        productname: '',
        description: '',
        price: '',
        image: '',
        category: '',
        countInStock: '',
        rating: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div>
      <AdminNavabar />
      <Container>
        <Heading>Add Product</Heading>
        <Form onSubmit={handleSubmit}>
          <InputRowsContainer>
            <FormGroup style={{ flex: '1' }}>
              <Label htmlFor="productname">Product Name</Label>
              <Input
                type="text"
                name="productname"
                id="productname"
                value={productname}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </FormGroup>

            <FormGroup style={{ flex: '1' }}>
              <Label htmlFor="rating">Rating</Label>
              <Input
                type="number"
                name="rating"
                id="rating"
                value={rating}
                onChange={handleChange}
                placeholder="Enter product rating"
                min="0"
                max="5"
                step="0.1"
              />
            </FormGroup>

            <FormGroup style={{ flex: '1' }}>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={handleChange}
                placeholder="Enter product price"
                min="0"
                step="0.01"
              />
            </FormGroup>
          </InputRowsContainer>

          <InputRowsContainer>
            <FormGroup style={{ flex: '1' }}>
              <Label htmlFor="image">Image URL</Label>
              <Input
                type="text"
                name="image"
                id="image"
                value={image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </FormGroup>

            <FormGroup style={{ flex: '1' }}>
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                id="category"
                value={category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.category} value={cat.category || cat}>
                    {cat.category
                      ? cat.category.charAt(0).toUpperCase() + cat.category.slice(1)
                      : typeof cat === 'string'
                      ? cat.charAt(0).toUpperCase() + cat.slice(1)
                      : ''}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup style={{ flex: '1' }}>
              <Label htmlFor="countInStock">Count in Stock</Label>
              <Input
                type="number"
                name="countInStock"
                id="countInStock"
                value={countInStock}
                onChange={handleChange}
                placeholder="Enter count in stock"
                min="0"
                step="1"
              />
            </FormGroup>
          </InputRowsContainer>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </FormGroup>

          <Button type="submit">Add Product</Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddProduct;

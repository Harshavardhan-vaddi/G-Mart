import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const COLORS = {
  green: '#27ae60',
  greenLight: '#2ecc71',
  greyLight: '#f4f6f8',
  textDark: '#3e3e3e',
};

const Container = styled.div`
  max-width: 600px;
  margin: 10vh auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: start;
`;

const Heading = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${COLORS.green};
  margin-bottom: 30px;
  text-transform: uppercase;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${COLORS.textDark};
  margin-bottom: 10px;
  display: block;
`;

const Input = styled.input`
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 25px;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${COLORS.green};
    outline: none;
    box-shadow: 0 0 8px ${COLORS.greenLight};
  }
`;

const Textarea = styled.textarea`
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 15px;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

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
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${COLORS.greenLight};
  }
`;

const AddCategory = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
  });

  const { category, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      return alert('Category is required');
    }

    try {
      const response = await axios.post('http://localhost:5100/add-category', {
        category,
        description,
      });

      console.log('Category added:', response.data);

      setFormData({ category: '', description: '' });
      alert('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category');
    }
  };

  return (
    <Container>
      <Heading>Add Category</Heading>
      <Form onSubmit={handleSubmit} className="shadow p-3">
        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
            placeholder="Enter category"
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </FormGroup>
        <Button type="submit">Add Category</Button>
      </Form>
    </Container>
  );
};

export default AddCategory;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductItem';
import Header from '../Header';

const COLORS = {
  green: '#27ae60',
  greenLight: '#2ecc71',
  orange: '#e67e22',
  orangeLight: '#f39c12',
  greyLight: '#f4f6f8',
  textDark: '#2c3e50',
  textLight: '#7f8c8d',
};

const ProductsContainer = styled.div`
  margin-top: 12vh;
  padding: 20px 30px 40px 30px;
  background-color: ${COLORS.greyLight};
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Heading = styled.h2`
  font-size: 28px;
  color: ${COLORS.green};
  margin-bottom: 25px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding: 0;
  justify-content: flex-start;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  max-width: 280px;
  flex-grow: 1;
  flex-basis: 280px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${COLORS.greenLight};
  border-radius: 25px;
  margin-top: 8px;
  margin-bottom: 20px;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: ${COLORS.orange};
    box-shadow: 0 0 6px ${COLORS.orangeLight};
  }
`;

const CategoryFilter = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${COLORS.greenLight};
  border-radius: 25px;
  margin-top: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: ${COLORS.orange};
  }
  &:focus {
    border-color: ${COLORS.orange};
    box-shadow: 0 0 6px ${COLORS.orangeLight};
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-top: 30px;
  margin-bottom: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  & > div h3 {
    color: ${COLORS.green};
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 6px;
  }
`;

const Products = () => {
  const api = 'http://localhost:5100/products';
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const productName = product?.productname?.toLowerCase() || '';
    const category = product?.category?.toLowerCase() || '';

    const productNameMatchesSearch =
      productName.includes(searchQuery.toLowerCase()) || searchQuery.trim() === '';

    if (selectedCategory === 'all') {
      return productNameMatchesSearch;
    } else {
      return productNameMatchesSearch && category === selectedCategory;
    }
  });

  const categories = [
    ...new Set(products.map((product) => product?.category?.toLowerCase() || 'uncategorized')),
  ];
  categories.unshift('all');

  return (
    <div>
      <Header />
      <ProductsContainer>
        <FiltersContainer>
          <div className="w-100">
            <h3>Search By Product Name</h3>
            <SearchBar
              type="text"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="w-100">
            <h3>Filter By Category</h3>
            <CategoryFilter onChange={handleCategoryChange} value={selectedCategory}>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </CategoryFilter>
          </div>
        </FiltersContainer>

        <Heading>Products</Heading>
        <StyledList>
          {filteredProducts.map((product) => (
            <ListItem key={product._id}>
              <ProductItem
                id={product._id}
                img={product.image}
                name={product.productname}
                description={product.description}
                price={product.price}
              />
            </ListItem>
          ))}
        </StyledList>
      </ProductsContainer>
    </div>
  );
};

export default Products;

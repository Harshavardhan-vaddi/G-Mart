import React from "react";
import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
  LinkButton,
} from "./styledComponents";

const AdminProductItem = ({ id, name, description, price, img, handleDeleteProduct }) => {
  const handleDelete = () => {
    handleDeleteProduct(id);
  };

  return (
    <ProductContainer>
      <ProductImage src={img} alt={name} />
      <ProductName>{name}</ProductName>
      <ProductPrice>${price}</ProductPrice>
      <ButtonContainer>
        <LinkButton to={`/admin/product-update/${id}`}>Update</LinkButton>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </ButtonContainer>
    </ProductContainer>
  );
};

export default AdminProductItem;

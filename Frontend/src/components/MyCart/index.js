import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import Header from "../Header";
import { Link } from "react-router-dom";
import {
  ProductContainer,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductImage,
} from "../ProductItem/styledComponents";

const MyCart = () => {
  const userId = Cookies.getItem("userId");
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    axios
      .get(`http://localhost:5100/cart/${userId}`)
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const handleCancelClick = (productId) => {
    axios
      .delete(`http://localhost:5100/remove-from-cart/${productId}`)
      .then(() => {
        setCartData((prevCartData) =>
          prevCartData.filter((item) => item.productId !== productId)
        );
        getProductsList();
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="mt-24 text-center">
        <h1 className="text-3xl font-bold text-[#52a447]">My Cart</h1>
      </div>

      <div className="container mx-auto px-4 my-6">
        {cartData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">Your cart is empty.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartData.map((product) => (
              <ProductContainer key={product._id} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <ProductImage src={product.image} alt={product.productname} />
                <div className="p-4">
                  <ProductName className="text-xl font-semibold mb-1 text-[#333]">
                    {product.productname}
                  </ProductName>
                  <ProductPrice className="text-[#52a447] font-medium text-lg">
                    ₹{product.price}
                  </ProductPrice>
                  <div className="mt-4 flex justify-between gap-2">
                    <button
                      onClick={() => handleCancelClick(product._id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/order-details/${product._id}`}
                      className="block px-3 py-2 rounded-md text-center font-semibold"
                      style={{
                        backgroundColor: '#52a447',     // BigBasket green
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseEnter={e => e.target.style.backgroundColor = '#3e8836'}
                      onMouseLeave={e => e.target.style.backgroundColor = '#52a447'}
                    >
                      Buy this
                    </Link>


                  </div>
                </div>
              </ProductContainer>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyCart;

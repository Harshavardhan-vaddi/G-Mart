import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  background-color: #fff;
  padding: 60px 0;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
`;

const Heading = styled.h2`
  font-size: 32px;
  color: #6ba229;
  margin-bottom: 20px;
  font-weight: 700;
`;

const ContactInfo = styled.div`
  font-size: 16px;
  color: #444;
  margin-bottom: 20px;
  line-height: 1.6;

  p {
    margin-bottom: 10px;
  }

  strong {
    color: #6ba229;
  }
`;

const ContactUs = () => {
  return (
    <ContactContainer>
      <div
        className="container shadow p-4 rounded"
        style={{
          maxWidth: '600px',
          margin: 'auto',
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
        }}
      >
        <Heading>Contact Us</Heading>
        <ContactInfo>
          <p>
            If you have any questions or need assistance, please don't hesitate to get in touch with us.
          </p>
          <p>
            <strong>Email:</strong> info.grocerymart@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +91 98253 86393
          </p>
        </ContactInfo>
      </div>
    </ContactContainer>
  );
};

export default ContactUs;

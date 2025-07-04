import React from 'react';
import {
  HomeContainer,
  Container,
  CenteredRow,
  ContentColumn,
  Heading,
  Paragraph,
  PrimaryButton
} from "./styledComponents";

import { Link } from 'react-router-dom';
import Footer from '../Footer';
import About from '../About';
import ContactUs from '../Contact';
import Header from '../Header';

const Home = () => {
  const onShop = () => {
    console.log('Shop Now clicked');
  };

  return (
    <div>
      <Header />
      <HomeContainer>
        <Container>
          <CenteredRow>
            <ContentColumn>
              <Heading>Welcome to G-Mart</Heading>
              <Paragraph>
                Fresh groceries delivered to your doorstep — fast, safe, and simple. Enjoy premium quality with a click!
              </Paragraph>
              <PrimaryButton onClick={onShop}>
                <Link to="/shopping" style={{ textDecoration: 'none', color: '#fff' }}>
                  Shop Now
                </Link>
              </PrimaryButton>
            </ContentColumn>
          </CenteredRow>
        </Container>
      </HomeContainer>
      <About />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;

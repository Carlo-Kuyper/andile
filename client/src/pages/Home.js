import axios from 'axios';
import { useEffect, useState } from 'react';
import Cards from '../components/cards/Cards';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderCarousel from '../components/homepage/HeaderCarousel';
import ProductGrid from '../components/homepage/ProductGrid';
import TopItems from '../components/homepage/TopItems';
import { useCart } from '../components/cart/context/CartContext';

import '../components/styling/home.scss'
import cofeebeens from '../devCaf/The Coffee that will keep you going.svg'

const Home = () => {
  const { products, topProducts} = useCart();
 
useEffect(() => {
    document.body.style.backgroundColor = '#1A1A1A';
    return () => {
      document.body.style.backgroundColor = '#3C3C3C';
    };
  }, []);  

  return (
    <>
      <Row>
        <Col md={1}></Col>
          <Col md={10}>
            
            <HeaderCarousel/>
            <Row>
              <Col className='homeText'><br/>
                <h2>THE COFFEE</h2>
                <h3>that will Keep your coding going</h3>
                <br/>
                <p>Welcome to "The Coffee that will Keep your Coding Going" - your ultimate destination for fueling your coding adventures with the perfect cup of java. Dive into our world of meticulously selected coffee blends and specialty brews, crafted to invigorate your coding sessions and keep your creativity flowing. 
                  <br/>
                  <br/>
                  Whether you're debugging lines of code or embarking on ambitious programming projects, our curated collection ensures that you have the essential caffeine companion to power through any challenge. 
                  <br/>
                  <br/>
                  Explore our innovative categories and discover the caffeinated delights that will elevate your coding experience to new heights. It's time to sip, savor, and code with relentless energy - welcome to your coding fuel headquarters!
                </p>
              </Col>
              <Col>
                <img src={cofeebeens} />
              </Col>
            </Row>

          <div className='colection'> 
            <h3>DEV’S DELIGHT MOST TASTY FLAVOURS</h3>
            <div className='line'></div>
          </div>
       
          <TopItems topProducts={topProducts}/>

          <div className='colection'> 
            <h3 style={{marginTop:"2%"}}>Code Blend Collection</h3>
            <div className='line'></div>
          </div>
          <ProductGrid products={products}/>
            
           
          </Col>
        <Col md={1}></Col>
      </Row>
    </>
  );
};

export default Home;
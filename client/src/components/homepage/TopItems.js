import React from "react";
import { useNavigate } from "react-router-dom";
import '../styling/itemCards.scss'

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CoffeeRating from "../cards/extra/CoffeeRating";
import { useCart } from "../cart/context/CartContext";

const TopItems = ({topProducts}) => {
    const navigate = useNavigate();

    const { cart, addToCart, removeFromCart } = useCart();

    const isItemInCart = (productId) => {
      return cart.some(item => item._id === productId);
    };

    const handleCardClick = (product) => {
      navigate(`/DetailPage/${product._id}`, { state: { product } });
    };

    return (
        <div className="top-items-container">
        <Row>
            {topProducts.map((product) => (
                <Col style={{marginBottom:'2%', marginTop:'2%'}} key={product._id} >
                <div className="items-con">
                <Row>
                    <Col>
                    <img onClick={() => handleCardClick(product)} src={product.image} alt={product.name} />
                    <div className="card-coffee-con">
                        <CoffeeRating rating={product.roaststretght} />
                    </div>
                    </Col>
                </Row>
                <Row style={{paddingTop:'20px', paddingBottom:'10px'}}> 
                    <Col md={8}>
                    <div style={{marginLeft:'10px'}}>
                        <p>{product.name}</p>
                        <p style={{fontWeight:'lighter'}}>{product.weight}g</p>
                        <h5>R{product.price}</h5>
                    </div>
                    </Col>
                    <Col style={{textAlign:'right', position:'absolute', bottom:0, right:0, paddingBottom:'10px'}}>
                    <Button
                      style={{backgroundColor: isItemInCart(product._id) ? '#D9534F' : '#FF5E3A', borderColor: isItemInCart(product._id) ? '#D9534F' : '#FF5E3A'}}
                      onClick={() => isItemInCart(product._id) ? removeFromCart(product._id) : addToCart(product)}
                    >
                      {isItemInCart(product._id) ? 'Remove' : 'Add'}
                    </Button>
                    </Col>
                </Row>
                </div>
            </Col>
            ))}
        </Row>
      </div>
    );
  };
  export default TopItems;
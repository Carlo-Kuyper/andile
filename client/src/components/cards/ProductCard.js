import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {
    console.log(product);
    const navigate = useNavigate();

    const navigateToEditPage = () => {
        navigate(`/editPage/${product._id}`, { state: { product } });
    };
  return (
    <div className="product-card" >
        <div className="productCard">
            <Row>
                <Col md={4}>
                    <img src={product.image} alt={product.name} onClick={navigateToEditPage} />
                </Col>
                <Col md={8}>
                <div style={{marginLeft:'10px', marginTop:'5%', float:'left'}}>
                    <p>{product.name}</p>
                    <p style={{fontWeight:'lighter'}}>{product.weight}g</p>
                    <h5>R{product.price}</h5>
                </div>
                </Col>
                <Col style={{textAlign:'right', position:'absolute', bottom:0, right:0, paddingBottom:'10px'}}>
                </Col>
            </Row>

        </div>
    </div>
  );
};

export default ProductCard;
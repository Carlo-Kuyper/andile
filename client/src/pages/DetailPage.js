import { Button, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import '../components/styling/detailedpage.scss'
import CoffeeRating from "../components/cards/extra/CoffeeRating";
import { useCart } from "../components/cart/context/CartContext";

const DetailPage = (props) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const isItemInCart = (productId) => {
    return cart.some(item => item._id === productId);
  };

  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row>
        <Col md={1}> <h4>Back</h4></Col>
        
        <Col md={10}>
          <div style={{height:'50px'}}></div>
          <Row>
            <Col md={8}>
              <div className="itemInfoCon">
                <Row>
                <Col md={6}>
                  <img  src={product.image} alt={product.name} />
                  </Col>

                  <Col style={{position:'relative',}}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    
                    <div style={{position:'absolute', bottom:'2%'}}>
                      <div className="card-coffee-con">
                        <CoffeeRating rating={product.roaststretght} />
                      </div>

                      <h5>In Stock</h5>
                      <p className="smallText">Eligible for next-day delivery or collection.</p>
                      <p className="smallText">Eligible for Cash on Delivery.</p>
                    </div>
                  </Col>
                </Row>
              </div>

            </Col>

            <Col md={4}>
              <div className="selectCon">
                <h1>R{product.price}</h1>
                <Button style={{backgroundColor:'#FF5E3A', border:"none"}} onClick={() => isItemInCart(product._id) ? removeFromCart(product._id) : addToCart(product)}> 
                  {isItemInCart(product._id) ? 'Remove' : 'Add To Cart'}
                </Button>
                <Button>add to fav</Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <div className="productInfo">
                <h2 style={{marginLeft:'2%', paddingTop:'1%'}}>Product Information</h2>
                <div >
                  <Row>
                    <Col className="block1">Brand</Col>
                    <Col className="block2">DevCaf </Col>
                  </Row>
                  <Row>
                    <Col className="block1">Pack Ytpe</Col>
                    <Col className="block2">Single</Col>
                  </Row>
                  <Row>
                    <Col className="block1">Roast</Col>
                    <Col className="block2">Dark</Col>
                  </Row>
                  <Row>
                    <Col className="block1">Flavour</Col>
                    <Col className="block2">Cofee</Col>
                  </Row>
                  <Row>
                    <Col className="block1">Cofee Streangth</Col>
                    <Col className="block2">Bean Stregth 4</Col>
                  </Row>
                  <Row>
                    <Col className="block1">Weight</Col>
                    <Col className="block2">{product.weight}</Col>
                  </Row>
                  <Row>
                    <Col className="block1">Barcode</Col>
                    <Col className="block2">HMJ123TYnd</Col>
                  </Row>
                  
                </div>
              </div>
            </Col>
          </Row>

          {/* <Button>Write a Review</Button> */}
        </Col>

        <Col md={1}></Col>
      </Row>
    </div>
  );
};
  export default  DetailPage;
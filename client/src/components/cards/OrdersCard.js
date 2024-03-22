import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../styling/cart.scss'

const OrdersCard = ({ order }) => {
    console.log(order);
  return (
    <div className="items-con" style={{margin:'20px'}}>
        <Row>
            <Col>
                <div className='textCon'>
                    <h5>Shipping Details:</h5>
                    <p>{order.customerId}</p>
                </div>
            </Col>
            <Col>
                <Row>
                    <div className='textCon'>
                        <h5>Shipping Method</h5>
                        <p>{order.deliveryDate}</p>
                        <p>Dated Ordered: {order.datedOrdered}</p>
                        <p>Dated Shipped{order.deliveryDate}</p>
                    </div>
                </Row>
                <Row>
                    <div className='textCon'>
                        <h5>Payment</h5>
                        <p>Paid: {order.paid}</p>
                        <p>{order.deliveryDate}</p>
                    </div>
                </Row>
            </Col>
            <Col>
                <div className='textCon'>
                    <h5>Order Summary</h5>
                    <Col>
                        <p>{order.products.length} Items</p>
                        <p>Delivery fee</p>
                    </Col>
                    <Col>
                        <p>R {order.total}</p>
                        <p>R 40</p>
                    </Col>
                </div>
            </Col>
        </Row> 
    </div>
  );
};

export default OrdersCard;
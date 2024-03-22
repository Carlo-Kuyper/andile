import React, { useEffect, useState } from 'react';

import "../../styling/cart.scss"
import { Button, Col, Row } from 'react-bootstrap';
import CoffeeRating from '../../cards/extra/CoffeeRating';

const CartCard = ({ item, removeFromCart, updateItemQuantity,  markItemForRemoval, undoRemoveItem  }) => {
    const [quantity, setQuantity] = useState(item.quantity || 1);

    useEffect(() => {
        updateItemQuantity(item._id, quantity);
    }, [quantity, item._id, updateItemQuantity]);
        
    return (
        <div className={`cart-item ${item.isMarkedForRemoval ? 'marked-for-removal' : ''} cart-item-container`}>
            <Row>
                <Col md={6}>
                    <img src={item.image} alt={item.name} />
                </Col>
                <Col md={6}>
                <div style={{ position: 'initial', }}>
                    <Row> 
                        <div>
                            <Col>
                            <Row>
                                <Col>
                                    <h4 style={{float:'left'}}>{item.name}</h4>
                                </Col>
                                <Col>
                                    <p style={{float:'right', fontWeight:'bold', fontSize:'20px'}}>R: {item.price}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10}>
                                    <p style={{ wordWrap:'break-word', fontWeight:'lighter'}}>{item.shortdescription}</p>
                                </Col>
                            </Row>
                            <Row style={{ position: 'absolute', width:'50%', bottom: '25%', }}>
                                <Col md={6}>
                                    <CoffeeRating rating={item.roaststretght} />
                                </Col>
                                <Col md={6} > 
                                    {item.stock > 0 ? (
                                        <>
                                            <select style={{float:'right'}} value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled={!item.stock}>
                                                {Array.from({ length: item.stock }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                                ))}
                                            </select>
                                            <p style={{float:'right', marginRight:'5%'}}>Quantity</p>
                                        </>
                                        ) : (
                                    <p>Out of Stock</p>
                                    )}
                                </Col>
                            </Row>
                            </Col>
                        </div>
                    </Row>
                        <Row>
                            <div style={{ position: 'absolute', width:'50%', bottom: '5%' }}>
                                <Col md={6} style={{float:'left'}}> 
                                    {item.stock > 0 ? (<h5>In Stock</h5>) : (<h5>Out of Stock</h5>)}
                                </Col>
                                <Col md={6} style={{ textAlign: 'right', float:'right'}}>
                                    {!item.isMarkedForRemoval &&(<Button onClick={() => markItemForRemoval(item._id)}>Remove</Button>)}
                                    {item.isMarkedForRemoval && (
                                        <Button onClick={() => undoRemoveItem(item._id)}>Undo</Button>
                                    )}
                                </Col>
                            </div>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CartCard;
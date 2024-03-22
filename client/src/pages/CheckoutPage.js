import React, { useState, useEffect, useContext } from 'react';
import CartCard from '../components/cart/context/CartCard';
import { CartContext, useCart } from '../components/cart/context/CartContext';
import { Button, Col, Row } from 'react-bootstrap';
import TopItems from '../components/homepage/TopItems';
import OrderReview from '../components/cart/OrderReview';
import CardDetails from '../components/cart/orderreviewcomponents/CardDetails';

const CheckoutPage = () => {
  const {deliveryInfo, 
          paymentInfo, 
          cart, 
          removeFromCart, 
          updateItemQuantity,  
          markItemForRemoval, 
          undoRemoveItem, 
          topProducts, 
          setSelectedDeliveryDate, 
          selectedDeliveryDate,
          addressSaved,
          setAddressSaved,
          cardDetailsSubmitted,
          updateCardDetails, 
          updatedPaymentInfo
        } = useCart();

  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [currentStage, setCurrentStage] = useState(false); 

  useEffect(() => {
  }, [selectedDeliveryDate]);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + Math.floor((item.price * item.quantity)), 0);

  
  const handleSubmit = () => {
    setIsReviewVisible(true);
  };

  // Function to update use
  const handleUserProfileUpdate = (profileData) => {
    setUserProfile(profileData);
  };


  
  const handleOrderDetailsUpdate = (details) => {
    setOrderDetails(details);
  };

  // Function to submit data to the database
  const gatherAllCheckoutData = () => {
    const data = {
      deliveryDate: selectedDeliveryDate,
      orderDetails: orderDetails,
      userProfile: userProfile,
    };
    return data;
  };
  
  const handleFinalSubmit = async () => {
    try {
      setCurrentStage(true);
    } catch (error) {
      console.error('Error during final submit:', error);
    }
  };

  const handleSubmitData = async () => {
    const users = localStorage.getItem('user');
    const userId = JSON.parse(users).id

    const userData = {
      cellnr: deliveryInfo.recipientNumber, 
      streetaddress: deliveryInfo.streetAddress, 
      suburb: deliveryInfo.suburb, 
      city: deliveryInfo.city,
      province: deliveryInfo.province, 
      postalcode: deliveryInfo.postalCode,
      cardname: updatedPaymentInfo.cardname,
      cardnr: updatedPaymentInfo.cardnr,
      expirymonth: updatedPaymentInfo.expirymonth, 
      expiryyear: updatedPaymentInfo.expiryyear, 
    };

    const orderData = {
      paid: true, 
      customerId: `${userId}`, 
      products: cart,
      total: totalPrice, 
      datedOrdered: new Date().toISOString(),
      datePacked: '', 
      deliveryMethod: deliveryInfo.method, 
      deliveryDate: selectedDeliveryDate, 
      packedDate: '', 
      shippedDate: '', 
    };
  
    try {
      // Update User Details
      const userResponse = await fetch(`http://localhost:5000/customer/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to update user details');
      }

      const userResult = await userResponse.json();
      console.log('User update success:', userResult);

      // Create Order
      const orderResponse = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderResult = await orderResponse.json();
      console.log('Order creation success:', orderResult);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Row style={{marginTop:'2%'}}>
        <Col md={1}></Col>

        <Col md={7}>
          {!isReviewVisible && (
            <div>
              {cart.length > 0 ? (
                  cart.map(item => (
                    <CartCard key={item._id} item={item} 
                      removeFromCart={removeFromCart} 
                      updateItemQuantity={updateItemQuantity}  
                      markItemForRemoval={markItemForRemoval} 
                      undoRemoveItem={undoRemoveItem}/>
                  ))
                ) : (
                  <div className='noItmes'>
                    <p> 
                      Your cart is empty
                    <br/>
                      So why not get more coffee??
                    </p>
                  </div>
                )}
            </div>
          )}

          {isReviewVisible && !currentStage && (
            <OrderReview
              handleUserProfileUpdate={handleUserProfileUpdate} 
              handleOrderDetailsUpdate={handleOrderDetailsUpdate} 
              setSelectedDeliveryDate={setSelectedDeliveryDate}
              onPayWithCard={handleFinalSubmit}
            />
          )}

          {currentStage && (
            <CardDetails />
          )}

        </Col>
        
        <Col md={3}>
          <div className='summaryCon'>
            <Row>
              <h3>Cart Summary</h3>
            </Row>
            <Row>
              <Col md={8}>
                <h5>Total:</h5>
                <p>({totalQuantity} items)</p>
              </Col>
              <Col md={4}>
                <h4>R{totalPrice}</h4>
              </Col>
            </Row>
            <Row>
              {cart.length <= 0 && (<Button disabled={true}>Add more items first</Button>)}
              {!isReviewVisible && cart.length > 0 && (<Button onClick={handleSubmit}>Submit</Button>)} 
              {isReviewVisible && !currentStage && (<Button onClick={handleFinalSubmit} disabled={!addressSaved}>Pay now</Button>)} 
              {currentStage && (<Button onClick={handleSubmitData} disabled={!(addressSaved && cardDetailsSubmitted)}>Complete Checkout</Button>)} 
            </Row>
          </div>
        </Col>

        <Col md={1}></Col>
      </Row>

    {!isReviewVisible && (
      <Row>
        <Col md={1}></Col>
        <Col md={10} >
          <h3 style={{marginTop:'5%', marginBottom:'2%'}}>DEV’S DELIGHT MOST TASTY FLAVOURS</h3>
          <div style={{backgroundColor:'#1A1A1A', padding:'2%', borderRadius:'5px'}}>
            <TopItems topProducts={topProducts}/>
          </div>
        </Col>
        <Col md={1}></Col>
      </Row>
    )}
    </>
  );
};
  
export default CheckoutPage

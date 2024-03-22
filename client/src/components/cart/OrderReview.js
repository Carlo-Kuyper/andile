import React, { useState } from 'react';
import DeliveryMethod from './orderreviewcomponents/DeliveryMethod';
import DeliveryAddress from './orderreviewcomponents/DeliveryAddress';
import DeliveredBy from './orderreviewcomponents/DeliveredBy';
import PaymentMethod from './orderreviewcomponents/PaymentMethod';

import '../styling/cart.scss'
import { Button } from 'react-bootstrap';
import { useCart } from './context/CartContext';

const OrderReview = (props) => {
  const { setSelectedDeliveryDate } = useCart();

  const [deliveryMethod, setDeliveryMethod] = useState('delivery');  
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { updateDeliveryInfo, updatePaymentInfo } = useCart();

  // Hide show items 
  const [isDeliveryMethodOpen, setIsDeliveryMethodOpen] = useState(true);
  const [isDeliveryAddressOpen, setIsDeliveryAddressOpen] = useState(false);
  const [isDeliveredByOpen, setIsDeliveredByOpen] = useState(false);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);

  const toggleSection = (section) => {
    if (section === 'deliveryMethod') setIsDeliveryMethodOpen(!isDeliveryMethodOpen);
    else if (section === 'deliveryAddress') setIsDeliveryAddressOpen(!isDeliveryAddressOpen);
    else if (section === 'deliveredBy') setIsDeliveredByOpen(!isDeliveredByOpen);
    else if (section === 'paymentMethod') setIsPaymentMethodOpen(!isPaymentMethodOpen);
  };

  // Dilevery Address save 
  const onSaveAddress = (address) => {
    updateDeliveryInfo(address); 
  };

  // Dilevery Method save 
  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
    if (method === 'collect') {
      setIsDeliveryAddressOpen(false);
    }
  };

  // Delivered by Save 
  const onDeliveryDateSelected = (selectedOption) => {
    setSelectedDeliveryDate(selectedOption);
  }

  // Payment Method Save 
  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method); 
  };

  const handleDeliveryInfoChange = (newInfo) => {
    updateDeliveryInfo(newInfo);
  };
  
  // Example of updating payment info
  const handlePaymentInfoChange = (newInfo) => {
    updatePaymentInfo(newInfo);
  };

  return (
    <div>
      <div className="section-header">
        <span className="section-title">Delivery Method</span>
        <span className="section-toggle" onClick={() => toggleSection('deliveryMethod')}>{isDeliveryMethodOpen && 'Change' || 'Close'}</span>
        {!isDeliveryMethodOpen && <p>Delivery Method</p>}
        {isDeliveryMethodOpen && 
          <div className="order-review">
            <Button  onClick={() => handleDeliveryMethodChange('delivery')}>Deliver my Order</Button>
            <Button onClick={() => handleDeliveryMethodChange('collect')}>Collect my Order</Button>
          </div>
        }
      </div>

      <div className="section-header" >
        <span className="section-title">Delivery Address</span>
        <span className="section-toggle" onClick={() => toggleSection('deliveryAddress')}>{isDeliveryAddressOpen && 'Change' || 'Close'}</span>
        {isDeliveryAddressOpen && <p>Delivery address</p>}
        {!isDeliveryAddressOpen &&  <DeliveryAddress onSaveAddress={onSaveAddress} disabled={deliveryMethod === 'collect'} /> }
      
      </div>

      <div className="section-header" >
        <span className="section-title">Delivery by</span>
        <span className="section-toggle" onClick={() => toggleSection('deliveredBy')}>{isDeliveredByOpen && 'Change' || 'Close'}</span>
        {isDeliveredByOpen && <p>Delivered by</p>}
        {!isDeliveredByOpen && deliveryMethod === 'delivery' &&
          <DeliveredBy
            onDeliveryDateSelected={onDeliveryDateSelected}
            disabled={deliveryMethod === 'collect'}
          />
        }
      </div>

      <div className="section-header">
        <span className="section-title">Payment method</span>
        <span className="section-toggle" onClick={() => toggleSection('paymentMethod')}>{isPaymentMethodOpen && 'Change' || 'Close'}</span>
        {isPaymentMethodOpen && <p>payment method by</p>}
        {!isPaymentMethodOpen && <PaymentMethod onPaymentMethodSelected={handlePaymentMethodSelection}/>}
      </div>
    </div>
  );
};

export default OrderReview;
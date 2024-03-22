import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useCart } from '../context/CartContext';


const DeliveredBy = () => {
  const { setSelectedDeliveryDate } = useCart();
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('FASTEST');

  useEffect(() => {
    const today = new Date();
    const twoDaysFromNow = new Date(today.setDate(today.getDate() + 2));
    const threeDaysFromNow = new Date(today.setDate(today.getDate() + 1));

    const options = [
      {
        label: twoDaysFromNow.toDateString(),
        price: 40,
        type: 'FASTEST',
      },
      {
        label: threeDaysFromNow.toDateString(),
        price: 20,
        type: 'STANDARD',
      },
    ];

    setDeliveryOptions(options);
    setSelectedDeliveryDate('FASTEST');
  }, [setSelectedDeliveryDate]);

 
  const handleDeliverySelection = (event) => {
    const selectedOption = deliveryOptions.find(option => option.type === event.target.value);
    setSelectedDeliveryDate(selectedOption);
    setSelectedMethod(event.target.value); 
  };

  return (
    <div className='deliveredByCon'>
      <Row>
        {deliveryOptions.map((option, index) => (
          <Col key={index} > 
            <div className="delivery-option">
              <div className='deliveryType'>{option.type}</div>
              <input
              style={{marginRight:'10px', marginTop:'10px'}}
                type="radio"
                name="deliveryOption"
                value={option.type}
                onChange={handleDeliverySelection}
                checked={selectedMethod === option.type} 
              />
              {option.label}
              
              <div style={{float:'right',  marginTop:'10px'}}>
                R{option.price}
              </div>
          </div>
        </Col>
        ))}
      </Row>
    </div>
  );
};

export default DeliveredBy;
import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const PaymentMethod = ({ onPaymentMethodSelected }) => {
  const { updatePaymentInfo } = useCart();

  const defaultPaymentMethod = 'card';
  const [selectedMethod, setSelectedMethod] = useState(defaultPaymentMethod);

  useEffect(() => {
    const defaultMethod = paymentMethods.find(m => m.id === defaultPaymentMethod);
    setSelectedMethod(defaultMethod);
    onPaymentMethodSelected(defaultMethod);
    updatePaymentInfo(defaultMethod);
  }, []);

  const paymentMethods = [
    { id: 'card', name: 'Credit & Debit Card' },
    { id: 'eft', name: 'EFT with Payfast' },
    { id: 'payflex', name: 'Payflex' },
  ];

  const handleSelectMethod = (event) => {
    const methodId = event.target.value;
    const method = paymentMethods.find(m => m.id === methodId);
    setSelectedMethod(method);
    onPaymentMethodSelected(method); 
    updatePaymentInfo(method); 
  };


  return (
    <div className='paymentCon'>
      <h3>Payment Method</h3>
      {paymentMethods.map((method) => (
        <Row key={method.id}>
            <label >
            <input
              style={{marginRight:'1%'}}
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod !== null && selectedMethod.id === method.id}
              onChange={handleSelectMethod}
            />
            {method.name}
          </label>
        </Row>
      ))}
    </div>
  );
};

export default PaymentMethod;
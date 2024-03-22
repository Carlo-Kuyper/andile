import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const DeliveryAddress = ({ onSaveAddress, disabled }) => {
    const { setAddressSaved } = useContext(CartContext);

  const [userDetails, setUserDetails] = useState({
    cellnr: '',
    city: '',
    email: '',
    name: '',
    postalcode: '',
    province: '',
    streetaddress: '',
    suburb: '',
  });

  useEffect(() => {
    const storedDetails = localStorage.getItem('user');
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setUserDetails({
        ...userDetails,
        cellnr: details.cellnr || '',
        city: details.city || '',
        email: details.email,
        name: details.name,
        postalcode: details.postalcode || '',
        province: details.province || '',
        streetaddress: details.streetaddress || '',
        suburb: details.suburb || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveAddress(userDetails);
    setAddressSaved(true);
  };

  return (
    <form className='addressForm' onSubmit={handleSubmit}>
      <h5>Enter Delivery Address</h5>
      <label>Recipient Name</label>
      <input
        required='true'
        type="text"
        name="name"
        placeholder="Recipient Name"
        value={userDetails.name}
        onChange={handleChange}
        disabled={disabled}
      />
       <label>Recipient Number</label>
      <input
        required='true'
        type="number"
        name="cellnr"
        placeholder="Recipient Number"
        value={userDetails.cellnr}
        onChange={handleChange}
        disabled={disabled}
      />

      <h5>Address</h5>
       <label>Street Address</label>
      <input
        required='true'
        type="text"
        name="streetaddress"
        placeholder="Street Address"
        value={userDetails.streetaddress}
        onChange={handleChange}
        disabled={disabled}
      />
       <label>Suburb</label>
      <input
        required='true'
        type="text"
        name="suburb"
        placeholder="Suburb"
        value={userDetails.suburb}
        onChange={handleChange}
        disabled={disabled}
      />
       <label>City / Town</label>
      <input
        required='true'
        type="text"
        name="city"
        placeholder="City / Town"
        value={userDetails.city}
        onChange={handleChange}
        disabled={disabled}
      />
       <label>Province</label>
      <select required='true' name="province" value={userDetails.province} onChange={handleChange}  disabled={disabled}>
        <option value="">Select Province</option>
        <option value="Gauteng">Gauteng</option>
      </select>
      <label>Postal Code</label>
      <input
        required='true'
        style={{width:'20%'}}
        type="number"
        name="postalcode"
        placeholder="Postal Code"
        value={userDetails.postalcode}
        onChange={handleChange}
        disabled={disabled}
      />
      <div style={{float:'right'}}>
        <Button type="submit" disabled={disabled} onClick={onSaveAddress}>Save Address</Button>
      </div>
    </form>
  );
};

export default DeliveryAddress;
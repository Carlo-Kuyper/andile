import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrdersCard from '../components/cards/OrdersCard';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter(order => {
    // Convert order object to an array of its values
    const orderValues = Object.values(order);
    // Check if any value includes the search term
    return orderValues.some(value => {
      // Ensure value is a string and compare it case-insensitively
      return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });


  return (
    <div>
      <input
        type="text"
        placeholder="Search orders..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        {filteredOrders.map(order => (
          <OrdersCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
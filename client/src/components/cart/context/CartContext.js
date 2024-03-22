import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext(); // This line defines CartContext

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const [updatedPaymentInfo, setUpdatedPaymentInfo] = useState({});
  const [addressSaved, setAddressSaved] = useState(false);
  const [cardDetailsSubmitted, setCardDetailsSubmitted] = useState(false);



  useEffect(() => {
    axios.get('http://localhost:5000/coffees')
      .then(res => {
        setProducts(res.data);
        setTopProducts( res.data.slice(-5));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  // Initialize cart from local storage if available, otherwise set to empty array
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not load cart from local storage.", error);
      return [];
    }
  });

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Update local storage whenever the cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart to local storage.", error);
    }
  }, [cart]);

  const addToCart = (product) => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('You must be logged in to add items to the cart.');
      return;
    }
    const newItem = { ...product, quantity: Number(product.quantity) || 1 };
    setCart(prevCart => [...prevCart, newItem]);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const updateItemQuantity = useCallback((productId, quantity) => {
    setCart(currentCart => {
      return currentCart.map(item => {
        if (item._id === productId) {
          return { ...item, quantity: Number(quantity) };
        }
        return item;
      });
    });
  }, []);
    
  const markItemForRemoval = (productId) => {
    setCart(currentCart => currentCart.map(item => {
      if (item._id === productId) {
        return { ...item, isMarkedForRemoval: true };
      }
      return item;
    }));

    // Set a timeout to actually remove the item after 5 seconds
    setTimeout(() => {
      setCart(currentCart => currentCart.filter(item => item._id !== productId || !item.isMarkedForRemoval));
    }, 5000);
  };

  const undoRemoveItem = (productId) => {
    setCart(currentCart => currentCart.map(item => {
      if (item._id === productId) {
        return { ...item, isMarkedForRemoval: false };
      }
      return item;
    }));
  };

  const handleUserProfileUpdate = (profileData) => {
    setUserProfile(profileData);
  };

  const handleOrderDetailsUpdate = (details) => {
    setOrderDetails(details);
  };

const updateDeliveryInfo = (info) => {
  setDeliveryInfo(info);
};

const updatePaymentInfo = (info) => {
  setPaymentInfo(info);
};

const updateCardDetails = (details) => {
  setUpdatedPaymentInfo(details);
  setCardDetailsSubmitted(true); 
};


  return (
    <CartContext.Provider value={{ 
        cart, 
        clearCart, 
        addToCart, 
        removeFromCart, 
        updateItemQuantity, 
        markItemForRemoval, 
        undoRemoveItem, 
        products, 
        topProducts,
        userProfile,
        orderDetails,
        selectedDeliveryDate,
        handleUserProfileUpdate,
        handleOrderDetailsUpdate,
        setSelectedDeliveryDate,
        deliveryInfo,
        updateDeliveryInfo,
        paymentInfo,
        updatePaymentInfo, 
        addressSaved,
        setAddressSaved,
        updateCardDetails,
        cardDetailsSubmitted,
        setCardDetailsSubmitted,
        updatedPaymentInfo,
        setUpdatedPaymentInfo
      }}>
      {children}
    </CartContext.Provider>
  );
};
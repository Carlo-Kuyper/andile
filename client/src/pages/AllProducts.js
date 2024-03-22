import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/cards/ProductCard';
import { Button, Col, Row } from 'react-bootstrap';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/coffees');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  console.log(products);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectProduct = (productId) => {
    setSelectedProductIds(prevSelectedProductIds =>
      prevSelectedProductIds.includes(productId)
        ? prevSelectedProductIds.filter(id => id !== productId)
        : [...prevSelectedProductIds, productId]
    );
  };

  const handleDelete = async () => {
    if (selectedProductIds.length > 0) {
      try {
        await axios.post('http://localhost:5000/coffees/remove-coffees', {
          ids: selectedProductIds,
        });
        // Remove the deleted products from the state
        fetchProducts();
        setSelectedProductIds([]); // Reset selection
      } catch (error) {
        console.error('Error deleting products:', error);
      }
    }
  };

  const handleCancel = () => {
    setSelectedProductIds([]); // Deselect all products
  };

  return (
    <div>
        <Row> 
            <Col md={8}></Col>
            <Col md={3} className='btnCon' style={{textAlign:'right'}}>
                <Button onClick={handleCancel} disabled={selectedProductIds.length === 0}>
                    Cancel Selected
                </Button>
                <Button onClick={handleDelete} disabled={selectedProductIds.length === 0}>
                    Delete Selected
                </Button>
            </Col>
            <Col md={1}></Col>
        </Row>
       <Row>
            <Col md={1}></Col>

            <Col>
                <Row>
                    {products.map(product => (
                        <Col md={4} key={product._id}>
                            <div style={{backgroundColor:'#2A2A2A', marginBottom:'10%', borderRadius:'10px'}}>
                                <input
                                    style={{float:'right', margin:'2%'}}
                                    type="checkbox"
                                    name="productSelect"
                                    value={product.id}
                                    onChange={() => handleSelectProduct(product._id)}
                                    checked={selectedProductIds.includes(product._id)}
                                />
                                <ProductCard product={product} />
                                
                            </div>
                        </Col>
                    ))}
                </Row>
            </Col>
            
            <Col md={1}></Col>
       </Row>
       
    </div>
  );
};

export default AllProducts;
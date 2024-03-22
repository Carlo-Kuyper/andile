import { Button, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import '../components/styling/detailedpage.scss'
import CoffeeRating from "./cards/extra/CoffeeRating";
import { useCart } from "./cart/context/CartContext";
import { useState } from "react";
import axios from "axios";

const EditPage = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};

    const [formData, setFormData] = useState(product || {});
    const [originalData] = useState(product || {});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/coffees/${formData._id}`, formData);
    //   navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancel = () => {
    // Reset formData to the original data
    setFormData(originalData);
  };

  return (
    <div>
      <Row>
        <Col md={1}></Col>
        
        <Col md={10}>
          <div style={{height:'50px'}}></div>
          <Row>
            <Col md={12}>
              <div className="itemInfoCon2">
                <Row>
                    <Col md={4}>
                        <img src={product.image} alt={product.name} />
                    </Col>
                    <Col md={8}>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6} style={{padding:'2%', paddingRight:'3%'}}>
                                    <Row>
                                        <label htmlFor="name">Name:</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                    <Row>
                                        <label htmlFor="shortdescription">Short Description:</label>
                                        <textarea
                                            id="shortdescription"
                                            name="shortdescription"
                                            value={formData.shortdescription || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                    <Row>
                                        <label htmlFor="description"> Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                    <Row>
                                        <label htmlFor="price">Price:</label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={formData.price || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                    <Row>
                                        <label htmlFor="stock">Stock:</label>
                                        <input
                                            type="number"
                                            id="stock"
                                            name="stock"
                                            value={formData.stock || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                </Col>

                                <Col md={6} style={{padding:'2%', paddingRight:'5%'}}>
                                    <Row>
                                        <label htmlFor="weight">Weight:</label>
                                        <input
                                            type="number"
                                            id="weight"
                                            name="weight"
                                            value={formData.weight || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                    <Row>
                                        <label htmlFor="barcode">barcode:</label>
                                        <input
                                            type="text"
                                            id="barcode"
                                            name="barcode"
                                            value={formData.barcode || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                    <Row>
                                    <label htmlFor="brandtype">brandtype:</label>
                                        <input
                                            type="text"
                                            id="brandtype"
                                            name="brandtype"
                                            value={formData.brandtype || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                    <Row>
                                        <label htmlFor="flavour">flavour:</label>
                                        <input
                                            type="text"
                                            id="flavour"
                                            name="flavour"
                                            value={formData.flavour || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                    <Row>
                                        <label htmlFor="roaststretght">roaststretght:</label>
                                        <input
                                            type="number"
                                            id="roaststretght"
                                            name="roaststretght"
                                            value={formData.roaststretght || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                    <Row>
                                        <label htmlFor="roasttype">roasttype:</label>
                                        <input
                                            type="text"
                                            id="roasttype"
                                            name="roasttype"
                                            value={formData.roasttype || ''}
                                            onChange={handleChange}
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            
                            <div className="btnCon">
                                <Button type="submit">Save Changes</Button>
                                <Button type="submit" onClick={handleCancel}>Cancell Changes</Button>

                            </div>
                           
                        </form>
                        
                    </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>

        <Col md={1}></Col>
      </Row>
    </div>
  );
};
  export default  EditPage;
import axios from 'axios';
import { useEffect, useState } from 'react';
import ItemCards from '../components/ItemCards';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pagination, Dropdown, DropdownButton } from 'react-bootstrap';
import HeaderCarousel from '../components/HeaderCarousel';
import PaginatedCon from '../components/PaginatedCon';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => {
        console.log(res);
        setProducts(res.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

 
  return (
    <>
      <Row>
        <Col md={1}></Col>
          <Col md={10}>
            <Row>Recently Added</Row>
            
            <HeaderCarousel/>
            <h2>THE COFFEE</h2>
            <h3>that will Keep your coding going</h3>
            <p>Welcome to "The Coffee that will Keep your Coding Going" - your ultimate destination for fueling your coding adventures with the perfect cup of java. Dive into our world of meticulously selected coffee blends and specialty brews, crafted to invigorate your coding sessions and keep your creativity flowing. 

              Whether you're debugging lines of code or embarking on ambitious programming projects, our curated collection ensures that you have the essential caffeine companion to power through any challenge. 

              Explore our innovative categories and discover the caffeinated delights that will elevate your coding experience to new heights. It's time to sip, savor, and code with relentless energy - welcome to your coding fuel headquarters!
            </p>


          <PaginatedCon products={products}/>
            
           
          </Col>
        <Col md={1}></Col>
      </Row>
    </>
  );
};

export default Home;


Save this for the future chats. I want to set this up that as the user filles in there info and finally click ' pay with card '  button it send the data to the selected collections. 

 




meaning they can sleect mulitple item and delete them. 

We should utelise this drop down menue for the toggle. and then add a slect button to teh Cards, then utelise teh api call to delete the items based on there id. But we should probably limit it to only being done 
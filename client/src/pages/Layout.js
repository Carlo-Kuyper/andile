import { Outlet, Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartIcon from "../components/cart/context/extra/CartIcon";
import { useCart } from "../components/cart/context/CartContext";
import { useContext, useState } from "react";

import '../components/styling/nav.scss'
import logo from '../devCaf/DevCafe Logo.svg'

import { CartContext } from '../components/cart/context/CartContext';
import { Dropdown } from "react-bootstrap";


const Layout = ({ user, setUser }) => {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const [showLogout, setShowLogout] = useState(false);
  const { clearCart } = useContext(CartContext); 


  const handleLogout = () => {
    localStorage.removeItem('user');
    clearCart();
    setUser(null);
  };

  const handleCheckoutNavigation = (e) => {
    if (!user) {
      e.preventDefault(); 
      alert('You must be logged in to view your cart.');
    }
  };

  return (
    <>
      <nav className="navCon">
        <Row>
          <Col md={1}></Col>

          <Col md={10}> 
            <img className="logo" src={logo} />
            
              <div className="userName">
                {user ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Hi {user.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/allProducts">Manage Products</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/allOrders">View Orders</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <span> <Link className="noDecor" to="/signInSignUp">Sign In/Up</Link></span>
                )}
              </div>

              <div className="links">
                <Link className="noDecor" to="/">Home</Link>
              </div>

              {/* <div className="links">
                <Link className="noDecor" to="/pastOrders">PastOrders</Link>
              </div> */}

              <div className="links cart">
                <Link className="noDecor" to="/checkoutPage" onClick={handleCheckoutNavigation}>
                  <CartIcon style={{width: '7.5%', fill:'#ffffffe1'}}/>
                    {/* Total inque items in the cart */}
                    {/* {cart.length > 0 && <span className="item-count">{cart.length}</span>} */}

                    {/* Total Number of items */}
                    <span>{totalQuantity}</span> 
                </Link>
              </div>
            </Col>

          <Col md={1}></Col>
        </Row>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
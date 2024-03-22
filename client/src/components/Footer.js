import React from 'react';
import './styling/footer.scss'; // Path to your footer stylesheet

const Footer = () => {
  return (
    <footer className="global-footer">
      <div className="container" style={{textAlign:'right'}}>
        <span>{new Date().getFullYear()} @ DevCafe Online (Pty) Ltd.</span>
      </div>
    </footer>
  );
};

export default Footer;
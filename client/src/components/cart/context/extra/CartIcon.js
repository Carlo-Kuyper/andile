import * as React from "react";
const CartIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    id="cart"
    className="icon glyph"
    {...props}
  >
    <path
      d="M22,7.24l-2,8a1,1,0,0,1-.88.76l-11,1H8a1,1,0,0,1-1-.85l-1.38-9v0L5.14,4H3A1,1,0,0,1,3,2H5.14a2,2,0,0,1,2,1.69L7.48,6H21a1,1,0,0,1,.79.38A1,1,0,0,1,22,7.24ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Zm-6,0A1.5,1.5,0,1,0,12,20.5,1.5,1.5,0,0,0,10.5,19Z"
      style={{
        fill: "#ffffffe1",
      }}
    />
  </svg>
);
export default CartIcon;

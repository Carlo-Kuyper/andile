import { Button } from "react-bootstrap";
import { CartContext } from '../context/CartContext'; // Assuming the path to CartContext
import { useContext } from "react";


const CardDetails = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(10), (val, index) => currentYear + index);

    const { updateCardDetails, setCardDetailsSubmitted } = useContext(CartContext);

    const handleSubmit = (event) => {
      event.preventDefault();
      // Collect card details from form inputs
      const cardDetails = {
        cardname: event.target.cardname.value,
        cardnr: event.target.cardnr.value,
        expirymonth: event.target.expirymonth.value,
        expiryyear: event.target.expiryyear.value,
      };
      console.log(cardDetails);
      
      updateCardDetails(cardDetails);
      setCardDetailsSubmitted(true);
    };
    return (
      <div className="addressFormCon" >
 
        <form className='addressForm' onSubmit={handleSubmit}>
        <h3>Add card</h3>
        <label>Name on Card</label>
        <input
            required='true'
            type="text"
            name="cardname"
            placeholder="Name on Card"
        />
        <label>Card Number</label>
        <input
            required='true'
            type="number"
            name="cardnr"
            placeholder="Card Number"
        />
       
        <label>Expiry Date</label>
        <select name="expirymonth" required='true'>
        <option value="">Month</option>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>{month}</option>
        ))}
      </select>
      <select name="expiryyear" required='true'>
        <option value="">Year</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

        <label>CVV</label>
        <input 
          required='true'
          style={{width:'10%'}}
          type="number"
          name="cvv"
          placeholder="CVV"
        />
      
        <div style={{float:'right'}}>
            <Button type="submit">Add Card</Button>
        </div>
        </form>
    </div>
    );
  };
  
  export default CardDetails;
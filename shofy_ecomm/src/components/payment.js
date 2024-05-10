import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navBar';
import Footer from './footer';

const PaymentComponent = () => {
  const [showAlert, setShowAlert] = useState(false);


  const handleProceed = (e) => {
    e.preventDefault();
    setShowAlert(true);
  
    // Send a request to the backend to trigger email sending
    fetch('http://localhost:3001/confirm-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT token in localStorage
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });
  };
  return (
    <div>
      <Navbar />
      <div className="container payment">
        <div className="creditcard">
          <div className="card thecard shadow-lg">
            <div className="card-header top-card">
              <div className="circle"></div>
              <div className="card-title">
                PROCEED PAYMENT
              </div>
            </div>
            <div className="container">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" placeholder="Enter your address" />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" placeholder="Enter your city" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <select className="form-select" id="state">
                      <option selected disabled>Select state</option>
                      <option>Karnataka</option>
                      <option>Andra Pradesh</option>
                    </select>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="pincode" className="form-label">Pin code</label>
                    <input type="text" className="form-control" id="pincode" placeholder="Enter pin code" />
                  </div>
                </div>
              </form>
              <div className="card-body card-info">
                <label htmlFor="cards" className='p-2'> Payment Methods:</label>
                <select className="form-select" id="cards">
                  <option value="creditCard">Credit Card</option>
                  <option value="debitCard">Debit Card</option>
                  <optgroup label="UPI Options">
                    <option value="phonepay">Phonepay</option>
                    <option value="gpay">Gpay</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid form p-3 mt-5 shadow">
          <form action="" method="get">
            <div className="mb-3 row">
              <label htmlFor="cardnumber" className="col-sm-3 col-form-label">Card Number</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="cardnumber" placeholder="1234 5678 9012 3456" />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="cardholder" className="col-sm-3 col-form-label">Card Holder</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="cardholder" placeholder="John Doe" />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="exp" className="col-sm-3 col-form-label">Expiration Date</label>
              <div className="col-sm-9">
                <div className="date d-flex">
                  <select className="form-select me-2" id="month">
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                  </select>
                  <select className="form-select" id="year">
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="cvc" className="col-sm-3 col-form-label">CVC</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="cvc" maxLength="3" size="4" placeholder="123" />
                <div className="form-text">Three or four digits, usually found on the back of the card</div>
              </div>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="termsCheck" />
              <label className="form-check-label" htmlFor="termsCheck">I agree to the terms and conditions</label>
            </div>
            <div className="text-center">
              <button onClick={handleProceed} type="submit" className="btn btn-primary">Proceed</button>
            </div>
          </form>
        </div>
        {showAlert && (
          <div className="alert-container shadow">
            <div className="alert-content">
              <p>Order is confirmed!</p>
              <button onClick={() => setShowAlert(false)} className="btn btn-primary">OK</button>
            </div>
          </div>
        )}
      </div>
      <div className='mt-5 p-5 container-fluid'>
        <Footer />
      </div>
    </div>
  );
};

export default PaymentComponent;

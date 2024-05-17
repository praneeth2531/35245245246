import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentComponent = () => {
  return (
    <div className="container">
      <form className="p-4 rounded shadow">
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
              <option>Tamil Nadu</option>
            </select>
          </div>
          <div className="col-md-2 mb-3">
            <label htmlFor="pincode" className="form-label">Pin code</label>
            <input type="text" className="form-control" id="pincode" placeholder="Enter pin " />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentComponent;

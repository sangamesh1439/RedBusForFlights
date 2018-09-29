import React, { Component } from 'react';
import './FlightView.css';
import booking from '../../components/common/header/images/logo.png';
class FlightView extends Component {
  render() {
    const { flight } = this.props;
    return (
      <div className="card">
        <div className="row">

          <div className="details">
            <p className="price-tag">Rs. {flight.price} ₹</p>
            <p className="flight-id">{flight.id}</p>
            <p>{flight.sourceId} > {flight.destinationId}</p>
            <p>Depart: {flight.depart}</p>
            <p>Arrive: {flight.arrive}</p>
          </div>
          <div className="booking">
            <img className="booking-img" src={booking} alt="" /><br />
            <button className="book-button">Book</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FlightView;

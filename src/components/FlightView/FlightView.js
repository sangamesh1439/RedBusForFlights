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
            <p class="price-tag">Rs. {flight.price} ₹</p>
            <p class="flight-id">{flight.id}</p>
            <p>{flight.source} > {flight.destination}</p>
            <p>Depart: {flight.depart}</p>
            <p>Arrive: {flight.arrive}</p>
          </div>
          <div className="booking">
            <img class="booking-img" src={booking} alt="" />
            <button className="book-button">Book</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FlightView;

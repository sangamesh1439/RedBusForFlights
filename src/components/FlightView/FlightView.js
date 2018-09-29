/*************************************************
 * Code Challange
 *************************************************/
import React, { Component } from 'react';
import './FlightView.css';
import booking from '../../components/common/header/images/logo.png';
import { convertTime } from '../../services/time'
import fightLand from './images/flightLand.png';
import flightTakeoff from './images/flightTakeoff.png';
class FlightView extends Component {
  render() {
    const { oneWay, twoWay, passengers } = this.props;
    let price = parseInt(oneWay.price, 10);
    if (twoWay) {
      price = price + parseInt(twoWay.price, 10);
    }
    return (
      <div className="card">
        <p className="price-tag">Rs. {price} ₹ </p>
        {

          passengers ?
            <p>Total Price:  {price * passengers} ₹ ({price} X {passengers}) </p> : null
        }
        <div className="row">
          <div className="details">
            <img className='flight-icons' src={flightTakeoff} alt='' />
            <p className="flight-id">{oneWay.id}</p>
            <p>Rs. {oneWay.price} ₹</p>
            <p>{oneWay.sourceId} > {oneWay.destinationId}</p>
            <p>Depart: {convertTime(oneWay.depart).hour} : {convertTime(oneWay.depart).minute} </p>
            <p>Arrive: {convertTime(oneWay.arrive).hour} : {convertTime(oneWay.arrive).minute} </p>
          </div>

          {

            twoWay ?
              <div className="details">
                <img className='flight-icons' src={fightLand} alt='' />
                <p className="flight-id">{twoWay.id}</p>
                <p>Rs. {twoWay.price} ₹</p>
                <p>{twoWay.sourceId} > {twoWay.destinationId}</p>
                <p>Depart: {convertTime(twoWay.depart).hour} : {convertTime(twoWay.depart).minute} </p>
                <p>Arrive: {convertTime(twoWay.arrive).hour} : {convertTime(twoWay.arrive).minute} </p>
              </div>
              : null
          }
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

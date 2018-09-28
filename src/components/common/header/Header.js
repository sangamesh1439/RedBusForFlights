import React, { Component } from 'react';
import './Header.css';
import logo from './images/logo.png';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img className="logo" alt="flightIcon" src={logo} />
        <h1>Redbus for Flights</h1>
        <p>By <b>Sangamesh Somawar</b> </p>
        <a href="https://www.linkedin.com/in/sangamesh-somawar-39973a86"> LinkedIn</a>
      </div>
    );
  }
}

export default Header;

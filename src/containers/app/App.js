import React, { Component } from 'react';
import './App.css';
import Header from '../../components/common/header/Header';
import Footer from '../../components/common/footer/Footer';
import Searchbar from '../SearchBar/SearchBar'
import FlightList from '../FlightList/FlightList'
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="side">
            <Searchbar />
          </div>
          <div className="main">
            <FlightList />
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default App;

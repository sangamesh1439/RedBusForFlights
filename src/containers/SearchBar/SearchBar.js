/*************************************************
 * Code Challange
 *************************************************/
import React, { Component } from 'react';
import './SearchBar.css';
import DataList from '../../components/DataList/DataList'
import { getTodaysDate } from '../../services/time'
import { connect } from 'react-redux'
import actions from './actions';

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      way: 1,
      source: '',
      price: 0,
      destination: '',
      departureDate: '',
      returnDate: '',
      passengers: '',
      errors: {}
    }

    this.state = this.initialState;
  }

  validate() {
    const errors = {};
    if (this.state.source === '') {
      errors.source = 'Please Enter Origin City';
    }

    if (this.state.destination === '') {
      errors.destination = 'Please Enter destination City';
    }
    else if (this.state.source === this.state.destination) {
      errors.destination = 'Do you really want to roam around your city in flight ? Please select another city';
    }

    if (this.state.departureDate === '') {
      errors.departureDate = 'Please Select Departure Date ';
    }
    if (this.state.returnDate === '') {

      if (this.state.way === 2) {
        errors.returnDate = 'Please Select Return Date ';
      }
    }
    if (this.state.passengers === '') {
      errors.passengers = 'Please Select Number of Passengers';
    }
    if (Object.keys(errors).length > 0) {
      this.setState({ errors: errors })
      return false
    }
    else {
      this.setState({ errors: {} })

      return true
    }

  }

  render() {
    const { sourceList, destinationList } = this.props;
    return (
      <div>

        <div className="way-buttons">
          <button onClick={() => { this.setState({ 'way': 1 }) }}> One Way</button>
          <button onClick={() => { this.setState({ 'way': 2 }) }}> Return</button>
        </div>

        {
          this.state.way === 1 ? <h3>One way flight search</h3> : <h3>Two way flight search</h3>
        }
        <form>
          {
            this.state.errors.source ?
              <span className='errors'>{this.state.errors.source}</span> : null
          }
          <DataList name={"source"} value={this.state.source} placeholder={"Enter Origin City"} data={sourceList} selected={(source) => {
            this.setState({ source: source })
          }} />

          {
            this.state.errors.destination ?
              <span className='errors'>{this.state.errors.destination}</span> : null
          }
          <DataList name={"destination"} value={this.state.destination} placeholder={"Enter Destination City"} data={destinationList} selected={(destination) => {
            this.setState({ destination: destination })
          }} />
          <label className='label-title' htmlFor='departureDate'>Select Departure Date :</label>
          {
            this.state.errors.departureDate ?
              <span className='errors'>{this.state.errors.departureDate}</span> : null
          }
          <input required type="date" className="date" value={this.state.departureDate} name="departureDate" min={getTodaysDate()} onKeyDown={(e) => { e.preventDefault() }} onChange={(e) => {
            this.setState({ departureDate: e.target.value })
          }} /> <br />

          {
            this.state.way === 2 ?

              <React.Fragment>
                {/* Show Return Date only if Two Way Trip Selected */}
                <label className='label-title' htmlFor='departureDate'>Select Return Date :</label>
                {
                  this.state.errors.returnDate ?
                    <span className='errors'>{this.state.errors.returnDate}</span> : null
                }
                <input disabled={!(this.state.way === 2)} value={this.state.returnDate} type="date" className="date" name="returnDate" min={getTodaysDate()} onKeyDown={(e) => { e.preventDefault() }} onChange={(e) => {
                  this.setState({ returnDate: e.target.value })
                }} /> <br />
              </React.Fragment>

              : null

          }

          {
            this.state.errors.passengers ?
              <span className='errors'>{this.state.errors.passengers}</span> : null
          }
          <select required className="passengers" value={this.state.passengers} onChange={(e) => {
            this.setState({ passengers: e.target.value });
          }}>
            <option value={0}>Please select Number of Passengers</option>
            {
              Array(100).fill(1).map((x, index) => {
                return <option key={index} value={index + 1}>{index + 1}</option>
              })
            }
          </select>

          <label className='label-title' htmlFor='price'>Price: {this.state.price}</label>
          <input type="range" min="0" max="50000" step="1000" value={this.state.price} className="slider" name="price" onChange={(e) => {
            this.setState({ 'price': parseInt(e.target.value, 10) }, () => {

              if (this.validate()) {
                this.props.dispatch(actions.search(this.state));
              }
            });
          }} />

          <div className="way-buttons">
            <button type="submit" onClick={(e) => {
              if (this.validate()) {
                this.props.dispatch(actions.search(this.state));
              }
              e.preventDefault();
            }}> Search</button>
            <button type="button" onClick={(e) => {
              this.setState(this.initialState);
              this.props.dispatch(actions.clear());
              e.preventDefault();
            }}> Clear</button>
          </div>
        </form>
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    sourceList: state.flightsReducer.flights.map((flight) => { return toTitleCase(flight.source) }),
    destinationList: state.flightsReducer.flights.map((flight) => { return toTitleCase(flight.destination) })
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch: dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

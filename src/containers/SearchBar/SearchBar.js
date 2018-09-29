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
      destination: '',
      departureDate: '',
      returnDate: '',
      passengers: ''
    }

    this.state = this.initialState;
  }


  render() {
    const { sourceList, destinationList } = this.props;
    return (
      <div>

        <div className="way-buttons">
          <button onClick={() => { this.setState({ 'way': 1 }) }}> One Way</button>
          <button onClick={() => { this.setState({ 'way': 2 }) }}> Return</button>
        </div>

        <form>
          <DataList name={"source"} placeholder={"Enter Original City"} data={sourceList} selected={(source) => {
            this.setState({ source: source })
          }} />

          <DataList name={"destination"} placeholder={"Enter Destination City"} data={destinationList} selected={(destination) => {
            this.setState({ destination: destination })
          }} />
          <label className='label-title' htmlFor='departureDate'>Select Departure Date :</label>
          <input required type="date" className="date" name="departureDate" min={getTodaysDate()} onKeyDown={(e) => { e.preventDefault() }} onChange={(e) => {
            this.setState({ departureDate: e.target.value })
          }} /> <br />

          {/* Show Return Date only if Two Way Trip Selected */}
          <label className='label-title' htmlFor='departureDate'>Select Return Date :</label>
          <input disabled={!(this.state.way === 2)} type="date" className="date" name="returnDate" min={getTodaysDate()} onKeyDown={(e) => { e.preventDefault() }} onChange={(e) => {
            this.setState({ returnDate: e.target.value })
          }} /> <br />

          <select required className="passengers" onChange={(e) => {
            this.setState({ passengers: e.target.value });
          }}>
            <option value={0}>Please select Number of Passengers</option>
            {
              Array(100).fill(1).map((x, index) => {
                return <option key={index} value={index + 1}>{index + 1}</option>
              })
            }
          </select>

          <div className="way-buttons">
            <button type="submit" onClick={(e) => {
              console.log(actions.search(this.state));
              this.props.dispatch(actions.search(this.state));
              console.log("State : ", JSON.stringify(this.state));
              e.preventDefault();
            }}> Search</button>
            <button type="button" onClick={(e) => {
              this.setState(...this.initialState);
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

import React, { Component } from 'react';
import { connect } from 'react-redux'
import './FlightList.css';
import FlightView from '../../components/FlightView/FlightView'
class FlightList extends Component {
  render() {
    let { flights } = this.props;
    return (
      <div>
        {
          flights.map((flight, index) => {
            return <FlightView key={index} flight={flight} />
            // return <h2>This would be flights details component11</h2>
          })
        }
      </div >
    );
  }
}
function mapStateToProps(state) {
  console.log("my state : ", state);
  console.log("my state : ", state.flightsReducer);
  return { flights: state.flightsReducer.flights }
}

// Maps `dispatch` to `props`:
function mapDispatchToProps(dispatch) {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlightList);

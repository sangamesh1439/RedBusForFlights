/*************************************************
 * Code Challange
 *************************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux'
import './FlightList.css';
import FlightView from '../../components/FlightView/FlightView'
class FlightList extends Component {
  render() {
    const { flights, searchParams } = this.props;
    const way = searchParams.way;
    let journey = `Showing all Filghts`;

    if (way === 1) {
      journey = `${searchParams.source} > ${searchParams.destination}`;
    }
    if (way === 2) {
      journey = `${searchParams.source} > ${searchParams.destination} > ${searchParams.source}`;
    }
    return (
      <div>
        <h1>{journey}</h1>

        {
          way === 2 ?
            flights.map((flight, index) => {
              return <FlightView key={index} oneWay={flight[0]} twoWay={flight[1]} />
              // return <h2>This would be flights details component11</h2>
            })
            :

            flights.map((flight, index) => {
              return <FlightView key={index} oneWay={flight} />
              // return <h2>This would be flights details component11</h2>
            })
        }
      </div >
    );
  }
}
function mapStateToProps(state) {
  return {
    flights: state.flightsReducer.filteredFilghts,
    searchParams: state.flightsReducer.searchParams
  }
}

function mapDispatchToProps() {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(FlightList);

import React, { Component } from 'react';
import './SearchBar.css';
import DataList from '../../components/DataList/DataList'
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      way: 1
    }
  }


  render() {

    let data = ["one", "two", "three"];
    return (
      <div>

        <div className="way-buttons">
          <button onClick={() => { this.setState({ 'way': 1 }) }}> One Way</button>
          <button onClick={() => { this.setState({ 'way': 2 }) }}> Return</button>
        </div>

        <form>

          <DataList name={"orginalCity"} placeholder={"Enter Original City"} data={data} selected={(orginalCity) => {
            this.setState({ orginalCity: orginalCity })
          }} />

          <DataList name={"destinationCity"} placeholder={"Enter Destination City"} data={data} selected={(destinationCity) => {
            this.setState({ destinationCity: destinationCity })
          }} />

          <input type="date" placeholder="departureDate" onChange={(e) => {
            this.setState({ departureDate: e.target.value })
          }} /> <br />

          {/* Show Return Date only if Two Way Trip Selected */}
          {
            this.state.way === 1 ?
              null
              :
              <React.Fragment>
                <input type="date" name="returnDate" onChange={(e) => {
                  this.setState({ returnDate: e.target.value })
                }} /> <br />
              </React.Fragment>
          }

          <select onChange={(e) => {
            this.setState({ passengers: e.target.value });
          }}>
            <option value={0}>Passengers</option>
            {
              Array(100).fill(1).map((x, index) => {
                return <option key={index} value={index + 1}>{index + 1}</option>
              })
            }
          </select>

          <button type="button" onClick={(e) => {
            console.log("State : ", this.state);
            e.preventDefault();
          }}> Search</button>

        </form>
      </div >
    );
  }
}

export default SearchBar;

import React, { Component } from 'react';
import './SearchBar.css';
import DataList from '../../components/DataList/DataList'
import { getTodaysDate } from '../../services/time'
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
          <DataList name={"source"} placeholder={"Enter Original City"} data={data} selected={(source) => {
            this.setState({ source: source })
          }} />

          <DataList name={"destination"} placeholder={"Enter Destination City"} data={data} selected={(destination) => {
            this.setState({ destination: destination })
          }} />
          <label className='label-title' htmlFor='departureDate'>Select Departure Date :</label>
          <input required type="date" className="date" name="departureDate" min={getTodaysDate()} onKeyDown={(e) => { e.preventDefault() }} onChange={(e) => {
            this.setState({ departureDate: e.target.value })
          }} /> <br />

          {/* Show Return Date only if Two Way Trip Selected */}
          {
            this.state.way === 1 ?
              null
              :
              <React.Fragment>
                <label className='label-title' htmlFor='departureDate'>Select Return Date :</label>
                <input type="date" className="date" name="returnDate" min={getTodaysDate()} onKeyDown={(e) => { e.preventDefault() }} onChange={(e) => {
                  this.setState({ returnDate: e.target.value })
                }} /> <br />
              </React.Fragment>
          }

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
              console.log("State : ", JSON.stringify(this.state));
              e.preventDefault();
            }}> Search</button>
          </div>

        </form>
      </div >
    );
  }
}

export default SearchBar;

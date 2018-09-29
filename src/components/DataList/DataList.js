import React, { Component } from 'react';
import './DataList.css';
class DataList extends Component {
  render() {
    let { name, placeholder, data, selected } = this.props;
    return (
      <div className="">
        <input className="data-list" list={name} placeholder={placeholder} onChange={(e) => { selected(e.target.value) }} />
        <datalist id={name} >
          {
            data.map((item, index) => {
              return <option key={index} value={item} />
            })
          }
        </datalist>
      </div>
    );
  }
}

export default DataList;

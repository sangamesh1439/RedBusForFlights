import React, { Component } from 'react';
import './DataList.css';
class DataList extends Component {
  render() {
    let { name, placeholder, label, data, value, selected } = this.props;
    return (
      <div className="">
        {label ?
          <label>{label}</label>
          : null}
        <input required className="data-list" list={name} placeholder={placeholder} value={value} onChange={(e) => { selected(e.target.value) }} />
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

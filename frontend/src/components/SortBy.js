import React, { Component } from 'react';
 import { MdUnfoldMore }  from 'react-icons/md';
class SortBy extends Component {
  state={
    value: ""
  }

  /**
   * Function to hande change in select element
   * @param {object} e - The event object 
   */
  handleChange = e => {
    const { handleSorting } = this.props;
    this.setState(
      () => ({
      value: e.target.value,
      }),
      () => {
        const { value } = this.state;
        handleSorting(value);
      }
    ); 
  }
  render() {
    const {value} = this.state;
    return (
      <div className="sort-wrapper">
        <select onChange={this.handleChange} value={value}>
          <option value="" disabled>Sort By</option>
          <option value="timestamp-desc">Newest</option>
          <option value="timestamp-asc">Oldest</option>
          <option value="voteScore-desc">High Score</option>
          <option value="voteScore-asc">Low Score</option>
        </select>
        <span className="arrow"><MdUnfoldMore className='sort-icon'/></span>
      </div>
    )
  }
}
export default SortBy;
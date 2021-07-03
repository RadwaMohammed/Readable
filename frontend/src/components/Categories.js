import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { FaList } from "react-icons/fa";
import { SiReact, SiRedux, SiUdacity } from "react-icons/si";


class Categories extends Component {
  render() {
    const  {categories} = this.props;
    const navIcons = {
      'react': <SiReact />,
      'redux': <SiRedux />,
      'udacity': <SiUdacity />
    };
    return (
      <Nav variant="pills" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link as={NavLink} exact to='/' activeClassName="active"><FaList /> All Categories</Nav.Link>
        </Nav.Item>
        {
          categories.map(category => 
            <Nav.Item key={category.name}>
              <Nav.Link as={NavLink} exact to={`/${category.path}`} activeClassName="active">
                {navIcons[category.name]} {category.name}
              </Nav.Link>
            </Nav.Item>
          )
        }
        
      </Nav>
    )
  }
}

/**
 * The mapStateToProps function - get the state parts that Categories component needs
 * @param {Object} state - The state of the store 
 * @param {object} state.categories - The categories slice of the state 
 * @returns {object} An object containing categories {array} 
 */
 const mapStateToProps = ({ categories }) => ({
  categories: Object.values(categories),
});


export default connect(mapStateToProps)(Categories);
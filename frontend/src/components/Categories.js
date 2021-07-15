import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { MdFormatListBulleted } from "react-icons/md";
import { SiReact, SiRedux, SiUdacity } from "react-icons/si";


class Categories extends Component {
  render() {
    const {categories} = this.props;
    const navIcons = {
      'react': <SiReact className="nav-icon" />,
      'redux': <SiRedux className="nav-icon" />,
      'udacity': <SiUdacity className="nav-icon" />
    };
    return (
      <Nav variant="pills" defaultActiveKey="/" className="categories-nav">
        <Nav.Item>
          <Nav.Link 
            as={NavLink} 
            exact 
            to="/" 
            activeClassName="active"
          >
            <MdFormatListBulleted className="nav-icon" />All
          </Nav.Link>
        </Nav.Item>
        {
          categories.map(category => 
            <Nav.Item key={category.name}>
              <Nav.Link 
                as={NavLink} 
                exact 
                to={`/${category.path}`} 
                activeClassName="active"
              >
                {navIcons[category.name]}{category.name}
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
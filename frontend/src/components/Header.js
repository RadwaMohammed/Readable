import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

function Header() {
  return (
    <Link to='/' className="header-link">
      <FaHome className="home-icon" /> Readable
    </Link>
  )
}
export default Header;

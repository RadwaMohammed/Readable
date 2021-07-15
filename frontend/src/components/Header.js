import React from 'react';
import { Link } from 'react-router-dom';
import { FaReadme } from "react-icons/fa";

function Header() {
  return (
    <h1>
      <Link to='/' className="header-link">
        <FaReadme className="header-icon" />Readable
      </Link>
    </h1>
  )
}
export default Header;

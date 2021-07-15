import React from 'react';
import Container from 'react-bootstrap/Container';
import { BsExclamationTriangleFill, BsArrowReturnLeft } from "react-icons/bs";

export default function NotFound(props) {
  return (
    <Container className="not-found-wrapper">
      <button type="button" className="back-btn" onClick={props.history.goBack}>
        <BsArrowReturnLeft /> Back
      </button>
      <div className="not-found">
        <p><BsExclamationTriangleFill className="icon" />404</p>
        <p>Not Found</p>
      </div>
    </Container>
  )
}

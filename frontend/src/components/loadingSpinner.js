import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

function LoadingSpinner() {
  return (
    <Container className="center-loader">
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow"  size="sm"/>
      <Spinner animation="grow" />
      <Spinner animation="grow"  size="sm"/>
      <Spinner animation="grow" size="sm" />
    </Container>
  )
}

export default LoadingSpinner;
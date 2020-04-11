import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'

const Main = () => {
  let player = "Matisse Thybulle";
  const  [hasError, setErrors] =  useState(false);
  const  [prediction, setprediction ]= useState({});

  async function fetchData() {
    const res = await fetch(`http://localhost:3001/predict/${player}`);
    res
      .json()
      .then(res => setprediction(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });

  return(
    <Card border="light" style={{ borderRadius: '15px'}}>
    <Card.Body>
      <Card.Title>{player}</Card.Title>
      <Card.Text>
        {player} has a {JSON.stringify(prediction)}% of making an all defense team.
      </Card.Text>
    </Card.Body>
  </Card>
  );
}

export default Main;

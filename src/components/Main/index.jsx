import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';

const Main = () => {
  // let player = "Matisse Thybulle";
  const  [message, setMessage] =  useState(false);
  const  [rookies, setRookies] = useState(false);
  const  [hasError, setErrors] =  useState(false);
  const  [prediction, setprediction ]= useState({});

  async function fetchData(player) {
    const res = await fetch(`http://localhost:3001/predict/${player}`);
    res
      .json()
      .then(res => setprediction(res.map(v => ({
        label: v,
        value: v
       })))
      )
      .catch(err => setErrors(err));
  }

  async function fetchRookies() {
    const res = await fetch(`http://localhost:3001/rookies`);
    res
      .json()
      .then(res => setRookies(res))
      .catch(err => setErrors(err));
      return rookies['rookies']
  }
  
  function generatePlayerMessage(player){
    fetchData(player);
    setMessage(`${player} has a ${JSON.stringify(prediction)}% of making an all defense team.`);
  }

  const options = [
    {"value": "Nickeil Alexander-Walker", "label": "Nickeil Alexander-Walker"}, {"value": "RJ Barrett", "label": "RJ Barrett"}, {"value": "Darius Bazley", "label": "Darius Bazley"}
  ]

  return(
    <Card border="light" style={{ borderRadius: '15px'}}>
    <Card.Body>
      <Card.Title>Select a Player</Card.Title>
      
      <Select
      onChange={e=>(generatePlayerMessage(e['value']))}
      options={fetchRookies()} />
      <Card.Text>
        {message}
      </Card.Text>
    </Card.Body>
  </Card>
  );
}

export default Main;

import React from "react";
import styles from "./main.module.css";
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const Main = () => {
  return(
    <Card border="light" style={{ borderRadius: '15px'}}>
    <Card.Body>
      <Card.Title>Select Person</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
  );
}

export default Main;

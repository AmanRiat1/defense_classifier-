import React, { useState, useEffect } from 'react';
import {Card, Image} from 'react-bootstrap'
import {Col, Row, Container } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Circle from 'react-circle';

const Main = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rookies, setRookies] = useState([]);
  const [selectedRookie, setSelectedRookie] = useState('');
  const [defenseProbability, setDefenseProbability] =  useState();
  const [thumbnail, setThumbnail] = useState('');

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:3001/rookies")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRookies(result.rookies);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const getPlayerImage = (name) => {
    fetch(`http://localhost:3001/player-image/${name}`)
      .then(res => res.json())
      .then(
        (result) => {
          setThumbnail(result.imageLink);
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      )
  }

  const getPlayerPrediction = (name) =>{
    fetch(`http://localhost:3001/predict/${name}`)
      .then(res => res.json())
      .then(
        (result) => {
          setDefenseProbability(result.playerPrediction);
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      )

  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return(
      <Container fluid>
        <Card border="light" style={{ borderRadius: '15px'}}>
        <Card.Body className="text-center">
          <Card.Title>Select a Player</Card.Title> 
          <br></br>
          <Autocomplete
                onChange={(event, newSelectedRookie) => {
                  console.log(newSelectedRookie);
                  setSelectedRookie(newSelectedRookie);
                  getPlayerImage(newSelectedRookie);
                  getPlayerPrediction(newSelectedRookie);
                }}
                id="combo-box-demo"
                options={rookies}
                style={{ width: 500  }}
                renderInput={(params) => <TextField {...params}  variant="outlined" />}
          />
          <br></br>
          <Row>
            <Col><Image src={thumbnail} style = {{"border": '1px solid black'}} rounded /></Col>
            <Col >
              <div style={{justifyContent: "center"}}>
                <Circle
                  animate={true} // Boolean: Animated/Static progress
                  responsive={true} // Boolean: Make SVG adapt to parent size
                  size={150} // Number: Defines the size of the circle.
                  lineWidth={14} // Number: Defines the thickness of the circle's stroke. 
                  progress={defenseProbability} // Number: Update to change the progress and percentage.
                  progressColor="teal"  // String: Color of "progress" portion of circle.
                  bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                  textColor="black" // String: Color of percentage text color.
                  textStyle={{ 
                    font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                  }}
                  percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                  roundedStroke={true} // Boolean: Rounded/Flat line ends
                  showPercentage={true} // Boolean: Show/hide percentage.
                  showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                  />
                </div>
              </Col>
          </Row>
        </Card.Body>
        </Card>
      </Container>
     
    );
  }


}

export default Main;

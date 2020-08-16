import React, { useState, useEffect } from 'react';
import {Card, Image} from 'react-bootstrap'
import {Col, Row, Container } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Circle from 'react-circle';
import { makeStyles } from "@material-ui/core/styles";
import { PatchQuestion } from 'react-bootstrap-icons';

/**
 * Components that renders the main card pertaining information to the player's probability of making an all defense team
 * @param {props} any contains properties to change card color/text
 * @return JSX Fragment that defines the structure of the card displaying content
 */
const ContentCard = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rookies, setRookies] = useState([]);
  const [defenseProbability, setDefenseProbability] =  useState();
  const [thumbnail, setThumbnail] = useState("0");

  useEffect(() => {
    fetch("http://localhost:3001/rookies")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRookies(result.rookies);
        },
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
        (error) => {
          setThumbnail("0");
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
        (error) => {
          setDefenseProbability("0");
        }
      )

  }

  const useStyles = makeStyles(theme => ({
    inputRoot: {
      color: props.currentTheme.text,
      "&  .MuiOutlinedInput-notchedOutline": {
        borderColor: props.currentTheme.text
      },
    }
  }));
  
  const classes = useStyles();

  const getPlayerIcon = () =>{
    if (thumbnail === "0"){
      return <PatchQuestion size={180}/>;
    }else{
      return (<Image src={thumbnail} style = {{"border": '1px solid black'}} rounded />);
    }
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return(
      <Container fluid>
        <Card style={{ borderRadius: '15px', backgroundColor: props.currentTheme.contentColor}}>
        <Card.Body className="text-center">
          <Card.Title>Select a 2019-20 NBA Rookie</Card.Title> 
          <br></br>
          <Autocomplete
            classes={classes}
            onChange={(event, newSelectedRookie) => {
              getPlayerImage(newSelectedRookie);
              getPlayerPrediction(newSelectedRookie);
            }}
            id="combo-box-demo"
            options={rookies}
            renderInput={(params) => <TextField {...params}  variant="outlined" />}
          />
          <br></br>
          <Row>
            <Col>{getPlayerIcon()}</Col>
            <Col >
              <div style={{justifyContent: "center"}}>
                <Circle
                  lineWidth={14} 
                  size={200}
                  progress={defenseProbability} 
                  progressColor="maroon"  
                  bgColor="moccasin" 
                  textColor={props.currentTheme.text}
                  textStyle={{ 
                    font: 'bold 5rem Oswald , Arial, sans-serif' 
                  }}
                  roundedStroke={true} 
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

export default ContentCard;
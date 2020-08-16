import React from "react";
import {Navbar, Nav, Row, Col } from 'react-bootstrap'
import Switch from '@material-ui/core/Switch';

/**
 * Components that renders the navbar 
 * @param {props} any contains method to toggle themes and properties to change navbar color/text
 * @return JSX Fragment that defines the structure of the navbar
 */
const NavBar = (props) => {
  return (
    <Navbar style={{backgroundColor: props.currentTheme.contentColor}}>
      <Navbar.Brand style={{ fontSize : "25px", color: props.currentTheme.text}} href="#home">Aman Riat</Navbar.Brand>
      <Nav className="ml-auto">
        <Row>
          <Col>Light<Switch onChange={props.toggleTheme} inputProps={{ 'aria-label': 'primary checkbox' }}/>Dark</Col>
        </Row>
      </Nav>
    </Navbar>
  );
}
export default NavBar;

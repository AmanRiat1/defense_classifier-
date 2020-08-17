import React from "react";
import {Navbar, Nav, Row, Col } from 'react-bootstrap'
import Switch from '@material-ui/core/Switch';
import ReactLogo from "./bball.svg"
import { GoMarkGithub } from "react-icons/go";

/**
 * Components that renders the navbar 
 * @param {props} any contains method to toggle themes and properties to change navbar color/text
 * @return JSX Fragment that defines the structure of the navbar
 */
const NavBar = (props) => {
  return (
    <Navbar variant={props.currentTheme.text === "#363537" ? "light" : "dark"} expand="lg" style={{backgroundColor: props.currentTheme.contentColor}}>
      <Row>
        <Col>
      <Navbar.Brand style={{color: props.currentTheme.text}} href="#home">
        <img
          alt=""
          src={ReactLogo}
          width="30"
          height="30"
          className="logo d-inline-block align-top"
        />{' '}
        All Defensive Team Classifier
      </Navbar.Brand>
      </Col>
      </Row>
      <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link variant="dark" href="https://github.com/AmanRiat1/nba_all_defense_classifier" target="_blank">
            <GoMarkGithub size={24} className="mr-sm-2" style={{float: "left"}}/> Github
          </Nav.Link>
        </Nav>
        <Row>
          <Col>Light<Switch onChange={props.toggleTheme} inputProps={{ 'aria-label': 'primary checkbox' }}/>Dark</Col>
        </Row>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;

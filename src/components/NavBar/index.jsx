import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import {Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
const NavBar = () => {
  
  return (
    <Navbar bg="light" >
      <Navbar.Brand style={{paddingLeft : "20px", fontSize : "25px"}} href="#home">Aman Riat</Navbar.Brand>
      <Nav style={{paddingRight : "20px"}} className="ml-auto">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Light</Grid>
          <Grid item>
          <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />
          </Grid>
          <Grid item>Dark</Grid>
        </Grid>
      </Nav>
    </Navbar>
  );
}
export default NavBar;

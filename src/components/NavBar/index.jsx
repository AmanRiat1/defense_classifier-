import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
const NavBar = () => {
  return (
    <React.Fragment>
      <nav className={styles.nav}>
        <div>
          <Link className="navbar-brand" to="/">
            NBA All Defense Classifier
          </Link>
        </div>
        <div className={styles.date_text}>
          <b>Aman Riat</b>
        </div>
        <div> 
          <p>light and dark mode</p>
        </div>
      </nav>
    </React.Fragment>
  );
}
export default NavBar;

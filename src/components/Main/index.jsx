import React from "react";
import styles from "./main.module.css";

const Main = () => {
  return(
    <main id="mainContent">
      <div className={styles.main}>
        <p>This is placeholder text. Your web app description goes here.</p>
        <a
          href="https://github.com/Microsoft/WebTemplateStudio"
          className="btn btn-primary my-2"
        >
          Link to our Github
        </a>
       </div>
    </main>
  );
}
export default Main;

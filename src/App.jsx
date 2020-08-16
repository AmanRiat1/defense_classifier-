import React, { useState} from 'react';
import "./App.css";
import NavBar from "./components/NavBar";
import ContentCard from "./components/ContentCard";
import GlobalStyles from "./components/Globalstyle/globalStyles.js";
import { lightTheme, darkTheme } from "./components/Themes/theme.js"
import {ThemeProvider} from "styled-components";

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const themeToggler = () => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme)
  }
  return (
    <ThemeProvider theme={theme}>
    <>
    <GlobalStyles/>
    <div>
      <div><NavBar toggleTheme={themeToggler} currentTheme={theme}/></div>
      <main className="container center">
        <ContentCard currentTheme={theme}/>
      </main>
    </div>
    </>
    </ThemeProvider>
  );
}

export default App;
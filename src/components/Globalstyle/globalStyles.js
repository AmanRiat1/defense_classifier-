import { createGlobalStyle} from "styled-components"
const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Oswald, sans-serif;
  }
  `

export default GlobalStyles;
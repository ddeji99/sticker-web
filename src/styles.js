import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    fontColor: "#2c2c2c",
    bgColor: "#fafafa",
    };
    
export const darkTheme = {
      fontColor: "##fafafa",
      bgColor: "#2c2c2c",
    };


export  const GlobalStyles = createGlobalStyle`
${reset}
        body {
            font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif;
            background-color: #fff;
        }

        input{
            outline:none;
            border:none;
          }
          a{
            color:inherit;
            text-decoration: none;
          }
    `;
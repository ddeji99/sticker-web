import styled from "styled-components";

const Input = styled.input`
height: 45px;
padding-left: 22.5px;
margin-bottom: 20px;
display: block;

border: 1px solid #dadada;
border-radius: 300px;
background: none;

color: #000;
transition: border 150ms cubic-bezier(0.4,0,0.2,1);
border: 1.5px solid 
${(props) => (props.hasError ? "tomato" : "rgb(219, 219, 219)" )};

&:focus {
  outline: none;
  border: 1.5px solid #1875FF;
  background-color: #fff !important;
}
&:valid {
  outline: none;
  border: 1.5px solid #1875FF;
  background-color: #fff !important;
}

@media (pointer:coarse) {
  height:  57px;
  border: solid 2px #9e9e9e;
  font-size: 2em;
  margin-bottom: 24px;
}
`;

export default Input;
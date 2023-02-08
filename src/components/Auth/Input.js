import styled from "styled-components";

/*// const Input = styled.input`
// width: 100%;
// border-radius: 3px;
// padding: 7px;
// background-color: #fafafa;
// border: 0.5px solid 
// ${(props) => (props.hasError ? "tomato" : "rgb(219, 219, 219)" )};
// margin-top: 5px;
//   font-size: 12px;
// }
// `;/*/

const Input = styled.input`
  height: 40px;
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

  @media all and (max-width:767px) {
    height: 40px;
    border: solid 1px #9e9e9e;
    font-size: 14px !important;
    margin-bottom: 10px;
    &:focus {
      border: 1px solid #1875FF;
    }
    &:valid {
      border: 1px solid #1875FF;
    }
  }
`;



export default Input;
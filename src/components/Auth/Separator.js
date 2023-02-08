import styled from "styled-components";

const SSeparator = styled.div`
  margin: 45px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
    }
  @media screen and (max-width: 1000px) {
    margin: 10px 0px 10px 0px;
  }
`;

function Separator() {
    return(
        <SSeparator>
        <div></div>
        <div></div> 
        </SSeparator>
    );
}

export default Separator;
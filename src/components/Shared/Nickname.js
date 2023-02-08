import styled from "styled-components";




const Container = styled.span`
  width: 115px;
  font-size: ${(props) => props.size};

  display: block;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  
  

  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: #000;
  font-size: 13px;
  letter-spacing: 0px;
  line-height: 15px;
  text-align: left;
  font-weight: 400;
  font-style: normal;
  font-family: "Noto Sans KR", sans-serif;
  
  &:hover {
    text-decoration: ${(props) => (props.textDecoration === "true" ? "underline" : "none")};
  }
`;


const Nickname = ({ nickname, size, textDecoration }) => {
    return (
      <Container size={size} textDecoration={textDecoration}>
        {nickname}
      </Container>
    );
  };
  
  export default Nickname;
 
  
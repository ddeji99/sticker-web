import styled from "styled-components";




const Container = styled.span`
  font-size: ${(props) => props.size};
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
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
 
  
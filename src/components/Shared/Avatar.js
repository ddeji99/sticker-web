import styled from "styled-components";





const Image = styled.img`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 1px solid #DBDBDB;
  border-radius: 50%;
  margin: 0 5px 0 0;
  @media (pointer:coarse) {
   width: 5vh;
   height: 5vh;
  }
  
`;

const Avatar = ({ size, Avatarurl }) => {
  return <Image size={size} src={Avatarurl} alt="" />;
};

export default Avatar;


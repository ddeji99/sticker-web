import styled from "styled-components";





const Image = styled.img`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 1px solid #DBDBDB;
  border-radius: 50%;
  margin: 0 5px 0 0;
`;

const Avatar = ({ size, Avatarurl }) => {
  return <Image size={size} src={Avatarurl} alt="" />;
};

export default Avatar;


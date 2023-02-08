import styled from "styled-components";





const Image = styled.img`
  width: 36px;
  height: 36px;
  aspect-ratio: 1 / 1;
  background-image: url(/* background-image.jpg */);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Avatar = ({ size, Avatarurl }) => {
  return <Image size={size} src={Avatarurl} alt="" />;
};

export default Avatar;


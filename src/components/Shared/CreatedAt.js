import "moment/locale/ko";
import moment from "moment";
import styled from "styled-components";



const Container = styled.span`
  color:"#8F8F8F";
  font-size: 13px;
  padding: 2px 5px;

  @media screen and (max-width: 1000px) {
    font-size: 10px;
  }
`;

const CreatedAt = ({ createAt }) => {
  const parsedCreatedAt = moment(new Date(+createAt), "YYYYMMDD").fromNow();
  return <Container>{parsedCreatedAt}</Container>;
};

export default CreatedAt;
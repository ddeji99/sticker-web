import "moment/locale/ko";
import moment from "moment";
import styled from "styled-components";



const Container = styled.div`
  color:"#8F8F8F";
  font-size: 11px;
  padding: 0px 15px;
`;

const CreatedAt = ({ createAt }) => {
  const parsedCreatedAt = moment(new Date(+createAt), "YYYYMMDD").fromNow();
  return <Container>{parsedCreatedAt}</Container>;
};

export default CreatedAt;
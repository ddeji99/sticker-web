import styled from "styled-components";
import { BaseBox } from "./shared";

const Container = styled(BaseBox)`
  margin: 35px auto 0 auto;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 60px 1px 60px;
  margin-bottom: 100px;
  box-shadow: 20px 50px 80px rgba(43, 8, 37, 0.15);
  @media all and (max-width:767px) {
      border-radius: 30px;
      padding: 0 ;
  }
  form {
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: stretch;
    @media all and (max-width:767px) {
      width: 90%;
    }
  }
`;


function FormBox({children}) {
    return <Container>{children}</Container>
}
export default FormBox;
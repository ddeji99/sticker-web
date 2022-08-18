import styled from "styled-components";

const SFormError = styled.span`
    position: inherit;
    color:tomato;
    font-weight: 600;
    font-size: 18px;
    margin: -7px auto 0 auto;
    @media (pointer:coarse) {
        font-size: 32px;
        margin: -7px auto 23px auto;
      }
`;


function FormError({ message }) {
    return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
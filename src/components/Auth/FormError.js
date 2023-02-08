import styled from "styled-components";

const SFormError = styled.span`
    position: inherit;
    color:tomato;
    font-weight: 600;
    font-size: 18px;
    margin: -7px auto 12px auto;
    @media all and (max-width:767px) {
        font-size: 12px;
        margin: -7px auto 12px auto;
      }
`;


function FormError({ message }) {
    return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
import styled from "styled-components";

const Button = styled.input`
        width: 100%;
        height: 45px;
        font-size: 28px;
        letter-spacing: 2.5px;
        font-family: 'Righteous', cursive;
        font-weight: 400;
        color: #fff;
        background-color: #1875FF;
        border: none;
        border-radius: 450px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
        opacity: ${(props) => (props.disabled ? "0.1" : "1")};

        &:hover {
        background-color: #1875FF;
        box-shadow: 0px 15px 20px rgba(0, 138, 255, 0.4);
        color: #fff;
        transform: translateY(-7px);
        }
              
        &:active {
        transform: translateY(-1px);
        }

        @media (pointer:coarse) {
          background-color: #1875FF;
          box-shadow: none;
          font-size: 50px;
          height: 85px;
          border-radius: 85px;
        }
`;

export default Button;
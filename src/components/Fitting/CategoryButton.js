import styled, { keyframes } from "styled-components";
import { ShowOuter, ShowTop, ShowBottom} from "../../apollo";
import { makeVar } from "@apollo/client";

const shake3856 = keyframes`
0% {
    -webkit-transform: translate(0);
    transform: translate(0);
}

20% {
    -webkit-transform: translate(-1px, 1px);
    transform: translate(-1px, 1px);
}

40% {
    -webkit-transform: translate(-1px, -1px);
    transform: translate(-1px, -1px);
}

60% {
    -webkit-transform: translate(1px, 1px);
    transform: translate(1px, 1px);
}

80% {
    -webkit-transform: translate(1px, -1px);
    transform: translate(1px, -1px);
}

100% {
    -webkit-transform: translate(0);
    transform: translate(0);
}
`;

const NavWrapper = styled.div`
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
    padding-left: 18px;    
`;

const CategoryButton = styled.span`
    width: 110px;
    margin-left: 18px;
    padding: 15px 25px;
    border: unset;
    border-radius: 15px;
    color: #212121;
    z-index: 1;
    background: #e8e8e8;
    position: relative;
    text-align: center;
    font-weight: 1000;
    font-size: 17px;
    -webkit-box-shadow: 4px 8px 10px -3px rgba(0,0,0,0.27);
    box-shadow: 4px 8px 10px -3px rgba(0,0,0,0.27);
    transition: all 250ms;
    overflow: hidden;
    cursor: pointer;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        border-radius: 15px;
        background-color: #212121;
        z-index: -1;
        -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
        box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
        transition: all 250ms
       }
    &:hover{
        color: #e8e8e8;
        transform: translateY(-3px);
        &::before {
            width: 100%;
        }
    }
    &:active  {
        transform: translateY(3px);
    }
`;

const ResetButton = styled.button`
    width: 160px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    background: red;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
    background: #e62222;
    transition: 200ms;
    &:hover {
        background: #ff3636;
        border-left: none;
        transform: translateX(0);
        transform: translateY(-3px); 
        animation: ${shake3856} 0.4s linear infinite both;
        box-shadow: 2px 4px 8px -3px rgba(10,250,200,0.7);
    }
    &:active {
        transform: translateY(3px); 
    }
`;

const Reset = styled.div`
    transition: 200ms;
    transform: translateX(35px);
    color: white;
    font-weight: bold;
    ${ResetButton}:hover & {
        color: transparent;
      }
`;

const ResetIcon = styled.div`
    fill: #eee;
    transition: 200ms;
    position: absolute;
    border-left: 1px solid #c41b1b;
    transform: translateX(96px);
    height: 40px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${ResetButton}:hover & {
        width: 148px;
        border-left: none;
        transform: translateX(0);
      }
    ${ResetButton}:active {
        transform: scale(.8); 
    }
`;


function Category() {
    return (
        <NavWrapper>
            <ButtonWrapper>
                <ResetButton onClick={() =>{window.location.reload(); alert('리셋완료')}} type="button" >
                    <Reset>Reset</Reset>
                    <ResetIcon >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                            </path>
                        </svg>
                    </ResetIcon>
                </ResetButton>
                <CategoryButton onClick={ShowTop}>Top</CategoryButton>
                <CategoryButton onClick={ShowBottom}>Phants</CategoryButton>
                <CategoryButton onClick={ShowOuter}>Outer</CategoryButton>
            </ButtonWrapper>
        </NavWrapper>
    );
}

export default Category;
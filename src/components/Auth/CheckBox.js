import styled from "styled-components";

const CheckBoxR = styled.label`
    --button-width: 3.5em;
    --button-height: 2em;
    --toggle-diameter: 1.5em;
    --button-toggle-offset: calc((var(--button-height) - var(--toggle-diameter)) / 2);
    --toggle-shadow-offset: 10px;
    --toggle-wider: 3em;
    --color-grey: #cccccc;
    --color-green: #4296f4;
    cursor: pointer;

`;

const CheckBoxBody = styled.input`
    display: none;
    &:checked{
        background-color: var(--color-green);
        transform: translateX(calc(var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset)));
        box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
        transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));
    }
    &:active{
        width: var(--toggle-wider);
        transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));

    }
`;

const CSlider = styled.span`
    display: inline-block;
    width: var(--button-width);
    height: var(--button-height);
    background-color: var(--color-grey);
    border-radius: calc(var(--button-height) / 2);
    position: relative;
    transition: 0.3s all ease-in-out;


    ${CheckBoxBody}:checked ~ & {
        background-color: var(--color-green);

    }

    ::after {
        content: "";
        display: inline-block;
        width: var(--toggle-diameter);
        height: var(--toggle-diameter);
        background-color: #fff;
        border-radius: calc(var(--toggle-diameter) / 2);
        position: absolute;
        top: var(--button-toggle-offset);
        transform: translateX(var(--button-toggle-offset));
        box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
        transition: 0.3s all ease-in-out;
        ${CheckBoxBody}:active ~ & {
            width: var(--toggle-wider);
            transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));
        }
        ${CheckBoxBody}:checked ~ & {
            transform: translateX(calc(var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset)));
            box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);

            }
`;


function CheckBox() {
    return(
        <CheckBoxR>
            <CheckBoxBody type={"checkbox"}/>
            <CSlider></CSlider>
        </CheckBoxR>
    );
}

export default CheckBox;
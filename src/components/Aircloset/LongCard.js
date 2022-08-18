import styled from "styled-components";
import { Link, useNavigate, useMatch } from "react-router-dom";
import LookDetail from "../Feed/LookDetail";
import { AnimatePresence } from "framer-motion";

const CardForm = styled.div`
    width: 180px;
    height: 400px;
    border-radius: 27px;
    overflow: hidden;
    margin: 15px;
    box-shadow: 5px 5px 10px #d9d9d9;

    display: flex;
    flex-direction: column;
    align-items: center;
    flex:none;
    transition: all 0.3s;

    &:hover {
        z-index: -2;
        margin: 15px;
        transform: scale(1.03) rotate(5deg);
        border: #1875FF solid 3px;
        outline-offset: -3px;
    }

    @media (pointer:coarse){
        width: calc( 40vh * 0.45 );
        height: 40vh;
        box-shadow: 1vw 1vw 3vw #d9d9d9;
        margin: 15px 8vw 15px 15px;
        border-radius: 47px;
        &:hover {
            margin: 15px 13vw 15px 15px;
            border: none;
            transition: all 0.3s;
            transform: scale(1.05);
    }
}
`;

const CardImg = styled.img`
    height: 100%;
`;

const CardDiv = styled.a`
    width: 168px;
    height: 40px;
    margin-top: -47px;
    border-radius: 215px;

    background: rgba( 255,255,255,0.6 );
    box-shadow: 2px 2px 5px 0 rgba( 0,0,0, 0.3 );
    backdrop-filter: blur( 5px );
    border: 1px solid rgba( 255,255,255, 1 );

    text-align: center;
    text-decoration: none;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    cursor: pointer;

    ${CardForm}:hover & {
    transform: scale(1.04) rotate(-5deg) translateY(-60%);
    }
    @media (pointer:coarse) {
        margin-top: -89px;
        height: 73px;
        width: calc( 37vh * 0.45 );
        background: rgba( 255,255,255,0.8 );
        box-shadow: 2px 2px 5px 0 rgba( 0,0,0, 0.3 );
        backdrop-filter: blur( 5px );
        border: 1px solid rgba( 255,255,255, 1 );
        padding: 3px;
        border-radius: 45px;
        ${CardForm}:hover & {
            transform: none;
            }
    }
`;

const CardText = styled.span`
    width: 95%;
    font-size: 20px;
    font-weight: middle;
    letter-spacing: 0.1em;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    
    vertical-align: super;
    
    vertical-align: middle;
    @media (pointer:coarse) {
        margin-left: -30px;
        font-size: 2em;
        font-weight: 900;
        letter-spacing: 0.1em;
    }
`;

const CardIcon = styled.img`
    display: none;

`;

function LongCard ({ lookimg, title, id, lookitems  }) {
    const navigate = useNavigate();
    const detail = (id) => {
        navigate(`look/${id}`);
    }
        const Detailpathmatch = useMatch("look/:id");
        const Profilepathmatch = useMatch("profile/:nickname/look/:id");





        return (
            <>
              <AnimatePresence>
               {Profilepathmatch && Profilepathmatch.params.id === String(id) && (
                   <LookDetail id={id} lookimg={lookimg} lookitems={lookitems} title={title} />
               )}
                {Detailpathmatch && Detailpathmatch.params.id === String(id) && (
                   <LookDetail id={id} lookimg={lookimg} lookitems={lookitems} title={title} />
               )}
                </AnimatePresence>
            <CardForm>
                <CardImg src={lookimg}></CardImg>
                <CardDiv onClick={() => detail(id)}>
                    <CardText>{title}</CardText>
                </CardDiv>
            </CardForm>
            </>
        );
    
}

export default LongCard;
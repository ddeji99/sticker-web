import styled from "styled-components";
import { Link, useNavigate, useMatch } from "react-router-dom";
import LookDetail from "../Feed/LookDetail";
import { AnimatePresence, motion } from "framer-motion";

const CardForm = styled.div`
    width: 220px;
    height: 474px;
    border-radius: 27px;
    overflow: hidden;

    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;

    margin: 0 10px 0 10px;
    box-shadow: 0px 10px 30px 0px rgba(193, 193, 193, 0.25);
    cursor: pointer;
    @media all and (max-width:767px) {
        width: calc(97vw / 2 - 10px);
        height: 374px;
    }
`;

const CardImg = styled(motion.img)`
    width: 225px;
    background-color: #ffffff;
    overflow: hidden;
    @media all and (max-width:767px) {
        width: calc(97vw / 2);
        object-fit: contain;
    }
`;

const CardDiv = styled.div`
    width: 180px;
    height: 55px;
    display: flex;
    overflow: hidden;

    position: absolute;
    bottom: 8px;
    border-radius: 20px;
    padding: 10px;

    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    background-color: rgba(48, 48, 48, 0.3);
    @media all and (max-width:767px) {
        width: calc(97vw / 2 - 50px);
    }
`;

const CardText = styled.span`
    width: 100%;
    overflow: hidden;
    position: relative;
    font-weight: 400;
    font-style: normal;
    font-family: "Noto Sans KR", sans-serif;
    color: #ffffff;
    font-size: 14px;
    line-height: 1.3;
    text-align: left;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: keep-all;
    @media all and (max-width:767px) {
        width: calc(97vw / 2 - 40px);
    }
`;

function LongCard ({ lookimg, title, id, lookitems, totalprice  }) {
    const navigate = useNavigate();
    const detail = (id) => {
        navigate(`look/${id}`);
    }
        
        const Profilepathmatch = useMatch("profile/:nickname/look/:id");





        return (
            <>
              <AnimatePresence>
               {Profilepathmatch && Profilepathmatch.params.id === String(id) && (
                   <LookDetail id={id} lookimg={lookimg} lookitems={lookitems} title={title} totalprice={totalprice} />
               )}
                </AnimatePresence>
            <CardForm className="LongCard" onClick={() => detail(id)}>
                <CardImg src={lookimg}
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 1 }}
                 />
                <CardDiv >
                    <CardText>{title}</CardText>
                </CardDiv>
            </CardForm>
            </>
        );
    
}

export default LongCard;
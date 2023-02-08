import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components"


const SM = styled.img`
height: 249px;
`;

const ABC = styled.div`
  width: auto !important;
  overflow: visible !important;
`;

const Aasd = styled.div`
  width: auto !important;
  overflow: visible !important;
`;

const Zoomimg = ({image}) => {
    return (
        <ABC style={{display: "flex", justifyContent: "center"}}>
           <SM src={image + "?adfafa"} alt="" crossOrigin="use-credentials" />
        </ABC>
    )
}

export default Zoomimg;
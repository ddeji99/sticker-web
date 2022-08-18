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
          <TransformWrapper
            minScale={0.5}      
            limitToBounds={false}
            style={{overflow: "visible !important"}}
            >
            <TransformComponent>
              <SM src={image} alt="" crossOrigin="use-credentials" />
            </TransformComponent>
          </TransformWrapper>
        </ABC>
    )
}

export default Zoomimg;
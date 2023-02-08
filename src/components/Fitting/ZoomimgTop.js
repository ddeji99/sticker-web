import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components"


const SM = styled.img`
height: 89vh;
width: 100%;
object-fit: contain;
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
            maxScale={3.2}
            limitToBounds={false}
            wheel={{step: 0.005}}      
            style={{overflow: "visible !important"}}
            >
            <TransformComponent>
              <SM src={`${image}?${Date.now()}5`} alt="" crossOrigin="use-credentials" />
            </TransformComponent>
          </TransformWrapper>
        </ABC>
    )
}

export default Zoomimg;
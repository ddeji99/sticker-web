import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components"


const SM = styled.img`
  
  width: 100%;
object-fit: contain;
`;

const ABC = styled.div`
  width: auto !important;
  overflow: visible !important;
  & > div{
    height: 89vh;

  }
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
              <SM id="b" src={`${image}?${Date.now()}4`} alt="" crossOrigin="use-credentials" />
            </TransformComponent>
          </TransformWrapper>
        </ABC>
    )
}

export default Zoomimg;
import styled, { keyframes } from "styled-components";


const spinnerY = keyframes`
    0% {
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
    }

    50% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
    }

    100% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
    }
`;

const Container = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
  width: 80px;
  height: 80px;
  animation: ${spinnerY} 2s infinite ease;
  transform-style: preserve-3d;
  }

  .spinner > div {
  background-color: rgba(0,77,255,0.2);
  height: 100%;
  position: absolute;
  width: 100%;
  border: 2px solid #004dff;
  }

  .spinner div:nth-of-type(1) {
  transform: translateZ(-44px) rotateY(180deg);
  }

  .spinner div:nth-of-type(2) {
  transform: rotateY(-270deg) translateX(50%);
  transform-origin: top right;
  }

  .spinner div:nth-of-type(3) {
  transform: rotateY(270deg) translateX(-50%);
  transform-origin: center left;
  }

  .spinner div:nth-of-type(4) {
  transform: rotateX(90deg) translateY(-50%);
  transform-origin: top center;
  }

  .spinner div:nth-of-type(5) {
  transform: rotateX(-90deg) translateY(50%);
  transform-origin: bottom center;
  }

  .spinner div:nth-of-type(6) {
  transform: translateZ(44px);
  }
`;

const LoadingContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #000;
  font-size: 48px;
  margin-top: 50px;
`;







const Loader = () => (
  <Container>
        <LoadingContainer role="img" aria-label="Loading">
          <div class="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Title>Loading...</Title>
        </LoadingContainer>
  </Container>
);

export default Loader;
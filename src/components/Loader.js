import styled, { keyframes } from "styled-components";


const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const LoadingContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media all and (max-width:767px) {
    width : 40vw;
  }
  svg{
    width : 100%;
    height : auto;
    fill:none;
  }
  .cls-1
  {
    stroke-linecap: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 1000;
    animation: ${dash} 2.5s ease-in-out infinite
  }
  
  .cls-2
  {
    stroke-linecap: round;
    stroke-dasharray: 50;
    stroke-dashoffset: 500;
    animation: ${dash} 2.5s ease-in-out infinite
  }
  
  .cls-3
  {
    stroke-linecap: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 1000;
    animation: ${dash} 2s linear infinite;
  }
`;

const Title = styled.h1`
  color: #000;
  font-size: 38px;
  font-weight: 600;
`;






const Loader = () => (
  <Container>
        <LoadingContainer role="img" aria-label="Loading">
          
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 -15 300 300">

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(2, 57, 255)" />
              <stop offset="100%" stopColor="#5e56f0" />
            </linearGradient>
          </defs>
          <path className="cls-1"
                stroke="url(#gradient)"
                strokeWidth={20}
                d="M134.37 274.59C60.28 274.59 0 214.31 0 140.22v-12.17l212.44 119.77-9.53 6.44c-19.95 13.48-43.01 20.33-68.54 20.33"/>
            
          <path className="cls-2" 
                stroke="url(#gradient)"
                strokeWidth={20} 
                d="M215.36 127.26c-15.09 0-28.43 9.8-32.42 23.83-2.21 7.73-5.86 14.62-10.86 20.46l-5.56 6.5 68.26 39.41 3.68-5.63c15.22-23.32 23.95-51.55 23.95-77.46v-7.11Z"/>
            
          <path className="cls-3"
                stroke="url(#gradient)"
                strokeWidth={20} 
                d="M201.57 18C181.23 6.23 157.99 0 134.37 0 80.78 0 32.36 31.8 11.03 81.01l-2.52 5.81 71.19 41.11 2.53-8.71c6.69-23.05 28.14-39.14 52.15-39.14 9.54 0 18.93 2.51 27.14 7.27l6.16 3.57L207.71 21.56Z"/>
        </svg>

          <Title>Loading</Title>
        </LoadingContainer>
  </Container>
);

export default Loader;
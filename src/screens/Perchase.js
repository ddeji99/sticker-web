import styled from "styled-components";
import Header from "../components/Header";
import { Link, useNavigate, useMatch, useParams } from "react-router-dom";
import image from "../img/1448.png";
import { SEELOOK_QUERY } from "../Documents/Query/SEELOOK_QUERY";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { BUYREQUEST_MUTATION } from "../Documents/Mutation/BUYREQUEST_MUTATION";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Bbannerimg1 from "../img/banner 001.png";
import Bbannerimg2 from "../img/banner 002.png";
import Bbannerimg3 from "../img/banner 003.png";
import Bbannerimg4 from "../img/banner 004.png";
import Wbannerimg1 from "../img/banner 005.png";
import Wbannerimg2 from "../img/banner 006.png";
import Wbannerimg3 from "../img/banner 007.png";
import Footer from "../components/Footer";


const Container = styled.div``;

const Wrapper = styled.div`    
width: 1010px;
margin: 0 auto;
justify-content: center;
display: flex;
flex-wrap: wrap;

@media (pointer:coarse) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
}
`;

const ImgWrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
margin-bottom: 30px;
width: 100%;
p{
    font-size: 20px;
    margin: 30px 0 0 0;
    @media (pointer:coarse) {
        font-size: 30px;
        margin: 60px 0 0 0;
    }
}
h2{
    font-size: 29px;
    font-weight: bold;
    @media (pointer:coarse) {
        font-size: 43px;
        font-weight: bold;
    }
}
`;

const PerchaseImg = styled.img`
height: 100px;
@media (pointer:coarse) {
    width: 100vw;
    height: auto;
}
`;

const LookAndItem = styled.div`
width: 702px;
height: 450px;
display: flex;
float: left;
margin-bottom: 55px;

border: 1px #d1d1d1 solid;
background-color: #fff;
border-radius: 45px;
overflow: hidden;

@media (pointer:coarse) {
    width: 100vw;
    height: 1300px;
    padding-bottom: 15px;
}
`;

const Lookimg = styled.img`
border-radius: 45px;
box-shadow: 0 8px 50px #23232333;
width: 180px;
object-fit: cover;

@media (pointer:coarse) {
    width: 300px;
    margin-top: 700px;
    margin-right: -316px;
    margin-left: 15px;
}
`;

const ItemBox = styled.div`
margin: 0 5px 0 15px;
height: 448px;
width: 270px;
display: flex;
flex-wrap: wrap;
overflow: hidden;
display: block;
@media (pointer:coarse) {
    height: 690px;
    width: 310px;
    display: flex;
    justify-content: center;
}
`;

const Itemimg = styled.img`
height: 200px;
width: 139px;
margin-top: 8px;
@media (pointer:coarse) {
    height:302px;
    width: 210px;
}

`;

const Iteminfo = styled.div`
margin: 10px;

`;

const InfoT = styled.span`
height: 50px;
font-size: 20px;
font-weight: bold;
line-height: 25px;

margin-top: -15px;
margin-bottom: -15px;

border-bottom: 1px #dfdfdf solid;
word-break: keep-all;

overflow: hidden;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
display: -webkit-box;
@media (pointer:coarse) {
    font-size: 40px;
    line-height: 50px;
    height: 100px;
}
`;

const InfoC = styled.span`
font-size: 16px;
line-height: 35px;
padding-left: 10px;
color: #797979;
@media (pointer:coarse) {
    font-size: 30px;
    line-height: 55px;
}
`;

const InfoS = styled.span`
font-size: 16px;
line-height: 35px;
padding-left: 10px;
color: #797979;
@media (pointer:coarse) {
    font-size: 30px;
    line-height: 55px;
}
`;

const InfoP = styled.span`
font-size: 25px;
height: 30px;
line-height: 65px;
float: right;
font-family: 'Jost';
font-weight: 400;
@media (pointer:coarse) {
    font-size: 50px;
    height: 55px;
    line-height: 85px;
}
`;

const Learnmore = styled.button`
position: relative;
display: inline-block;
cursor: pointer;
outline: none;
border: 0;
vertical-align: middle;
text-decoration: none;
background: transparent;
padding: 0;
margin: 23px auto 0 0;
font-size: inherit;
font-family: inherit;
width: 133px;
height: auto;

border-top-color: #282936;
border-top-style: solid;
border-top-width: 1px;
&:hover{
    border-top-color: #1300ff;
}

@media (pointer:coarse) {
    width: 300px;
}
`;

const Circle = styled.span`
transition: all 0.25s cubic-bezier(0.65, 0, 0.076, 1);
position: relative;
display: block;
margin: 0;
width: 30px;
height: 30px;
background: #282936;
${Learnmore}:hover &{
        width: 100%;
        background: #1875ff;
}
@media (pointer:coarse) {
    width: 60px;
    height: 60px;
    width: 100%;
    background: #1875ff;
}
`;

const Arrow = styled.span`
transition: all 0.25s cubic-bezier(0.65, 0, 0.076, 1);
position: absolute;
top: 0;
bottom: 0;
margin: auto;
background: #fff;
left: 0.155rem;
width: 1.125rem;
height: 0.125rem;
background: none;
${Learnmore}:hover &{
    background: #fff;
    transform: translate(1rem, 0);
}
&::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
   }
`;

const ButtonText = styled.span`
transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
padding: 2px 0;
margin: 0 0 0 1.85rem;
color: #282936;
font-weight: 700;
line-height: 1.6;
text-align: center;
text-transform: uppercase;
${Learnmore}:hover &{
    color: #fff;
}
@media (pointer:coarse) {
    font-size: 40px;
    font-weight: 300;
    letter-spacing: 9px;
    color: #fff;
    margin: 0;
    padding: 0;
}
`;










// 결제창 스타일 시작


const FinalBox = styled.form`
width: 206px;
height: 406px;
margin-left: 18px;
margin-bottom: 55px;

border: 1px #1875ff solid;
float: right;
border-radius: 45px;
background-color: white;
padding: 24px 39px 20px 30px;
    span{
        font-size: 16px;
        height: auto;
        border-bottom: none;
        z-index: 2;
        font-weight: 400;
        letter-spacing: 5px;
    }
    h1{
        margin-top: -25px;
        letter-spacing: 5px;
        height: 70px;
    }
    p{
        font-size: 14px;
        height: auto;
        border-bottom: none;
        z-index: 2;
        font-weight: 300;
        line-height: 20px;
        letter-spacing: 1px;
        text-align: center;
    }
@media (pointer:coarse) {
    height: 570px;
    width: calc(90vw - 316px);
    margin-top: -672px;
    margin-left: 342px;
    span{
        font-size: 27px;
        letter-spacing: 5px;
    }

    h1{
        font-size: 27px;
        letter-spacing: 5px;
        margin-top: 0;
        height: 70px;
        margin-bottom: 90px;
    }
    p{
        color: #666;
        word-break: keep-all;
        font-size: 27px;
        font-weight: 500;
        line-height: 40px;
    }

}
`;

const Price = styled.input`
margin: -30px 0 30px 0;
width: 100%;
font-size: 22px;
letter-spacing: 1px;
text-align: right;
border-bottom: 1px #dfdfdf solid;
background-color: rgba( 255,255,255, .0);

color: #a1a1a1;

padding-right: 10px;
font-family: 'Jost';
font-weight: 300;
font-style: italic;
@media (pointer:coarse) {
    margin: -35px 0 30px 0;
    font-size: 40px;
    width: 50%;
}
`;

const DPrice = styled.input`
margin: -30px 0 0px 0;
width: 100%;
font-size: 22px;
letter-spacing: 1px;
text-align: right;
border-bottom: 1px #dfdfdf solid;
background-color: rgba( 255,255,255, .0);

color: #a1a1a1;

padding-right: 10px;
font-family: 'Jost';
font-weight: 300;
font-style: italic;

@media (pointer:coarse) {    
    margin: -10px 0 10px -85px;
    font-size: 40px;
    width: 50%;
}
`;


const FPriceInfo = styled.div`
margin-top: 30px;
font-weight: 900;
letter-spacing: 5px;
@media (pointer:coarse) {
    font-size: 45px;
    float: right;
    display: flex;
    flex-direction: column;
    
    text-align: center;
    margin: -327px -30px 0 0;
    width: 281px;
}
`;

const FPrice = styled.input`
width: 218px;
margin-top: -10px;
font-size: 38px;
font-family: 'Jost';
font-weight: 600;
letter-spacing: 3px;
background-color: rgba( 255,255,255, .0);

@media (pointer:coarse) {
    width: 248px;
    font-size: 45px;
    text-align: right;
}
`;

const Phone = styled.input`
width: 212px;
margin-bottom: 10px;
font-size: 15px;
letter-spacing: 5px;
text-align: center;
color: #1875ff;
font-weight: bold;


height: 25px;
display: block;

border: 1px solid #dadada;
border-radius: 300px;
background: none;

transition: border 150ms cubic-bezier(0.4,0,0.2,1);
border: 1.5px solid 
${(props) => (props.hasError ? "tomato" : "rgb(219, 219, 219)" )};

&:focus {
  outline: none;
  border: 1.5px solid #1875FF;
  background-color: #fff !important;
}
&:valid {
  outline: none;
  border: 1.5px solid #1875FF;
  background-color: #fff !important;
}

@media (pointer:coarse) {
    margin-top: 10px;
    width: 280px;
    height: 52px;
    font-size: 25px;
    letter-spacing: 5px;
    margin-left: -5px;
}
`;

const PerchaseB = styled.button`    
width: 216px;

display: flex;
align-items: center;
font-family: inherit;
font-weight: 500;
padding: 8px 10px 8px 10px;
color: white;
background: #ad5389;
background: linear-gradient(to right,#1300ff,#1875ff);
border: none;
letter-spacing: 0.05em;

@media (pointer:coarse) {
    width: 280px;
    height: 62px;
    float: right;
    margin-top: -72px;
    border-radius: 300px;
    margin-right: -21px;
}

`;

const PSvg = styled.svg`
margin-right: 63px;
transform: translateX(35px) rotate(30deg);
transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);

    ${PerchaseB}:hover & {
        transform: translateX(56px) rotate(90deg);
    }

@media (pointer:coarse) {
    transform: translateX(50px) rotate(30deg);
}
`;

const PButton = styled.input`
cursor: pointer;
transform: translateX(-12px);
font-size: 17px;
padding: 12px 68px 12px 90px;
position: absolute;
background-color: rgba(0,0,0, 0);
color: #fff;
font-weight: 500;

transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
    ${PerchaseB}:hover & {
            transform: translateX(-8px);
        }

@media (pointer:coarse) {
    font-size: 30px;
    transform: translateX(-5px);
}
`;

const BenefitBanner = styled.img`
    width: 1000px;
    height: 200px;

`;

const WarnBanner = styled.img`
    width: 1000px;
    height: 200px;

`;

const StyledSlider = styled(Slider)`
  width: 1000px !important;
  height: 200px !important;
  background: #fff;
  margin-bottom: 45px;
  box-shadow: 0 8px 50px #23232333;
  .slick-list {

    @media (pointer:coarse) {
    }
  }
  img {
    width: 100px ;
    height: 200px ;
    @media (pointer:coarse) {
      width: 110vw !important;
      height: 22vw !important;
      background: #fff;
    }
  }
  
  .slick-prev, .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    z-index:10;
    top: 50%;
    display: block;
    width: 100px;
    height: 20px;
    padding: 0;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
    }
  .slick-prev:before, .slick-next:before {
    font-family: 'slick';
    font-size: 30px;
    line-height: 1;
    opacity: .75;
    color: #d1d1d1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media (pointer:coarse) {
        font-size: 80px;
    }
  }
  @media (pointer:coarse) {
    width: 100vw !important;
    height: 20vw !important;
  }
`;

function Perchase() {

const  { id }  = useParams();
const navigate = useNavigate();
const { register,
        handleSubmit,
        formState: { errors, isValid},
        getValues,
        setError,
        clearErrors,
  } = useForm({
mode: "onChange"
});
const { data: seeLookdata} = useQuery(SEELOOK_QUERY,{ variables: { lookid: parseInt(id) }});
const [buyrequestMutation, { loading }] = useMutation(BUYREQUEST_MUTATION, {
    onCompleted: ({ buyrequest: { ok, message } }) => {
      if (ok === false) {
        return (setError("buyrequestResult", { message }),
        navigate(window.location.reload(),  alert(errors?.buyrequestResult?.message)) );
        
      }
      if (ok === true) {
        navigate("/", alert("주문요청을 완료하였습니다."));
      }
    },
  });

  const onValid = () => {
    if (loading === true) {
      return;
    }
    if(window.confirm("구매요청을 하시겠습니까?")) {
          const { phonenum } = getValues();
          buyrequestMutation({ variables: { phonenum:phonenum, lookid: parseInt(id) } });
    } else {

    }

    
  };

  var settings = {
    infinite: true,
    autoplay : true,
    speed: 2000,
    autoplaySpeed: 6000,
    pauseOnHover : true,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesPerRow: 1,
    variableWidth: true,
    waitForAnimate: true,
    responsive: [
        {
            breakpoint: 1840,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 1435,
            settings: {
            accessibility: true,
                draggable: true,
                speed: 1000,
                autoplaySpeed: 50000,
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
        ]
    };
    return (
        <Container>
            <Header />
            <Wrapper>

                <ImgWrapper>
                <PerchaseImg src={image} />
                    <p>아래 내용을 확인한뒤 구매신청을 누르시면 담당자가 직접 확인하고</p><br></br>
                    <h2>📮 결재 하실 수 있는 링크를 연락처로 보내드려요 📮</h2>
                </ImgWrapper>

                <LookAndItem>
                    <Lookimg src={seeLookdata?.seeLook?.look.comboImage} />
                    
                    {seeLookdata?.seeLook?.look?.item.map((item)=> (
                        <ItemBox key={item.id}>
                        <Itemimg src={item.image} />                       
                          <Iteminfo>
                              <InfoT>{item.title}</InfoT><br />
                              <InfoC>{item.color}</InfoC><br />
                              <InfoS>{item.size}</InfoS><br />
                              <InfoP>{item.price} 원</InfoP><br />
                              <Learnmore>
                                  <a href={item.detail}
                                      target="_blank">
                                  <Circle>
                                      <Arrow></Arrow>
                                  </Circle>
                                  <ButtonText>                                
                                      상세정보
                                  </ButtonText>
                                  </a>
                              </Learnmore> 
                          </Iteminfo>
                      </ItemBox>
                    ))}

                </LookAndItem>

                <FinalBox onSubmit={handleSubmit(onValid)} >
                    {seeLookdata?.seeLook?.look?.item.map((item)=> (
                        <div key={item.id}>
                        <InfoT>{item.category}</InfoT><br />
                        <Price type="text" readOnly value={`+ ${item.price} 원` }/>
                        </div>
                    ))}


                    <h1>배송비 
                    <DPrice type="text" readOnly value="2,500 원" />
                    <p>( 배송비는 결제단계에서 안내해드릴게요 )<br/> 
                        
                    <a href='https://www.second.sticker.ooo/faq' target="_blank">-취소/환불규정 </a>
                    <a href='https://www.second.sticker.ooo/privacy-policy' target="_blank"> -제3자정보제공</a><br/> 
                    </p>
                    </h1>

                    <FPriceInfo>결제금액 
                    <FPrice type="text" readOnly value={`${(parseInt(seeLookdata?.seeLook?.look.totalPrice.replace(/[^0-9]/g,""))+2500).toLocaleString()}원`}/></FPriceInfo>

                    <Phone {...register("phonenum",{
                         required: "전화번호는 꼭 필요해요!",
                         pattern: {
                            value: /[0-9]/g
                         },
                         maxLength: 12
                       })}
                          type="text" 
                          required=" "     
                          placeholder="연락처를 입력해주세요" /> 
                    
                    <PerchaseB onClick={handleSubmit(onValid)}>
                        <PSvg height="24" width="24" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none">
                            </path>
                            <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor">
                            </path>
                        </PSvg>
                        <PButton type="submit" value="구매요청" />
                    </PerchaseB>

                </FinalBox>
                <StyledSlider {...settings}>
                    <BenefitBanner src={Bbannerimg1}></BenefitBanner>
                    <BenefitBanner src={Bbannerimg2}></BenefitBanner>
                    <BenefitBanner src={Bbannerimg3}></BenefitBanner>
                    <BenefitBanner src={Bbannerimg4}></BenefitBanner>
                </StyledSlider>
                <StyledSlider {...settings}>
                    <WarnBanner src={Wbannerimg1}></WarnBanner>
                    <WarnBanner src={Wbannerimg2}></WarnBanner>
                    <WarnBanner src={Wbannerimg3}></WarnBanner>
                </StyledSlider>

            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Perchase;
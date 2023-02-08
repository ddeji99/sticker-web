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
import SubNavbar from "../components/SubNavbar";
import EachItem from "../components/Aircloset/EachItem";

















const Maindiv = styled.div`
  min-width: 370px;
  box-sizing: border-box;
  height: min-content; /* 3985px */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px 0px 0px 0px;
  background-color: #ffffff;
  overflow: hidden;
  align-content: center;
  flex-wrap: nowrap;

  .divider {
    height: 20px;
    width: 100vw;
    margin: 15px 0;
    background-color: rgb(178 195 255 / 30%);
  }

  .MoreItem {
    width: 70px !important;
    display: flex !important;
    justify-content: center;
    border-radius: 12px;
    font-size: 14px;
    letter-spacing: -.14px;   

    border: 1px solid #d3d3d3;
    color: rgba(34,34,34,.8); 
    background-color: #fff6;     

    padding: 10px 30px;
    margin: auto auto;
    &:hover{
      color: #0239FF;
      border: 1px solid #0239FF;
    }
  }

  @media all and (max-width:767px) {
    padding: 10px 0 0 0;

  }
`;
const ImgWrapper = styled.div`
    width: 100%;
    width: 622px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 30px;
    p{
        font-size: 18px;
        margin: 30px 0 0 0;
    }
    h2{
        font-size: 22px;
        font-weight: bold;
    }
    @media all and (max-width:767px) {
      width: 97vw;
      p{
          font-size: 14px;
          margin: 30px 0 0 0;
      }
      h2{
          font-size: 16px;
          font-weight: bold;
      }
    }
`;

const PerchaseImg = styled.img`
    height: 100px;
    @media all and (max-width:767px) {
        width: 95vw;
        height: auto;
    }
`;

const LookAndItem = styled.div`
    box-sizing: border-box;
    width: 650px;
    height: min-content;
    margin-bottom: 40px;
    padding: 20px;
    display: flex;
    overflow: hidden;
    background-color: #fff;
    border: 1px #1875ff solid;

    @media all and (max-width:767px) {
        width: 95vw;
        height: 400px !important;
        padding-bottom: 0px;
        padding: 0px;
        margin-bottom: 0px;
        border: 0px #1875ff solid;
        flex-direction: row;
        justify-content: space-between;
    }
`;

const Lookimg = styled.img`
    width: 180px;
    object-fit: cover;

    @media all and (max-width:767px) {
        width: 40vw;
    }
`;

const ItemBox = styled.div`
    height: max-content;
    width: 100%;
    margin: 0 5px 0 40px;
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
    .EachItemMain > div{
        display: none;
    }
    

    @media all and (max-width:767px) {
        width: 100%;
        height: max-content;
        margin: 0 5px 0 10px;
        display: flex;
        justify-content: space-between;
        .EachItemBody{
            width: calc(100% / 2 - 5px);
        }
    }
`;

const InfoT = styled.span`
    font-size: 20px;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: -30px;
    border-bottom: 1px #dfdfdf solid;
    word-break: keep-all;

    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    display: -webkit-box;
    @media all and (max-width:767px) {
        font-size: 14px;
        line-height: 1.4;
        margin-bottom: -44px;
    }
`;


// 결제창 스타일 시작

const FinalBox = styled.form`
    box-sizing: border-box;
    width: 650px;
    height: 446px;
    margin-bottom: 40px;

    border: 1px #1875ff solid;
    background-color: white;
    padding: 40px;
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
        h3{
            font-size: 14px;
            height: auto;
            border-bottom: none;
            z-index: 2;
            font-weight: 700;
            line-height: 1.5;
            letter-spacing: 1px;
            text-align: center;
            color: #b2b2b2;
        }

    @media all and (max-width:767px) {
        width: 95vw;
        height: max-content;
        padding: 20px;
        margin-left: 0px;
        span{
            font-size: 18px;
            letter-spacing: 5px;
        }

        h1{
            font-size: 18px;
            letter-spacing: 5px;
            margin-top: 0;
            height: 70px;
            margin-bottom: 90px;
        }
        h3{
            margin-top: 10px;
            word-break: keep-all;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.5;
        }

    }
`;

const Price = styled.input`
    margin: -30px 0 30px 0;
    width: 100%;
    font-size: 18px;
    letter-spacing: 1px;
    text-align: right;
    border-bottom: 1px #f2f2f2 solid;
    background-color: rgba( 255,255,255, .0);
    color: #222;
    padding-right: 10px;
    font-family: 'Jost';
    font-weight: 400;
    
    @media all and (max-width:767px) {
        margin: 0px;
        margin-bottom: 20px;
        font-size: 18px;
        width: 100%;
    }
`;


const FPriceInfo = styled.div`
    width: 100%;
    margin-bottom: 25px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    font-weight: 900;
    letter-spacing: 5px;
    @media all and (max-width:767px) {
        margin: 5px 0px 40px 0px;
        font-size: 14px;
        font-weight: 700;
        text-align: center;
    }
`;

const FPrice = styled.input`
    width: min-content;
    margin-top: -0px;
    text-align: right;
    font-size: 24px;
    font-family: 'Jost';
    font-weight: 600;
    letter-spacing: 3px;
    background-color: rgba( 255,255,255, .0);

    @media all and (max-width:767px) {
        margin-top: 0px;
        font-size: 16px;
    }
`;

const Phone = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
    display: block;

    border: 1px solid #dadada;
    border-radius: 300px;

    background: none;
    transition: border 150ms cubic-bezier(0.4,0,0.2,1);
    border: 1.5px solid 

    font-size: 15px;
    font-weight: 400;
    color: #1875ff;
    letter-spacing: 5px;
    text-align: center;
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

    @media all and (max-width:767px) {
        margin-top: 10px;
        height: 42px;
        font-size: 14px;
        letter-spacing: 5px;
    }
`;

const PerchaseB = styled.button`    
    box-sizing: border-box; 
    width: 100%;
    height: 45px;
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
    border-radius: 300px;

    @media all and (max-width:767px) {
        width: 100%;
        height: 42px;
        margin-top: 0px;
        margin-right: 0px;
        border-radius: 300px;
        letter-spacing: 2px;
    }

`;

const PSvg = styled.svg`
    margin-right: 63px;
    transform: translateX(245px) rotate(30deg);
    transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);

        ${PerchaseB}:hover & {
            transform: translateX(245px) rotate(90deg);
        }

    @media all and (max-width:767px) {
        transform: translateX(95px) rotate(30deg);
    }
`;

const PButton = styled.input`
    cursor: pointer;
    padding: 12px 68px 12px 90px;
    transform: translateX(180px);
    font-size: 17px;
    position: absolute;
    background-color: rgba(0,0,0, 0);
    color: #fff;
    font-weight: 700;

    transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
        ${PerchaseB}:hover & {
                transform: translateX(200px);
            }

    @media all and (max-width:767px) {
        font-size: 22px;
        padding: 12px 68px 12px 130px;
        transform: translateX(-5px);
    }
`;

const BenefitBanner = styled.img`
    width: 650px;
    height: 120px;
`;

const WarnBanner = styled.img`
    width: 650px;
    height: 120px;
`;

const StyledSlider = styled(Slider)`
  width: 650px !important;
  height: 120px !important;
  background: #fff;
  margin-bottom: 50px;
  box-shadow: 0 8px 50px #23232333;

  img {
    width: 650px !important;
    height: 120px !important;
  }
  :last-child {
    margin-bottom: 40px;
  }

  @media all and (max-width:767px) {
    width: 100vw !important;
    height: 20vw !important;
    box-shadow: 0 8px 50px #fff;
    img {
        width: 100vw !important;
        height: 20vw !important;
        background: #fff;
    }
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
        <Maindiv>
            <Header />
            <SubNavbar/>
            

                <ImgWrapper>
                <PerchaseImg src={image} />
                    <p>구매신청을 누르시면</p><br></br>
                    <h2>📮 결재 하실 수 있는 링크를 연락처로 보내드려요 📮</h2>
                </ImgWrapper>

                <LookAndItem>
                    <Lookimg src={seeLookdata?.seeLook?.look.comboImage} />
                    <ItemBox>
                    
                    {seeLookdata?.seeLook?.look?.item.map((item)=> (
                        
                        <EachItem key={item.id} item={item}  />
                      
                    ))}
                    </ItemBox>

                </LookAndItem>

                <FinalBox onSubmit={handleSubmit(onValid)} >
                    {seeLookdata?.seeLook?.look?.item.map((item)=> (
                        <div key={item.id}>
                        <InfoT>{item.category}</InfoT><br />
                        <Price type="text" readOnly value={`+ ${item.price} 원` }/>
                        </div>
                    ))}


                    <h3>스티커는 전 상품 무료배송 입니다!</h3>

                    <FPriceInfo>결제금액 
                    <FPrice type="text" readOnly value={`${seeLookdata?.seeLook?.look.totalPrice.toLocaleString("ko-KR")}원`}/></FPriceInfo>

                    <Phone {...register("phonenum",{
                         required: "전화번호는 꼭 필요해요!",
                         pattern: {
                            value: /[0-9]/g
                         },
                         maxLength: 11
                       })}
                          type="text" 
                          required=" "     
                          placeholder="연락처를 입력해주세요 ex)01012345678" /> 
                    
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

            
            <Footer />
            </Maindiv>
    )
}

export default Perchase;
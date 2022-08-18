import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/Auth/AuthLayout";
import  Logo  from "../img/logo-B.png"; 
import Button from "../components/Auth/Button";
import Input from "../components/Auth/Input";
import Separator from "../components/Auth/Separator";
import { logUserIn } from "../apollo";
import FormBox from "../components/Auth/FormBox";
import { useForm } from "react-hook-form";
import FormError from "../components/Auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { FINDPASSWORD_MUTATION } from "../Documents/Mutation/FINDPASSWORD_MUTATION";

const Logoinbox = styled.img`
  width: 300px;
  padding: 3vh 0 3vh;
  object-fit: contain;
  @media (pointer:coarse) {
    width: 100%;
    padding: 5vh 0 5vh 0;
  }
`;

const SignUp2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  a {
    font-weight: 600;
    letter-spacing: 1px;
    display: flex;
    color: #fff;
    align-items: center;
  }
  span {
    @media (pointer:coarse) {
      font-size: 38px;
    }
  }
  button {
  width: 50%;
  font-family: inherit;
  font-size: 15px;
  background: #000;
  color: white;
  margin: 0 0.5px 0 0.5px;
  margin: 0 0.5px 0 0.5px;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  overflow: hidden;
  transition: all 0.2s;
  text-shadow: 0 1px #666;
  @media (pointer:coarse) {
      letter-spacing: 3px;
      font-size:40px;
      padding: 10px 0 10px 0;
    }
  }

  button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
  @media (pointer:coarse) {
      letter-spacing: 5px;
      font-size:40px;
    }
  }

  button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
  border-color: #fff;
  }

  button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover svg {
  transform: translateX(40px) rotate(45deg) scale(1.1);
  }

  button:hover span {
  transform: translateX(8em);
  }

  button:active {
  transform: scale(0.95);
  }

  @keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const PasswordFineNotion = styled.span`
  color: #2ecc71;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 20px;
  line-height: 40px;
  @media (pointer:coarse) {
    font-size: 40px;
    margin-bottom: 20px;
    line-height: 80px;
  }
`;

const Emailinput = styled(Input)`
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
`;

const TlabelE = styled.label`    
width: fit-content;
font-size: 18px;
color: #c5c5c5;
pointer-events: none;
transform: translateY(-51.5px);
transition: 150ms cubic-bezier(0.4,0,0.2,1);
padding-left: 22.5px;

${Emailinput}:focus ~ & {
  transform: translateY(-76px) translateX(10px) scale(0.8);
  background-color: #fff;
  padding: 0 .2em;
  color: #1875FF;
}
${Emailinput}:valid ~ & {
  transform: translateY(-76px) translateX(10px) scale(0.8);
  background-color: #fff;
  padding: 0 .2em;
  color: #1875FF;
}

@media (pointer:coarse) {
  font-size: 30px;
  transform: translateY(-78px);
  ${Emailinput}:focus ~ & {
    transform: translateY(-113px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
  ${Emailinput}:valid ~ & {
    transform: translateY(-113px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
}
`;









function Findpassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state | null;
  const { register,
          handleSubmit,
          formState: { errors, isValid},
          getValues,
          setError,
          clearErrors,
        } = useForm({
    mode: "onChange"
  });
  const [findpasswordMutation, { loading }] = useMutation(FINDPASSWORD_MUTATION,{
    onCompleted: ({ findpassword: { ok, message } }) => {
      if (ok === false) {
        return setError("findpasswordResult", { message });
      }
      if (ok === true) {
        navigate("/login", alert("이메일을 전송하였습니다."));
      }
    },
  });

  const onValid = () => {
    if (loading === true) {
      return;
      //로딩페이지 띄우기
    }
    const  email  = getValues("email");
    findpasswordMutation({ variables: { email } });
  };

  
    return (
      <AuthLayout>

      <FormBox> 
          <Logoinbox src={Logo}/>
          <Notification>{location?.state?.message}</Notification>
          
          <PasswordFineNotion>가입했던 이메일을 알려주시면<br/>임시비밀번호를 발송해드릴게요!</PasswordFineNotion>
          <form onSubmit={handleSubmit(onValid)}>
              <FormError message={errors?.email?.message} />
              <Emailinput 
              {...register("email",{
               required: "이메일은 꼭 필요해요!", 
                pattern: {
                  value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: "음... 이메일이 아닌 것 같아요."
                }
              })}
              onFocus={() => clearErrors("findpasswordResult")}
              name="email" 
              type="text"
              required=" "
              hasError={Boolean(errors?.email?.message)} 
              />
              <TlabelE>이메일을 입력해주세요</TlabelE>
              <Button 
              type="submit" 
              value={loading ? "Loading..." : "Send"}
              disabled={!isValid || loading } 
              />
              <FormError message={errors?.findpasswordResult?.message} />
          </form>
          <Separator />
          <SignUp2>
          <span>혹시 계정이 기억 나시나요?</span>
           <button>
           <Link to={"/login"}>
             <div className="svg-wrapper-1">
               <div className="svg-wrapper">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                   <path fill="#fff" d="M11.667 23q-1.25 0-2.125-.875T8.667 20q0-1.25.875-2.125T11.667 17q1.25 0 2.125.875T14.667 20q0 1.25-.875 2.125T11.667 23Zm0 7Q7.5 30 4.583 27.083 1.667 24.167 1.667 20t2.916-7.083Q7.5 10 11.667 10q2.916 0 5.187 1.396 2.271 1.396 3.563 4.062h14.208q.292 0 .521.105.229.104.479.312L39 19.292q.208.208.312.458.105.25.105.542 0 .25-.105.5-.104.25-.354.458l-5.208 4.958q-.208.167-.438.271-.229.104-.479.104-.208.042-.437-.021-.229-.062-.438-.229l-2.666-1.916-2.709 2q-.208.166-.416.208-.209.042-.417.042t-.438-.063q-.229-.062-.395-.187L22.5 24.542h-2.083q-1.125 2.416-3.375 3.937T11.667 30Zm0-2.792q2.375 0 4.333-1.541 1.958-1.542 2.542-3.917h4.916l2.292 1.833q-.042 0 0 0h.021-.021l3.583-2.625 3.25 2.5L36 20.208l.021.021-.021-.021h.021H36l-1.958-1.958h-15.5q-.542-2.292-2.459-3.875-1.916-1.583-4.416-1.583-3 0-5.105 2.104Q4.458 17 4.458 20t2.104 5.104q2.105 2.104 5.105 2.104Z"></path>
                 </svg>
               </div>
             </div>
             <span>로그인<br/>하러가기</span>
           </Link>
           </button> 
          </SignUp2>
      </FormBox>
</AuthLayout>
    );
};
export default Findpassword;
import AuthLayout from "../components/Auth/AuthLayout";
import FormBox from "../components/Auth/FormBox";
import Input from "../components/Auth/Input";
import  Logo  from "../img/logo-B.png"; 
import styled from "styled-components";
import Button from "../components/Auth/Button";
import routes from "../routes";
import { Link } from "react-router-dom";
import Separator from "../components/Auth/Separator";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/Auth/FormError";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";





const modalVariants = {
  start: { opacity: 0, scale: 1 },
  end: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 1, transition: { duration: 0.5 } },
};

const Logoinbox = styled.img`
width: 300px;
padding: 3vh 0 5vh;
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

const SelectG = styled.select`
width: 48%;
height: 51px;
margin: -88px 0 27px auto;
padding: 0 40.5px 0 41.5px;
border-radius: 300px;
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
  font-size: 2em;
  height: 73px;
  margin: -127px 0 27px auto;
}
`;

const Emailinput = styled(Input)`
&:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}
`;

const Nicknameinput = styled(Input)`
&:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

`;

const Ageinput = styled(Input)`
&:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}
width:40%;

`;

const Passwordinput = styled(Input)`
`;

const TlabelE = styled.label`    
width: fit-content;
font-size: 18px;
color: #c5c5c5;
pointer-events: none;
transform: translateY(-52.5px);
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
  transform: translateY(-75px);
  ${Emailinput}:focus ~ & {
    transform: translateY(-105px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
  ${Emailinput}:valid ~ & {
    transform: translateY(-105px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
}
`;

const TlabelN = styled.label`    
width: fit-content;
font-size: 18px;
color: #c5c5c5;
pointer-events: none;
transform: translateY(-52.5px);
transition: 150ms cubic-bezier(0.4,0,0.2,1);
padding-left: 22.5px;

${Nicknameinput}:focus ~ & {
  transform: translateY(-76px) translateX(10px) scale(0.8);
  background-color: #fff;
  padding: 0 .2em;
  color: #1875FF;
}
${Nicknameinput}:valid ~ & {
  transform: translateY(-76px) translateX(10px) scale(0.8);
  background-color: #fff;
  padding: 0 .2em;
  color: #1875FF;
}

@media (pointer:coarse) {
  font-size: 30px;
  transform: translateY(-75px);
  ${Nicknameinput}:focus ~ & {
    transform: translateY(-105px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
  ${Nicknameinput}:valid ~ & {
    transform: translateY(-105px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
}
`;

const TlabelA = styled.label`    
width: fit-content;
font-size: 18px;
color: #c5c5c5;
pointer-events: none;
transform: translateY(-52.5px);
transition: 150ms cubic-bezier(0.4,0,0.2,1);
padding-left: 22.5px;

${Ageinput}:focus ~ & {
  transform: translateY(-76px) translateX(34px) scale(0.8);
  background-color: #fff;
  padding: 0 .2em;
  color: #1875FF;
}
${Ageinput}:valid ~ & {
  transform: translateY(-76px) translateX(34px) scale(0.8);
  background-color: #fff;
  padding: 0 .2em;
  color: #1875FF;
}

@media (pointer:coarse) {
  font-size: 30px;
  transform: translateY(-75px);
  ${Ageinput}:focus ~ & {
    transform: translateY(-105px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
  ${Ageinput}:valid ~ & {
    transform: translateY(-105px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
}
`;

const TlabelP = styled.label`
width: fit-content;
font-size: 18px;
color: #c5c5c5;
pointer-events: none;
transform: translateY(-52.5px);
transition: 150ms cubic-bezier(0.4,0,0.2,1);
padding-left: 22.5px;

${Passwordinput}:focus ~ & {
  transform: translateY(-76px) translateX(10px) scale(0.8);
  background-color: #fff;
  padding: 0 .2em;
  color: #1875FF;
}
${Passwordinput}:valid ~ & {
  transform: translateY(-76px) translateX(10px) scale(0.8);
  background-color: #fff;
  padding: 0 .2em;
  color: #1875FF;
}
@media (pointer:coarse) {
  font-size: 30px;
  transform: translateY(-75px);
  ${Passwordinput}:focus ~ & {
    transform: translateY(-105px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
  ${Passwordinput}:valid ~ & {
    transform: translateY(-105px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
}
`;

const SignUPPolicy = styled.div`    
display: flex;
align-items: center;
margin-bottom: 10px;
@media (pointer:coarse) {
  margin-bottom: 20px;
  a{
    font-size: 25px;
  }
}

`;

const CheckBoxR = styled.label`
    --button-width: 3.5em;
    --button-height: 2em;
    --toggle-diameter: 1.5em;
    --button-toggle-offset: calc((var(--button-height) - var(--toggle-diameter)) / 2);
    --toggle-shadow-offset: 10px;
    --toggle-wider: 3em;
    --color-grey: #cccccc;
    --color-green: #4296f4;
    cursor: pointer;
    @media (pointer:coarse) {
      --button-width: 5.5em;
      --button-height: 3em;
      --toggle-diameter: 2.25em;
      --toggle-wider: 7em;
    }

`;

const CheckBoxBody = styled(Input)`
    display: none;
    &:checked{
        background-color: var(--color-green);
        transform: translateX(calc(var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset)));
        box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
        transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));
    }
    &:active{
        width: var(--toggle-wider);
        transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));

    }
`;

const CSlider = styled.span`
    display: inline-block;
    width: var(--button-width);
    height: var(--button-height);
    background-color: var(--color-grey);
    border-radius: calc(var(--button-height) / 2);
    position: relative;
    transition: 0.3s all ease-in-out;


    ${CheckBoxBody}:checked ~ & {
        background-color: var(--color-green);

    }

    ::after {
        content: "";
        display: inline-block;
        width: var(--toggle-diameter);
        height: var(--toggle-diameter);
        background-color: #fff;
        border-radius: calc(var(--toggle-diameter) / 2);
        position: absolute;
        top: var(--button-toggle-offset);
        transform: translateX(var(--button-toggle-offset));
        box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
        transition: 0.3s all ease-in-out;
        ${CheckBoxBody}:active ~ & {
            width: var(--toggle-wider);
            transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));
        }
        ${CheckBoxBody}:checked ~ & {
            transform: translateX(calc(var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset)));
            box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);

            }
`;



const Mdiv = styled(motion.div)`
`;

const SIGNUP_MUTATION = gql`
mutation CreateAccount(
  $email:String!
  $nickname:String!
  $age:String!
  $gender:String!
  $password:String!
) {
  CreateAccount(
    email:$email
    nickname:$nickname
    age:$age
    gender:$gender
    password:$password
  ) {
    ok
    message
  }
}
`;

function SignUp() {
  const navigate = useNavigate();
  const onCompleted = (data) => {
    const {
      CreateAccount: { ok, message },
    } = data;
    if(!ok) {
      return setError("signupResult", { message });
    }
    navigate("/login",alert("회원가입 성공."));
  }
  const [CreateAccount, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState:{ isValid, errors }, setError, clearErrors } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    CreateAccount({
      variables: {
        ...data,
      },
    });
  };
 
    return (
       <Mdiv variants={modalVariants} initial="start" animate="end" exit="exit">
         <AuthLayout>
                 <FormBox>
                     <Logoinbox src={Logo}/>
                     <form onSubmit={handleSubmit(onSubmitValid)}>
                         <FormError message={errors?.email?.message} />
                         <Emailinput
                          {...register("email",{
                            required: "이메일은 꼭 필요해요!", 
                            pattern: {
                              value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                              message: "음... 이메일이 아닌 것 같아요."
                            }
                          })}
                         
                       onKeyDown={() => clearErrors("signupResult")}
                       onFocus={() => clearErrors("signupResult")} 
                          name="email"
                          type="text"
                          required=" "
                          hasError={Boolean(errors?.email?.message)}
                          />
                          <TlabelE>이메일을 입력해주세요</TlabelE>



                         <FormError message={errors?.nickname?.message} />
                         <Nicknameinput
                         {...register("nickname",{
                           required: "닉네임은 꼭 필요해요!",
                         })}
                       
                          name="nickname"
                          onKeyDown={() => clearErrors("signupResult")}
                          onFocus={() => clearErrors("signupResult")}
                          type="text"
                          required=" "
                          hasError={Boolean(errors?.nickname?.message)} 
                          />
                          <TlabelN>닉네임은 어떤게 좋을까요?</TlabelN>


                         
                         <FormError message={errors?.age?.message} />
                         <Ageinput
                          {...register("age",{
                            required: "나이는 꼭 필요해요!",
                          })}
                          
                          name="age"
                          type="number" 
                          required=" "
                          hasError={Boolean(errors?.age?.message)}
                           />
                         <TlabelA>나이</TlabelA>





                         <FormError message={errors?.gender?.message} />
                          <SelectG {...register("gender", {
                                    required: "성별은 꼭 필요해요!",
                            })}
                            >
                            <optgroup label="gender">
                            <option value="여자">여자</option>
                            <option value="남자">남자</option>
                            <option value="none">선택안함</option>
                            </optgroup>
                          </SelectG>





                         
                         <FormError message={errors?.password?.message} />
                         <Passwordinput
                          {...register("password",{
                            required: "비밀번호는 꼭 필요해요!",
                            minLength: {
                              value: 4,
                              message: "4자리 이상 입력해주세요."
                            }
                          })}
                         
                          name="password"
                          type="password" 
                          required=" "     
                          hasError={Boolean(errors?.password?.message)}
                           />
                           <TlabelP>비밀번호를 입력해주세요</TlabelP>

                           <SignUPPolicy>
                              <CheckBoxR>
                                  <CheckBoxBody 
                                      {...register("checkbox1",{
                                        required: "이용약관 동의는 꼭 필요해요!",
                                      })} 
                                      name="checkbox1"
                                      type="checkbox"
                                      required="active"     
                                      hasError={Boolean(errors?.checkbox1?.message)}/>
                                  <CSlider></CSlider>
                              </CheckBoxR>
                            
                              <a style={{"text-decoration": "underline"}} href="https://www.second.sticker.ooo/terms-of-use"
                                      target="_blank">(필수)이용약관 동의</a>
                            </SignUPPolicy>


                           <SignUPPolicy>
                              <CheckBoxR>
                                  <CheckBoxBody 
                                      {...register("checkbox2",{
                                        required: "개인정보 수집 동의는 꼭 필요해요!",
                                      })} 
                                      name="checkbox2"
                                      type="checkbox"
                                      required="active"     
                                      hasError={Boolean(errors?.checkbox2?.message)}/>
                                  <CSlider></CSlider>
                              </CheckBoxR>
                            <a style={{"text-decoration": "underline"}} href="https://www.second.sticker.ooo/privacy"
                            target="_blank">(필수)개인정보 수집및 동의</a>
                            </SignUPPolicy>


                           <SignUPPolicy>
                              <CheckBoxR>
                                  <CheckBoxBody 
                                      {...register("checkbox3",{
                                        required: "현재 14세 미만 이용자는 받고있지 않아요ㅠㅠ",
                                      })} 
                                      name="checkbox3"
                                      type="checkbox"
                                      required="active"     
                                      hasError={Boolean(errors?.checkbox3?.message)}/>
                                  <CSlider></CSlider>
                              </CheckBoxR><a style={{"text-decoration": "underline"}}>(필수)만14세 이상입니다.</a>
                            </SignUPPolicy>


                         <Button type="submit" 
                       value={loading ? "Loading..." : "Create Account"}
                       disabled={!isValid || loading } />
                        <FormError message={errors?.signupResult?.message} />
                     </form>
                     <Separator />
                   <SignUp2>
                   <span>계정이 있으신가요?</span>
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
        </Mdiv>
          
      );
}





export default SignUp;
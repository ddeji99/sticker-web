import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/Auth/AuthLayout";
import  Logo  from "../img/logo-B.png"; 
import routes from "../routes";
import Button from "../components/Auth/Button";
import Separator from "../components/Auth/Separator";
import Input from "../components/Auth/Input";
import { logUserIn } from "../apollo";
import FormBox from "../components/Auth/FormBox";
import { useForm } from "react-hook-form";
import FormError from "../components/Auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { LOGIN_MUTATION } from "../Documents/Mutation/LOGIN_MUTATION.js";
import { AnimatePresence, motion, Variants } from "framer-motion";

const Logoinbox = styled.img`
  width: 300px;
  padding: 3vh 0 5vh;
  object-fit: contain;
  @media all and (max-width:767px) {
    width: 70%;
  }
`;
const SignUp = styled.div`
  width: 100%;
  display: flex;
  a {
    font-weight: 600;
    letter-spacing: 1px;
    display: flex;
    color: #fff;
    align-items: center;
  }
  button {
  width: 50%;
  font-family: inherit;
  font-size: 15px;
  background: #000;
  color: white;
  margin: 0 0.5px 0 0.5px;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  overflow: hidden;
  transition: all 0.2s;
  text-shadow: 0 1px #666;

    @media all and (max-width:767px) {
        padding: 10px 0 10px 0;
        font-size: 12px;
    }
  }

  button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
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
  @media all and (max-width:767px) {
      width: calc(100% - 60px);
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;



const Passwordinput = styled(Input)`
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

@media all and (max-width:767px) {
  font-size: 18px;
  transform: translateY(-42px);
  ${Emailinput}:focus ~ & {
    transform: translateY(-63px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
  ${Emailinput}:valid ~ & {
    transform: translateY(-63px) translateX(34px) scale(1);
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
@media all and (max-width:767px) {
  font-size: 18px;
  transform: translateY(-42px);
  ${Passwordinput}:focus ~ & {
    transform: translateY(-63px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
  ${Passwordinput}:valid ~ & {
    transform: translateY(-63px) translateX(34px) scale(1);
    background-color: #fff;
    padding: 0 .2em;
    color: #1875FF;
  }
}
`;










function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state | null;
  const handleCloseModal = () => {
    navigate(-1);
  };
  const { register,
          handleSubmit,
          formState: { errors, isValid},
          getValues,
          setError,
          clearErrors,
        } = useForm({
    mode: "onChange", defaultValues: { email: state?.email, password: state?.password }
  });
 
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: { ok, message, token } }) => {
      if (ok === false) {
        return setError("loginResult", { message });
      }
      if (ok === true && token) {
        logUserIn(token);
        navigate("/");
      }
    },
  });

  const onValid = () => {
    if (loading === true) {
      return;
    }
    const { email, password } = getValues();
    loginMutation({ variables: { email, password } });
  };

  
    return (
      
      <AuthLayout>

      <FormBox> 
                   <Link to={"/"}><Logoinbox src={Logo}/></Link>
                   <Notification>{location?.state?.message}</Notification>
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
                       onKeyDown={() => clearErrors("loginResult")}
                       onFocus={() => clearErrors("loginResult")}
                       name="email" 
                       type="text"
                       required=" "
                       hasError={Boolean(errors?.email?.message)} 
                       />
                       <TlabelE>이메일을 입력해주세요</TlabelE>
                       
                       
                       <FormError message={errors?.password?.message} />
                       <Passwordinput  
                       {...register("password",{
                         required: "비밀번호는 꼭 필요해요!",
                       })}
                       
                       onKeyDown={() => clearErrors("loginResult")}
                       onFocus={() => clearErrors("loginResult")} 
                       name="password" 
                       type="password" 
                       required=" "                      
                       hasError={Boolean(errors?.password?.message)}
                       />
                       <TlabelP>비밀번호를 입력해주세요</TlabelP>
                       <Button 
                       type="submit" 
                       value={loading ? "Loading..." : "Login"}
                       disabled={!isValid || loading } 
                       />
                       <FormError message={errors?.loginResult?.message} />
                   </form>
                   <Separator />
                   <SignUp>
                    <button>
                      <Link to={"/sign-up"}>
                      <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" >                            

                          <path fill="#fff" d="M13.458 32.208q-.875 0-1.5-.625t-.625-1.5v-2.25q0-.625.438-1.083.437-.458 1.104-.458h3.333v-5.375q-1.583.208-3.25-.25-1.666-.459-2.708-1.584v-2.291H7.958l-4.166-4.25q-.375-.334-.354-.834.02-.5.354-.75 1.166-.75 2.812-1.458t3.813-.708q1.583 0 3 .416 1.416.417 2.791 1.375V8.917q.084-.584.5-1 .417-.417 1.084-.417h14.833q.667 0 1.104.458.438.459.438 1.125v19.25q0 1.625-1.125 2.75t-2.709 1.125Zm4.875-5.916h8.75q.667 0 1.084.416.416.417.416 1.084v.541q0 .75.5 1.25t1.25.5q.709 0 1.209-.5.5-.5.5-1.25V9.667H18.333v2.416l9.084 9.042q.291.292.416.521.125.229.125.479 0 .458-.312.771-.313.312-.729.312-.25 0-.479-.104-.23-.104-.521-.437l-4.667-4.542-.833.833q-.5.625-.979.917-.48.292-1.105.5ZM8.875 14.667h3.5v3.458q.75.5 1.458.708.709.209 1.375.209 1.084 0 2.146-.542 1.063-.542 1.604-1.125l.834-.833-2.875-2.875q-1.334-1.375-3-2.063-1.667-.687-3.5-.687-1.209 0-2.25.291-1.042.292-1.959.792Z" ></path>
                          </svg>
                        </div>
                      </div>
                      <span>회원가입</span>
                      </Link>
                    </button>
                    <button>
                      <Link to="/findpassword">
                      <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="#fff" d="m19.15 22.45-7.175-7.175q-.8 1.35-2.137 2.088Q8.5 18.1 6.9 18.1q-2.5 0-4.3-1.8Q.8 14.5.8 12q0-1.525.762-2.913Q2.325 7.7 3.6 6.9L1.525 4.825q-.4-.4-.387-.925.012-.525.412-.925.4-.4.938-.4.537 0 .937.4l17.6 17.6q.4.4.4.938 0 .537-.4.937t-.938.4q-.537 0-.937-.4ZM22 12q0 .25-.087.488-.088.237-.288.437l-1.925 1.9q-.2.2-.462.288-.263.087-.463.087-.1-.025-.188-.038-.087-.012-.137-.012L15.3 12l-2.25-2.25h6.7q.275 0 .5.087.225.088.425.288l.95.95q.2.2.288.437Q22 11.75 22 12ZM6.9 15q1.05 0 1.8-.6t1.025-1.375l-.6-.6L7.8 11.1 6.475 9.775l-.6-.6Q5 9.5 4.45 10.275 3.9 11.05 3.9 12q0 1.25.875 2.125T6.9 15Z"></path>
                          </svg>
                        </div>
                      </div>
                      <span>비밀번호<br/>찾기</span>
                      </Link>
                    </button>
                   </SignUp>
               </FormBox>
      </AuthLayout>
      
      
     
    );
};
export default Login;
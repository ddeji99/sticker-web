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
import qwert from "../img/qwert.png";

const Logoinbox = styled.img`
  width: 300px;
  padding: 3vh 0 5vh;
  object-fit: contain;
  @media all and (max-width:767px) {
    width: 70%;
  }
`;
















function Check() {
  

  
    return (
      
      <AuthLayout>

      
                   
                   <img src={qwert} />
               
      </AuthLayout>
      
      
     
    );
};
export default Check;
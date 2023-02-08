import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm, useWatch } from "react-hook-form";
import Button from "../components/Auth/Button";
import AuthLayout from "../components/Auth/AuthLayout";
import FormBox from "../components/Auth/FormBox";
import Input from "../components/Auth/Input";
import Separator from "../components/Auth/Separator";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { motion } from "framer-motion";
import simg from "../img/top_defult.png";
import smimg from "../img/MBanner01.jpg";
import FormError from "../components/Auth/FormError";
import { MAKEITEM_MUTATION } from "../Documents/Mutation/MAKEITEM_MUTATION";
import NotFound from "./NotFound";






const Mdiv = styled(motion.div)`
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
const Img = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;







function Additem () {

    const navigate = useNavigate();
    const loggedInUser = useLoggedInUser();
    const [imagepreview, setimagepreview] = useState("");
    const [mimagepreview, setmimagepreview] = useState("");

    const onCompleted = (data) => {
        const {
          makeitem: { ok, message },
        } = data;
        if(ok === false) {
          return setError("makeitemResult", { message });
        }
        if(ok === true) {
            navigate(window.location.reload(),  alert("아이템 생성완료!"))
            }
      }

    const [makeitem, { loading }] = useMutation(MAKEITEM_MUTATION, {
        onCompleted,
      });

    const { register, handleSubmit, getValues, watch, formState:{ isValid, errors }, setError, clearErrors } = useForm({
        mode: "onChange",
      });
      const watchingimgfile = watch("image");
      const watchingmimgfile = watch("mimage");


      const onSubmitValid = (data) => {
        if (loading) {
          return;
        }
        const { category, title, price, color, image, detail, size, brand, mimage, laundryinfo } = getValues();
        makeitem({
          variables: {
            category: category,
            title: title,
            price: price,
            color: color,
            image: image[0],
            detail: detail,
            size: size,
            brand: brand,
            mimage: mimage[0],
            laundryinfo: laundryinfo,
          },
        });
      };
    





      useEffect(() => {
        if (watchingimgfile && watchingimgfile.length > 0) {
          const avatarFile = watchingimgfile[0];
          const objectUrl = URL.createObjectURL(avatarFile);
          setimagepreview(objectUrl);
        }

        if (watchingmimgfile && watchingmimgfile.length > 0) {
            const avatarFile = watchingmimgfile[0];
            const objectUrl = URL.createObjectURL(avatarFile);
            setmimagepreview(objectUrl);
          }
      }, [watchingimgfile, watchingmimgfile]);


        if (loggedInUser?.nickname !== "테디베어" ) {
           return <NotFound />
        }
        
        
     





    return (
        <Mdiv>
         <AuthLayout>
                 <FormBox>
                     <form onSubmit={handleSubmit(onSubmitValid)}>
                     <Emailinput
                          {...register("category",{
                            required: "카테고리는 꼭 필요해요!", 
                          })}
                          name="category"
                          type="text"
                          required=" "
                          />
                          <TlabelE>category: TOP, BOTTOM, OUTER </TlabelE>

                          <Emailinput
                          {...register("title",{
                            required: "제목은 꼭 필요해요!", 
                          })}
                          name="title"
                          type="text"
                          required=" "
                          />
                          <TlabelE>제목을 입력해주세요</TlabelE>

                          <Emailinput
                          {...register("price",{
                            required: "가격은 꼭 필요해요!", 
                          })}
                          name="price"
                          type="text"
                          required=" "
                          />
                          <TlabelE>가격: ,없이숫자만</TlabelE>

                          <Emailinput
                          {...register("laundryinfo",{
                            required: "세탁정보는 꼭 필요해요!", 
                          })}
                          name="laundryinfo"
                          type="text"
                          required=" "
                          />
                          <TlabelE>세탁정보를 입력해주세요</TlabelE>

                          <Emailinput
                          {...register("color",{
                            required: "색상은 꼭 필요해요!", 
                          })}
                          name="color"
                          type="text"
                          required=" "
                          />
                          <TlabelE>색상을 입력해주세요</TlabelE>

                          <Emailinput
                          {...register("detail",{
                            required: "구매링크는 꼭 필요해요!", 
                          })}
                          name="detail"
                          type="text"
                          required=" "
                          />
                          <TlabelE>구매링크를 입력해주세요</TlabelE>

                          <Emailinput
                          {...register("size",{
                            required: "이메일은 꼭 필요해요!", 
                          })}
                          name="size"
                          type="text"
                          required=" "
                          />
                          <TlabelE>사이즈를 입력해주세요</TlabelE>

                          <Emailinput
                          {...register("brand",{
                            required: "성별은 꼭 필요해요!", 
                          })}
                          name="brand"
                          type="text"
                          required=" "
                          />
                          <TlabelE>성별: 남성, 여성</TlabelE>

                          <p>누끼이미지</p>
                          {imagepreview === "" ? <Img src={simg} /> : <Img src={imagepreview} />}
                          <input {...register("image")} id="image" type="file" accept="image/*"  />
                          <br></br>
                          <p>모델이미지</p>
                          {mimagepreview === "" ? <Img src={smimg} /> : <Img src={mimagepreview} />}
                          <input {...register("mimage")} id="mimage" type="file" accept="image/*"  />
                          <br />
                          <br />

                          <Button type="submit" 
                       value={loading ? "Loading..." : "Submit"}
                       disabled={!isValid || loading } />
                        <FormError message={errors?.makeitemResult?.message} />
                           

                          
                         
                     </form>
                     <Separator />
                   
                 </FormBox>
        </AuthLayout>
        </Mdiv>
    )
}

export default Additem;






/*

{imagepreview === "" ? <Img src={simg} /> : <Img src={imagepreview} />}
<input {...register("image")} id="image" type="file" accept="image/*"  />

                           */
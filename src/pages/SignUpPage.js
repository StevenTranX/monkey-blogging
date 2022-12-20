import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Field } from "../components/field";
import { Button } from "../components/button";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    // khi muốn dùng biến primary hay secondary thì dùng như trên
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;
const SignUpPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm();

  const handleTogglePassword = () => {
    setTogglePassword((prev) => !prev);
  };
  const handleSignUp = (values) => {
    if (!isValid) return 
    return new Promise ((resolve) => {
      setTimeout( () => {
        resolve()
      }, 3000)
    })
  };
  return (
    <SignUpPageStyles>
      <div className='container'>
        <img srcSet='./logo.png 2x' alt='monkey-pic' className='logo' />
        <h1 className='heading'>Monkey Blogging</h1>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className='form'
          autoComplete='off'
        >
          <Field className='field'>
            <Label htmlFor='fullname'>Full name</Label>
            <Input
              control={control}
              name='fullname'
              type='text'
              className='input'
              placeholder='Enter your full name'
              hasIcon
            ></Input>
          </Field>
          <Field className='field'>
            <Label htmlFor='email'>Email</Label>
            <Input
              control={control}
              name='email'
              type='email'
              className='input'
              placeholder='Enter your email'
              hasIcon
            ></Input>
          </Field>
          <Field className='field'>
            <Label htmlFor='password'>Password</Label>
            <Input
              control={control}
              name='password'
              type={togglePassword ? "text" : "password"}
              className='input'
              placeholder='Enter your password'
              hasIcon
            >
              {togglePassword ? (
                <IconEyeOpen onClick={handleTogglePassword} />
              ) : (
                <IconEyeClose onClick={handleTogglePassword} />
              )}
            </Input>
          </Field>
          <Button type='submit' style={{ maxWidth: 350, margin: "0 auto" }} isLoading = {isSubmitting} disabled = {isSubmitting}>
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;

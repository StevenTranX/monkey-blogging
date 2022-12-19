import React from "react";
import styled from "styled-components";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";

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
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm();

  const handleSignUp = (values) => {
    console.log(values);
  };
  return (
    <SignUpPageStyles>
      <div className='container'>
        <img srcSet='./logo.png 2x' alt='monkey-pic' className='logo' />
        <h1 className='heading'>Monkey Blogging</h1>
        <form onSubmit={handleSubmit(handleSignUp)} className='form'>
          <div className='field'>
            <Label htmlFor='fullname'>Full name</Label>
            <Input
              control={control}
              name='fullname'
              type='text'
              className='input'
              placeholder='Enter your full name'
              hasIcon
            />
          </div>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;

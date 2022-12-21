import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { useForm } from 'react-hook-form';
import { IconEyeClose, IconEyeOpen } from '../components/icon';
import { Field } from '../components/field';
import { Button } from '../components/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/firebase-config';
import { NavLink, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import AuthenticationPage from './AuthenticationPage';

const schema = yup.object({
  fullname: yup.string().required('Please enter your fullname'),
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 characters or greater'),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleTogglePassword = () => {
    setTogglePassword((prev) => !prev);
  };
  const handleSignUp = async (values) => {
    if (!isValid) return;

    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, 'users');
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    toast.success('Register successfully!!!');
    navigate('/');
  };
  // * The Object.values() method returns an array of a given object's own enumerable string-keyed property values.
  // * Phương thức Object.values(errors) này trả ra 1 mảng có chứa các values là phần tử chính.
  // * errors : { fullname : {message : 'Please enter your fullname'}. {ref : ....}, {type : 'required'}}
  // * Object.values(errors) : [{message : 'Please enter your fullname'}. {ref : ....}, {type : 'required'}}, {...}]

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  useEffect(() => {
    document.title = 'Register Page';
  }, []);

  return (
    <AuthenticationPage>
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
            type={togglePassword ? 'text' : 'password'}
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
        <div className='have-account'>
          Already have an account ? <NavLink to='/sign-in'>Login</NavLink>
        </div>
        <Button
          type='submit'
          style={{ maxWidth: 350, margin: '0 auto', width: '100%' }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          variant='primary'
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;

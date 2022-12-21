import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Button } from '../components/button';
import { Field } from '../components/field';
import { IconEyeClose, IconEyeOpen } from '../components/icon';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { useAuth } from '../contexts/authContext';
import { auth } from '../firebase/firebase-config';
import AuthenticationPage from './AuthenticationPage';

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 characters or greater'),
});

const SignInPage = (props) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: onchange,
    resolver: yupResolver(schema),
  });
  const [togglePassword, setTogglePassword] = useState(false);

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    toast.success('Register successfully!!!');
    navigate('/');
  };
  const handleTogglePassword = () => {
    setTogglePassword((prev) => !prev);
  };

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
    document.title = 'Login Page';
    if (userInfo?.email) navigate('/');
  }, [userInfo]);

  return (
    <AuthenticationPage>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className='form'
        autoComplete='off'
      >
        <Field>
          <Label htmlFor='email'>Enter your email</Label>
          <Input
            type='email'
            control={control}
            name='email'
            placeholder='Enter your email address'
          ></Input>
        </Field>
        <Field>
          <Label htmlFor='password'>Enter your password</Label>
          <Input
            type={togglePassword ? 'text' : 'password'}
            control={control}
            name='password'
            placeholder='Enter your password'
          >
            {togglePassword ? (
              <IconEyeOpen onClick={handleTogglePassword} />
            ) : (
              <IconEyeClose onClick={handleTogglePassword} />
            )}
          </Input>
        </Field>
        <div className='have-account'>
          Already have not had an account ?{' '}
          <NavLink to='/sign-up'>Register</NavLink>
        </div>
        <Button
          type='submit'
          style={{ maxWidth: 350, margin: '0 auto', width: '100%' }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

SignInPage.propTypes = {};

export default SignInPage;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const AuthenticationPageStyles = styled.div`
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
  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;
// ! Thay vì chúng ta copy y xì Trang SignInPage từ trang SignUpPage thì ta nên tạo ra 1 trang AuthenPage để lấy toàn bộ những phần giống nhau
// ! Sau đó dùng <AuthenPage></AuthenPage> ở 2 trang SignUp SignIn
const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className='container'>
        <NavLink to='/'>
          <img srcSet='./logo.png 2x' alt='monkey-pic' className='logo' />
        </NavLink>
        <h1 className='heading'>Monkey Blogging</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

AuthenticationPage.propTypes = {};

export default AuthenticationPage;

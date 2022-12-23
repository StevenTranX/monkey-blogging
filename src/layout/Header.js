import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../components/button';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
const menuLinks = [
  { url: '/', title: 'Home' },
  { url: '/blog', title: 'Blog' },
  { url: '/contact', title: 'Contact' },
];

const HeaderStyles = styled.header`
  padding: 20px 0px;
  .header-main {
    display: flex;
    align-items: center;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }
  .search {
    padding: 15px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    margin-left: auto;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
  .header-button {
    margin-left: 20px;
  }
  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 30px;
    }
    .menu,
    .search,
    .header-button,
    .header-auth {
      display: none;
    }
  }
`;

function getLastName(name) {
  if (typeof name !== 'string') return;
  if (!name) return 'User';

  const splittedName = name.split(' ');
  const length = name.split(' ').length;

  return splittedName[length - 1];
}

const Header = (props) => {
  const { userInfo } = useAuth();

  return (
    <HeaderStyles>
      <div className='container'>
        <div className='header-main'>
          <NavLink to='/'>
            <img className='logo' alt='monkey-blogging' srcSet='/logo.png 2x' />
          </NavLink>
          <ul className='menu'>
            {menuLinks.length > 0 &&
              menuLinks.map((item) => (
                <li className='menu-item' key={item.title}>
                  <NavLink to={item.url} className='menu-link'>
                    {item.title}{' '}
                  </NavLink>
                </li>
              ))}
          </ul>
          <div className='search'>
            <input
              type='text'
              className='search-input'
              placeholder='Search post....'
            />
            <span className='search-icon'>
              <svg
                width='18'
                height='17'
                viewBox='0 0 18 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <ellipse
                  cx='7.66669'
                  cy='7.05161'
                  rx='6.66669'
                  ry='6.05161'
                  stroke='#999999'
                  strokeWidth='1.5'
                />
                <path
                  d='M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893'
                  stroke='#999999'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
                <path
                  d='M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826'
                  stroke='#999999'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <Button
              style={{ maxWidth: 200 }}
              className='header-button'
              height='56px'
              to='/sign-up'
            >
              Sign Up
            </Button>
          ) : (
            <div className='header-auth'>
              <span>Welcome back !!</span>
              <strong>{getLastName(userInfo?.displayName)}</strong>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

Header.propTypes = {};

export default Header;

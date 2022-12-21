import React from 'react';
import styled, { css } from 'styled-components';
import LoadingSpinner from '../loading/LoadingSpinner';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0px 25px;
  border-radius: 8px;
  height: ${(props) => props.height || '66px'};

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
      color: white;
    `};
  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background-color: white;
      color: ${(props) => props.theme.primary};
    `};

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 */
const Button = ({
  type = 'button',
  onClick = () => {},
  children,
  variant = 'primary',
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  // * Tạo 1 biến child để làm conditional, nếu có isLoading thì hiện loading còn không thì hiện children, và dùng biến child này để chứa -> biến child này 1 là loading 2 là children.
  if (to !== '' && typeof to === 'string') {
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} variant={variant} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }

  return (
    <ButtonStyles type={type} variant={variant} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};
Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default Button;

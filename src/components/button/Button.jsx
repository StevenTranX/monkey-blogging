import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from 'prop-types'


const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0px 25px;
  line-height: 1;
  border-radius: 8px;
  width : 100%;
  height : ${props => props.height || '66px'} ;

  display : flex;
  justify-content: center;
  align-items: center;
  
  color: white;
  font-size: 18px;
  font-weight: 600;

  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  &:disabled {
    opacity : 0.5;
    pointer-events: none;
  }

`;
/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns 
 */
const Button = ({type = 'button' , onClick = () => {}, children, ...props }) => {
    const {isLoading} = props
    const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children
    // * Tạo 1 biến child để làm conditional, nếu có isLoading thì hiện loading còn không thì hiện children, và dùng biến child này để chứa -> biến child này 1 là loading 2 là children. 
  return <ButtonStyles type = {type} onClick = {onClick} {...props}>{child}</ButtonStyles>;
};
Button.propTypes = {
  type : PropTypes.oneOf(['button', 'submit']).isRequired,
  isLoading : PropTypes.bool,
  onClick : PropTypes.func,
  children : PropTypes.node,
}

export default Button;

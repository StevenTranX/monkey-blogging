import React from "react";
import PropTypes from "prop-types";
import styled, {css} from "styled-components";
import { NavLink } from "react-router-dom";

const PostTitleStyles = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  display : block;
  
  a {
    display : block;
  }
  
  ${props => props.size === 'normal' && css`
    font-size: 18px;
  `};
  ${props => props.size === 'big' && css`
    font-size: 22px;
  `};
`;

const PostTitle = ({ children, className, size = '', to = '/' }) => {
  return <PostTitleStyles className={` ${className} post-title`} size = {size}>
    <NavLink to = {to}>{children}</NavLink>
  </PostTitleStyles>;
};

PostTitle.propTypes = {};

export default PostTitle;

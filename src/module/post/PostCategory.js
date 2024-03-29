import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  background-color: #f3f3f3;

  a {
    display: block;
    cursor: pointer;
  }

  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
    @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }
`;

const PostCategory = ({ children, type = "primary", className, to = "/" }) => {
  return (
    <PostCategoryStyles type={type} className={`${className} post-category `}>
      <NavLink to={to}> {children}</NavLink>
    </PostCategoryStyles>
  );
};

PostCategory.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["primary", "secondary"]),
  className: PropTypes.string,
};

export default PostCategory;

import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import IconEyeOpen from "../icon/IconEyeOpen";

const InputStyles = styled.div`
  // ?? Tại sao lại dùng styled.div mà không dùng styled.input
  // * Vì ở field password ta sẽ có con mắt để show/ unshow  và input là thẻ đóng không truyền children như div hay span được nên dùng div bọc lại
  width : 100%;
  position: relative;
  input {
    width: 100%;
    padding: ${props => props.hasIcon ? "20px 60px 20px 20px" : '20px'};
    // ! Nếu có props là hasIcon thì có nhiều padding-right 60px để chữ không bị dính IconEye còn không thì cứ padding 20px 
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
  }
  input:focus {
    background-color: white;

    border: 1px solid ${(props) => props.theme.primary};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
  .icon-eye {
    position : absolute;
    right : 20px;
    top : 50%;
    transform: translateY(-50%);
    cursor : pointer;
  }
`;
const Input = ({
  children,
  name = "",
  type = "text",
  hasIcon = false,
  control,
  ...props
}) => {

  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  // ?? Tại sao không truyền name vào input phía dưới ??
  // * Vì ta đã dùng hook useController và lấy ra được name ở field rồi
  // * mà input ở dưới đã có {...field} có nghĩa là name đã được bung ra name = {name}
  return (
    <InputStyles hasIcon = {hasIcon} {...props}>
      <input id={name} type={type} {...field} {...props} />
      {hasIcon ? <IconEyeOpen className = 'icon-eye'></IconEyeOpen> : null}
    </InputStyles>
  );
};

export default Input;

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import { IconEyeClose, IconEyeOpen } from '../icon'

const InputPasswordToggle = ({control}) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const handleTogglePassword = () => {
    setTogglePassword((prev) => !prev);
  };
  return (
    <>
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
    </>
  )
}

InputPasswordToggle.propTypes = {}

export default InputPasswordToggle
import React from 'react'
import PropTypes from 'prop-types'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase-config'
import styled from 'styled-components'
import Header from '../layout/Header'

const HomePageStyles = styled.div`

`

const HomePage = props => {
    const handleSignOut = () => {
        signOut(auth)
    }
  return (
    <HomePageStyles>
      <Header></Header>
    </HomePageStyles>
  )
}

HomePage.propTypes = {}

export default HomePage
import React from 'react'
import Background from '../components/Background'
import Button from '../components/Button'


export default function StartScreen({ navigation }) {
  return (
    
    <Background >
      {/*
      <Header>Login</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}

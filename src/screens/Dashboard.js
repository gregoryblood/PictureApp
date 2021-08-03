import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button';
import { firebase } from '@firebase/app';
import '../core/globals';

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => {
          firebase.auth().signOut().then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }).catch((error) => {
            alert("Error");
          });
        }

        }
      >
        Logout
      </Button>
    </Background>
  )
}

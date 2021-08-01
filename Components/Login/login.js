import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { background, backgroundLight, white } from '../color';
import { padding } from '../helperFunc';

import withFirebaseAuth from 'react-with-firebase-auth';
import { firebase } from '@firebase/app'

import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';
import { gUser } from '../globals';
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

//Firebase set up
var firebaseApp = firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({});
}else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}
const firebaseAppAuth = firebaseApp.auth();


function Login({
  user, signOut}) {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [loggingIn, onLoggingIn] = React.useState(false);

  function createAccount () {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log("Created User");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error\n" + errorCode + "\n" + errorMessage);
    });
  }

  function signIn () {
    onLoggingIn(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      gUser = user;
      console.log(gUser.email);
      onLoggingIn(false);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error" + errorCode + errorMessage);
      onLoggingIn(false);
    });
  }


  return (
    <View style={styles.container}>
      {user ? 
      <React.Fragment>
        {console.log(user.uid)}
        <Text style={styles.text}>{user.email}</Text>
        <Pressable onPress={signOut}>
          <Text style={styles.loginButton}>Sign Out</Text>
        </Pressable>
      </React.Fragment>
      :
      <React.Fragment>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input} onChangeText={onChangeEmail}></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.input} onChangeText={onChangePassword}></TextInput>
        <Pressable onPress={signIn}>
          {loggingIn ?
          <ActivityIndicator />
          :
          <Text style={styles.loginButton}>Login</Text>
          }
        </Pressable>
    </React.Fragment>
      }

    </View>
  );
}
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'left',
        color: white,
        paddingVertical: 12,
    },
    input: {
        backgroundColor: backgroundLight,
        borderRadius: 8,
        height: 40,
        color: white,
        fontSize: 24,
        padding: 8,
    },
    loginButton: {
        backgroundColor: background,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 16,
        marginVertical: 24,
        borderRadius: 8,
        fontSize: 24,
        color: 'gold',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'gold',
        
    }
});

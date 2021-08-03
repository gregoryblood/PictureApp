import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { firebase } from '@firebase/app';
import '../core/globals';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [password2, setPassword2] = useState({ value: '', error: '' })


  function signUp () {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      user.updateProfile({
        displayName: name.value
      }).then(() => {
        // Update successful, send auth email
        firebase.auth().currentUser.sendEmailVerification()
          .then(() => {
            firebase.auth().signOut().then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'StartScreen' }],
              })
            }).catch((error) => {
              alert("Error");
            });
          });

      }).catch((error) => {
        alert("Error: " + error.code + error.message);
      });  
    })
    .catch((error) => {
      setEmail({ ...email, error: error.message});
      //alert("Error: " + error.code + error.message);
    });
  }
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    var password2Error = null;
    if (password2.value !== password.value) {
      password2Error = "Passwords do not match.";
    }
    if (emailError || passwordError || nameError || password2Error) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      if (password2Error) {
        setPassword({ ...password, error: password2Error });
      }
      setPassword2({ ...password2, error: password2Error });
      return;
    }
    signUp();
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={password2.value}
        onChangeText={(text) => setPassword2({ value: text, error: '' })}
        error={!!password2.error}
        errorText={password2.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

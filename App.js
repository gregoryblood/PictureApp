import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import withFirebaseAuth from 'react-with-firebase-auth';
import { firebase } from '@firebase/app'
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import './src/core/globals';
import Loading from './src/components/Loading'
//Firebase set up
export var firebaseApp = firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({});
}else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}
export const firebaseAppAuth = firebaseApp.auth();

const Stack = createStackNavigator()

let start = undefined;
function App() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      gUser = user;
      start = "Dashboard";
    } else {
      start = "StartScreen";
    }
  });
  if (start) {
    return (
      <Provider theme={theme} >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={start}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  } else {
    return (
      <Loading/>
    )
  }

}
export default withFirebaseAuth({
  firebaseAppAuth,
})(App);

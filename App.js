import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { background, white } from './Components/color';
import Login from './Components/Login/login';
import { firebase } from "firebase/app";
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

export default function App() {
  return (
    <View style={styles.container}>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "Cochin"
  },
  text: {
    color: white,
  },
});

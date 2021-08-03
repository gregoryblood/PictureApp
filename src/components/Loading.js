import React from 'react'
import {  StyleSheet, View } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper';
export default function Loading() {
    return (
        <View style={styles.view}>
              <ActivityIndicator 
              animating={true} 
              color={Colors.black}
              size={'large'} />
        </View>
    );
};
  
const styles = StyleSheet.create({
    view: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
    },
});
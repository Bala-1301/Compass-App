import React from 'react'
import { View, StyleSheet,StatusBar, } from 'react-native'
import Compass from './Compass'

export default class App extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content"  backgroundColor ="black"/>
        <Compass />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container :{
    flex : 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor : "black"
  },
 
})


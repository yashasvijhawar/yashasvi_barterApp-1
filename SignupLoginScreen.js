import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SignUpLoginScreen extends Component{
    constructor(){
        super()
        this.state={
          emailId : '',
          password: '',
        }
      }

      userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
         return Alert.alert("Successfully Login")
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }
    
      userSignUp = (emailId, password, confirmPassword) =>{
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then(()=>{
          return Alert.alert("User Added Successfully")
          })

        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        });
      }
      
    render(){
        
        return(
            <View style={{alignItems:'center'}}>
                <Text style={styles.title}>The Barter App</Text>
                <View style={{alignItems:'center'}}>
                <TextInput
          style={styles.loginBox}
          placeholder="example@barterApp.com"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          placeholder="password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />

         <TouchableOpacity
            style={[styles.button,{marginBottom:10}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={{color:'#ff5722',fontSize:18,fontWeight:'bold'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={{color:'#ff5722',fontSize:18,fontWeight:'bold'}}>SignUp</Text>
          </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3e11'
  },
  loginBox:{
    width: 300,
    marginTop:20,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
      marginTop:30,
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#bb4a",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
})

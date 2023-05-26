import React, { Component } from 'react'
import { Image, Text, View,StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import logo from '../assets/Logo.png'

export default function Login() {
    return (
      <View>
        <Image source={logo} style={style.logo}  />
        <Text style={style.head}>
            Hi, Welcome Back!
        </Text>
        <Text style={style.textLight}>
            Hello again, you've been missed!
        </Text>
       <View style={style.inputView}>
       <TextInput placeholder='Enter username' style={style.inputTag} />
       <TextInput placeholder='Enter Password' style={style.inputTag} />
        
        <Text>
            Forgot Password?
        </Text>
        
       
        <TouchableOpacity style={style.btn}>
          
            <Text style={style.btnText}>
                Login
            </Text>
        </TouchableOpacity>
        <Text style={{
            textAlign:"center"
        }}>
            Register
        </Text>
       </View>
      </View>
    );
  }

const style = StyleSheet.create({
    logo:{
        width:200,
        height:200
    },
    head:{
        fontSize:20,
        fontWeight:700
    },
    textLight:{
        color:"grey"
    },
    inputTag:{
        marginVertical:8,
        borderWidth:1,
        padding:12,
        paddingRight:180,
        borderRadius:7
    },
    inputView:{
        marginVertical:20
    },
    btn:{
        marginVertical:15,
        backgroundColor:"blue",
        padding:15,
        borderRadius:7

    },
    btnText:{
        color:"white",
        textAlign:"center"
    }
})
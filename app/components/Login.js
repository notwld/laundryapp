import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import logo from '../assets/Logo.png';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import baseURL from '../baseURL';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async () => {
    if ((email === '' && username === '') || password === '' || role === '') {
      Alert.alert('Please fill all the fields!');
      return;
    }



    await fetch(baseURL.URL + 'user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "role": role
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'Logged In!') {
          setPassword('');
          setEmail('');
          setUsername('');
          setRole('');

          if (data.user.Role === 'CUSTOMER') {
            navigation.navigate('CustomerHome', { user: data.user, token: data.token });
          } else if (data.user.Role === 'VENDOR') {
            navigation.navigate('VendorHome', { user: data.user, token: data.token });
          } else if (data.user.Role === 'LAUNDRYSTAFF') {
            navigation.navigate('LaundryStaffHome', { user: data.user, token: data.token });
          } else if (data.user.Role === 'ADMIN') {
            navigation.navigate('AdminHome', { user: data.user, token: data.token });
          }
        } else {
          Alert.alert('Login Failed', data.message);
        }
      })
      .catch((err) => {
        Alert.alert('Login Failed', 'Something went wrong, please try again later!')
        console.log(err)
      },
      );
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.loginScreen}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.head}>Hi, Welcome Back!</Text>
      <Text style={styles.textLight}>Hello again, you've been missed!</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Enter username"
          style={styles.inputTag}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={true}
          style={styles.inputTag}
          value={password}
          onChangeText={setPassword}
        />
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.inputTag}
        >
          <Picker.Item label="Select role" value="" />
          <Picker.Item label="Customer" value="CUSTOMER" />
          <Picker.Item label="Vendor" value="VENDOR" />
          <Picker.Item label="Laundry Staff" value="LAUNDRYSTAFF" />
          <Picker.Item label="Admin" value="ADMIN" />
        </Picker>

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
  head: {
    fontSize: 20,
    fontWeight: '700',
  },
  textLight: {
    color: 'grey',
  },
  inputTag: {
    marginVertical: 8,
    borderWidth: 1,
    padding: 12,
    width: 250,
    borderRadius: 7,
  },
  inputView: {
    marginVertical: 10,
  },
  btn: {
    marginVertical: 7,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 7,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

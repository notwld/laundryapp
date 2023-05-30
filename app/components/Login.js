import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import logo from '../assets/Logo.png';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = () => {
    // Perform login logic here
  };

  return (
    <View style={styles.loginScreen}>
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
        <Text>Forgot Password?</Text>

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    paddingRight: 150,
    borderRadius: 7,
  },
  inputView: {
    marginVertical: 20,
  },
  btn: {
    marginVertical: 15,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 7,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});
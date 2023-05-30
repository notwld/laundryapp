import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import logo from '../assets/Logo.png';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = () => {
    // Perform registration logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.registerScreen}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.head}>Register</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="First Name"
          style={styles.inputTag}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.inputTag}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Email"
          style={styles.inputTag}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Username"
          style={styles.inputTag}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputTag}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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

        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  registerScreen: {
    
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

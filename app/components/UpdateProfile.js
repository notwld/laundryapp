import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const UpdateProfileScreen = (props) => {
  const navigation = useNavigation();
  const { user } = props.route.params;
  const { token } = props.route.params;
  const data = user;
  const [firstName, setFirstName] = useState(data.FirstName);
  const [lastName, setLastName] = useState(data.LastName);
  const [email, setEmail] = useState(data.Email);
  const [address, setAddress] = useState(data.Address);
  const [phone, setPhone] = useState(data.Phone);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState(data.Username);
  const [role, setRole] = useState(data.Role);

  const handleUpdateProfile = async () => {
    const response = await fetch(
      `http://192.168.124.59:19001/api/profile/update/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          "fname": firstName,
          "lname": lastName,
          "username": username,
          "email": email,
          "phone": phone,
          "address": address,
          "password": password,
          "newPassword": newPassword,
          "role": role,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'User Updated!') {
          Alert.alert('Success', 'User updated successfully!');
          navigation.navigate('Profile', { token: token });
        }
        else {
          Alert.alert('Update Failed', data.message);
        }
      }
      )
      .catch((err) => console.log(err));

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Update Profile</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select role" value="" />
        <Picker.Item label="Customer" value="CUSTOMER" />
        <Picker.Item label="Vendor" value="VENDOR" />
        <Picker.Item label="Laundry Staff" value="LAUNDRYSTAFF" />
        <Picker.Item label="Admin" value="ADMIN" />
      </Picker>

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Current Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password or Current password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#EAF0F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#235789',
  },
  input: {
    marginVertical: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 7,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpdateProfileScreen;

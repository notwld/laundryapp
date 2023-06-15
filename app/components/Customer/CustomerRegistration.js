import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import baseURL from '../../baseURL';

const CustomerRegistration = (props) => {
    const {user,token} = props.route.params;
  const [customerName, setCustomerName] = useState(user.Username);
  const [billingAddress, setBillingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleRegister = async () => {
    if (!customerName || !billingAddress || !paymentMethod) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    await fetch(baseURL.URL + 'customer/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "customerName": customerName,
            "billingAddress": billingAddress,
            "paymentMethod": paymentMethod,
        }),
    })
        .then((response) => {
            return response.json()})
        .then((data) => {
            console.log(data);
           Alert.alert('Success', 'Customer created successfully');
            navigation.goBack();
            
        }
        )
        .catch((error) => {
            console.error(error);
        }
        );


    
  };

  return (
    <LinearGradient colors={['#00FFFF', '#00CCCC']} style={styles.container}>
        <TouchableOpacity style={styles.closeIcon} onPress={()=>{
            props.navigation.goBack();
        }}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Customer Registration</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Customer Name"
          value={customerName}
          onChangeText={setCustomerName}
        />

        <TextInput
          style={styles.input}
          placeholder="Billing Address"
          value={billingAddress}
          onChangeText={setBillingAddress}
        />

        <Picker
          style={styles.input}
          selectedValue={paymentMethod}
          onValueChange={(itemValue) => setPaymentMethod(itemValue)}
        >
          <Picker.Item label="Select Payment Method" value="" />
          <Picker.Item label="Credit Card" value="credit_card" />
          <Picker.Item label="Debit Card" value="debit_card" />
          <Picker.Item label="PayPal" value="paypal" />
          {/* Add more payment methods as needed */}
        </Picker>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  header: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    paddingVertical: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00CCCC',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CustomerRegistration;

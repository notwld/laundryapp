import React, { useState } from 'react';
import { View, TextInput, Switch, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../Header';

export default function CreateVendorForm(props) {
  const { user, handleLogout, token } = props.route.params;

  const [name, setName] = useState('');
  const [rates, setRates] = useState('');
  const [rating, setRating] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);
  const [workingHours, setWorkingHours] = useState('');
  const [availability, setAvailability] = useState('');

  const handleSubmit = () => {
    setName('');
    setRates('');
    setRating('');
    setAddress('');
    setPhone('');
    setEmail('');
    setWebsite('');
    setSpecialization('');
    setDeliveryAvailable(false);
    setWorkingHours('');
    setAvailability('');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header user={user} handleLogout={handleLogout} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 10 }}>Create Vendor</Text>

        <View style={{ padding: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Rates"
            value={rates}
            onChangeText={setRates}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Rating"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
          />
          <TextInput
            style={styles.input}
            placeholder="Specialization"
            value={specialization}
            onChangeText={setSpecialization}
          />
          <View style={styles.switchContainer}>
            <Switch
              value={deliveryAvailable}
              onValueChange={setDeliveryAvailable}
            />
            <TextInput
              style={styles.switchLabel}
              editable={false}
              pointerEvents="none"
            >
              Delivery Available: {deliveryAvailable ? 'Yes' : 'No'}
            </TextInput>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Working Hours"
            value={workingHours}
            onChangeText={setWorkingHours}
          />
          <TextInput
            style={styles.input}
            placeholder="Availability"
            value={availability}
            onChangeText={setAvailability}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.btnText}>Create Vendor</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  input: {
    marginVertical: 8,
    borderWidth: 1,
    padding: 12,
    paddingRight: 85,
    borderRadius: 7,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    marginLeft: 10,
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

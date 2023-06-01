import React, { useState } from 'react';
import { View, TextInput, Switch, Button, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../Header';
import cities from "../../../app/cities.json"

export default function CreateVendorForm(props) {
  const { user, handleLogout, token } = props.route.params;

  const [name, setName] = useState('');
  const [rates, setRates] = useState('');
  const [rating, setRating] = useState('');
  const [location, setLocation] = useState('');
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
    setLocation('');
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
            keyboardType="email-location"
          />
          <TextInput
            style={styles.input}
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
          />
          <Picker
            selectedValue={specialization}
            onValueChange={itemValue => setSpecialization(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Specialization" value="" />
            <Picker.Item label="Washing" value="Washing" />
            <Picker.Item label="Ironing" value="Ironing" />
            <Picker.Item label="Dry Cleaning" value="Dry Cleaning" />
            <Picker.Item label="Alterations" value="Alterations" />
          </Picker>
          <Picker
            selectedValue={location}
            onValueChange={itemValue => setLocation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Location" value="" />
            {cities.map((city, index) => (
              <Picker.Item key={index} label={city.name} value={city.name} />
            ))}
          </Picker>
          <View style={styles.switchContainer}>
            <Switch
              value={deliveryAvailable}
              onValueChange={setDeliveryAvailable}
            />
            <Text style={styles.switchLabel}>
              Delivery Available: {deliveryAvailable ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              value={availability}
              onValueChange={setAvailability}
            />
            <Text style={styles.switchLabel}>
              Availability: {availability ? 'Available' : 'Not Available'}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Working Hours"
            value={workingHours}
            keyboardType="numeric"
            onChangeText={setWorkingHours}
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
  picker: {
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
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

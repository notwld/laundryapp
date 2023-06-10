import React, { useState,useEffect } from 'react';
import { View, TextInput, Switch, Button, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../Header';
import cities from '../../../app/cities.json';
import baseURL from '../../baseURL';
import { useNavigation } from '@react-navigation/native';

export default function CreateVendorForm(props) {
  const { user, token } = props.route.params;
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [rates, setRates] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [specializationData, setSpecializationData] = useState([]);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);
  const [workingHours, setWorkingHours] = useState('');
  const [availability, setAvailability] = useState(false);

  const createVendor = async () => {
    console.log(name, rates, location, phone, email, website, specialization, deliveryAvailable, workingHours, availability);
   
      const response = await fetch(baseURL.URL + 'vendor/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "name": name,
          "location": location,
          "phone": phone,
          "email": email,
          "website": website,
          "specializationID": specialization,
          "deliveryAvailability": deliveryAvailable,
          "workingHours": workingHours,
          "availability": availability,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Alert.alert('Success', 'Vendor created successfully');
          navigation.navigate('VendorHome', { user: user, token: token });

        }
        )
        .catch((err) => console.log(err));

  };
  useEffect(() => {
    const getSpecialization = async () => {
      const response = await fetch(baseURL.URL + 'vendor/specialization', {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => {
          
          return res.json();

        })
        .then((data) => {
          console.log(data);
          setSpecializationData(data);
        }
        )
        .catch((err) => console.log(err));
    }
    getSpecialization();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header user={user} token={token} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Create Vendor</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
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
          <Picker
            selectedValue={specialization}
            onValueChange={(itemValue) => setSpecialization(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Specialization" value="" />
            {specializationData.map((specialization, index) => (
              <Picker.Item key={index} label={`${specialization.Name} - $${specialization.Rates}`} value={specialization.SpecializationID} />
            ))}
          </Picker>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
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
            <Switch value={availability} onValueChange={setAvailability} />
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

          <TouchableOpacity onPress={createVendor} style={styles.btn}>
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  formContainer: {
    padding: 20,
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

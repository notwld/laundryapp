import React, { useState, useEffect } from 'react';
import { View, TextInput, Switch, Button, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../Header';
import cities from '../../../app/cities.json';
import baseURL from '../../baseURL';
import { useNavigation } from '@react-navigation/native';

export default function CreateVendorForm(props) {
  const { user, token, vendor, mode } = props.route.params;
  const navigation = useNavigation();
  const [vendorId, setVendorId] = useState(vendor && vendor.VendorID !== undefined ? vendor.VendorID : '');
  const [name, setName] = useState(vendor && vendor.Name !== undefined ? vendor.Name : '');
  const [location, setLocation] = useState(vendor && vendor.Location !== undefined ? vendor.Location : '');
  const [phone, setPhone] = useState(vendor && vendor.Phone !== undefined ? vendor.Phone : '');
  const [email, setEmail] = useState(vendor && vendor.Email !== undefined ? vendor.Email : '');
  const [website, setWebsite] = useState(vendor && vendor.Website !== undefined ? vendor.Website : '');
  const [specialization, setSpecialization] = useState(vendor && vendor.specialization !== undefined ? vendor.specialization : '');
  const [specializationData, setSpecializationData] = useState([]);
  const [deliveryAvailable, setDeliveryAvailable] = useState(vendor && vendor.DeliveryAvailable !== undefined ? vendor.DeliveryAvailable : '');
  const [workingHours, setWorkingHours] = useState(vendor && vendor.WorkingHours !== undefined ? vendor.WorkingHours : '');
  const [availability, setAvailability] = useState(vendor && vendor.Availability !== undefined ? vendor.Availability : '');

  
  const createVendor = async () => {
    if (!name || !location || !phone || !email || !website || !specialization || !workingHours) {
      Alert.alert('Error', 'Please fill all the required fields');
      return;
    }
    try {
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
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.status === 200) {
        Alert.alert('Success', 'Vendor created successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to create vendor');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while creating vendor');
    }
  };
  
  const editVendor = async () => {
    if (!name || !location || !phone || !email || !website || !specialization || !workingHours) {
      Alert.alert('Error', 'Please fill all the required fields');
      return;
    }
    try {
      const response = await fetch(baseURL.URL + 'vendor/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "vendorId": vendorId,
          "name": name,
          "location": location,
          "phone": phone,
          "email": email,
          "website": website,
          "specializationID": specialization,
          "deliveryAvailable": deliveryAvailable,
          "workingHours": workingHours,
          "availability": availability,
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.status === 200) {
        Alert.alert('Success', 'Vendor edited successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to edit vendor');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while editing vendor');
    }
  };

  

  useEffect(() => {
    const getSpecialization = async () => {
      try {
        const response = await fetch(baseURL.URL + 'vendor/specializations', {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setSpecializationData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecialization();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header user={user} token={token} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{mode ? "Edit Vendor" : "Create Vendor"}</Text>
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
          {!mode ? (
            <TouchableOpacity onPress={createVendor} style={styles.btn}>
              <Text style={styles.btnText}>Create Vendor</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={editVendor} style={styles.btn}>
              <Text style={styles.btnText}>Edit Vendor</Text>
            </TouchableOpacity>
          )}
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

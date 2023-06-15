import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView, Alert, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
const citiesData = require('../../cities.json');
import VendorCard from './VendorCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import baseURL from '../../baseURL';

const CustomerHome = (props) => {
  const { user, token } = props.route.params;
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState('');
  const [vendors, setVendors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    if (selectedCity !== '') {
      const filteredVendors = vendors.filter((vendor) =>
        vendor.Location.toLowerCase().includes(selectedCity.toLowerCase())
      );
      setFilteredVendors(filteredVendors);
    } else {
      setFilteredVendors(vendors);
    }
    if (user.CustomerID === null) {
      Alert.alert(
        'Please complete your customer profile first!',
        'You will be redirected to the customer registration page',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('CustomerRegistration', {
                user: user,
                token: token,
              }),
          },
          {
            text: 'Cancel',
            onPress: () =>
              navigation.navigate('CustomerHome', {
                user: user,
                token: token,
              }),
          },
        ]
      );
    }
  }, [vendors, selectedCity, user, token, navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!user) {
          return false;
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [user])
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(baseURL.URL + 'user/logout');
      const data = await response.json();
      if (data.message === 'Logged Out!') {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await fetch(baseURL.URL + 'vendor/vendors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const flattenedSpecializations = data
        .flatMap((item) => item.Specializations)
        .filter((specialization) => specialization.Name);
      setVendors(data);
      setFilteredVendors(data);
      setSpecializations(flattenedSpecializations);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (searchQuery !== '') {
      const filteredVendors = vendors.filter((vendor) =>
        vendor.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVendors(filteredVendors);
    } else {
      setFilteredVendors(vendors);
    }
  };

  const handleCityChange = (itemValue) => {
    setSelectedCity(itemValue);
    setSearchQuery('');
  };

  useEffect(() => {
    if (selectedCity !== '' && filteredVendors.length === 0) {
      Alert.alert(
        'No Vendors Found',
        'Please select a different location.',
        [
          {
            text: 'OK',
            onPress: () => setSelectedCity(''),
          },
        ]
      );
    }
  }, [selectedCity, filteredVendors]);

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.menuIcon} onPress={toggleModal}>
          <Ionicons name="menu" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal visible={isModalOpen} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={[styles.buttonText, { fontSize: 27, fontWeight: 'bold', marginBottom: 16 }]}>
              Welcome {user.Username}!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.buttonText}>Your Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.buttonText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.homeContainer}>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => handleCityChange(itemValue)}
        >
          <Picker.Item label="Select a city" value="" />
          {citiesData.map((city, index) => (
            <Picker.Item key={index} label={city.name} value={city.name} />
          ))}
        </Picker>
        <ScrollView contentContainerStyle={styles.scrollContentContainer} style={styles.scrollContainer}>
          {filteredVendors.map((vendor) => (
            <VendorCard
              key={vendor.VendorID}
              vendor={vendor}
              specializations={specializations}
              onPress={() =>
                navigation.navigate('VendorDetail', {
                  vendor: vendor,
                  user: user,
                  specializations: specializations,
                  token: token,
                  
                })
              }
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  scrollContentContainer: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  scrollContainer: {
    // No need for flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingTop: 10,
  },
  logo: {
    width: 75,
    height: 75,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f1f1f1',
  },
  menuIcon: {
    paddingRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  profileButton: {
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 'auto',
  },
});

export default CustomerHome;

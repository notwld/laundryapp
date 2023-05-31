
import React, { Component, useEffect, useState } from 'react'
import { Text, View,StyleSheet,TouchableOpacity, Image,Alert,FlatList,ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';
export default function VendorHome (props) {
  const [vendors,setVendors] = useState([
    {
      VendorID: 1,
      Name: "Vendor 1",
      Rates: 10.5,
      Rating: 4.2,
      Address: "123 Main St",
      Phone: "123-456-7890",
      Email: "vendor1@example.com",
      Website: "www.vendor1.com",
      Specialization: "Specialization 1",
      DeliveryAvailable: true,
      WorkingHours: "9 AM - 5 PM",
      Availability: "Weekdays",
      Venues: [
        {
          VenueID: 1,
          IsCurtain: true,
          IsJeans: false,
          IsBedSheet: true,
          IsBlanket: false,
          IsShirt: true,
          ISTrouser: false,
          IsShalwar: true,
          IsKameez: false,
        },
        // Add more venues if needed
      ],
    },
    {
      VendorID: 2,
      Name: "Vendor 2",
      Rates: 8.5,
      Rating: 3.8,
      Address: "456 Elm St",
      Phone: "987-654-3210",
      Email: "vendor2@example.com",
      Website: "www.vendor2.com",
      Specialization: "Specialization 2",
      DeliveryAvailable: false,
      WorkingHours: "10 AM - 6 PM",
      Availability: "Weekends",
      Venues: [
        {
          VenueID: 2,
          IsCurtain: false,
          IsJeans: true,
          IsBedSheet: false,
          IsBlanket: true,
          IsShirt: false,
          ISTrouser: true,
          IsShalwar: false,
          IsKameez: true,
        },
        // Add more venues if needed
      ],
    },
    {
      VendorID: 3,
      Name: "Vendor 3",
      Rates: 8.5,
      Rating: 3.8,
      Address: "456 Elm St",
      Phone: "987-654-3210",
      Email: "vendor2@example.com",
      Website: "www.vendor2.com",
      Specialization: "Specialization 2",
      DeliveryAvailable: false,
      WorkingHours: "10 AM - 6 PM",
      Availability: "Weekends",
      Venues: [
        {
          VenueID: 2,
          IsCurtain: false,
          IsJeans: true,
          IsBedSheet: false,
          IsBlanket: true,
          IsShirt: false,
          ISTrouser: true,
          IsShalwar: false,
          IsKameez: true,
        },
        // Add more venues if needed
      ],
    },
  ]);
    const navigation = useNavigation();
    const { user } = props.route.params;
    const {token} = props.route.params;
    console.log(user);
    useEffect(() => {
      
    }, []);
    const handleLogout = async() => {
      await fetch('http://192.168.1.107:19001/api/user/logout')
      .then((res) => res.json())
      .then((data) => {
        if(data.message === 'Logged Out!'){
          navigation.navigate('Login');
        }
        else{
          navigation.navigate('Login');
        }
      }
      )
      .catch((err) => console.log(err));
    };
    return (
      <View style={styles.container}>
        <Header user={user} handleLogout={handleLogout} />
        <View style={styles.vendorListContainer}>
          <View style={styles.vendorHeader}>
            <Text style={styles.vendorHeaderText}>Your Vendors</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateVendorForm', {user:user, token: token,handleLogout:handleLogout })}>
              <Text style={styles.createVendorText}>Create Vendor</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreateVendorForm', {user:user, token: token,handleLogout:handleLogout })}>
              <Text style={styles.createVendorText}>Add Venue</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.vendorListContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <FlatList
                data={vendors}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {}}>
                    <View style={styles.vendorItemContainer}>
                      <Text style={styles.vendorName}>{item.Name}</Text>
                      <Text style={styles.vendorInfo}>{item.Address}</Text>
                      <Text style={styles.vendorInfo}>{item.Phone}</Text>
                      <Text style={styles.vendorInfo}>{item.Email}</Text>
                      <Text style={styles.vendorInfo}>{item.Website}</Text>
                      <Text style={styles.vendorInfo}>{item.Specialization}</Text>
                      <Text style={styles.vendorInfo}>{item.WorkingHours}</Text>
                      <Text style={styles.vendorInfo}>{item.Availability}</Text>
                      <Text style={styles.vendorInfo}>{item.DeliveryAvailable.toString()}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.VendorID.toString()}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
     
    },
   
     vendorListContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
    vendorHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    vendorHeaderText: {
      fontSize: 20,
      fontWeight: '500',
    },
    createVendorText: {
      padding:5,
      color:"white",
      backgroundColor:"blue",
      borderRadius:5,
      fontSize: 12,
      fontWeight: '500',
    },
    scrollView: {
      flex: 1,
       // Add paddingBottom to create extra space at the bottom
    },
    vendorListContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 6,
      paddingTop: 0,
      paddingBottom: 100,
    },
    vendorItemContainer: {
      borderWidth: 1,
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderRadius: 6,
      padding: 10,
      margin: 10,
    },
    vendorName: {
      fontSize: 20,
      fontWeight: '500',
    },
    vendorInfo: {
      fontSize: 14,
      fontWeight: '400',
    },
  });
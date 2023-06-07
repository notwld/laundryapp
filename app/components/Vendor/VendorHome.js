
import React, { Component, useEffect, useState } from 'react'
import { Text, View,StyleSheet,TouchableOpacity, Image,Alert,FlatList,ScrollView } from 'react-native'
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

import Header from '../Header';
export default function VendorHome(props) {
  const [vendors, setVendors] = useState([]);
  const navigation = useNavigation();
  const { user } = props.route.params;
  const { token } = props.route.params;

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://192.168.1.107:19001/api/vendor/vendors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVendors(data);
      } else {
        console.error('Error fetching vendors:', response.status);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const navigateHandler = () => {
    navigation.navigate('CreateVendorForm', { user: user, token: token });
  };

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

  return (
    <View style={styles.container}>
      <Header user={user} token={token} />
      <View style={styles.vendorListContainer}>
        <View style={styles.vendorHeader}>
          <Text style={styles.vendorHeaderText}>Your Vendors</Text>
          <TouchableOpacity onPress={navigateHandler}>
            <Text style={styles.createVendorText}>Create Vendor</Text>
          </TouchableOpacity>
        </View>
      {
        vendors.length > 0 ?   <View style={styles.vendorListContainer}>
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
      </View> : <View style={styles.errorView}>
        <Text style={styles.vendorInfo}>No vendors found.</Text>
              </View>}
      </View>
    </View>
  );
}

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
     
    },
   errorView:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

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
      borderRadius: 13,
      padding: 15,
      margin: 10,
    },
    vendorName: {
      fontSize: 25,
      fontWeight: '500',
    },
    vendorInfo: {
      fontSize: 14,
      fontWeight: '400',
    },
  });
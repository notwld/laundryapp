import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import baseURL from '../../baseURL';
import Header from '../Header';

export default function VendorHome(props) {
  const [vendors, setVendors] = useState([]);
  const navigation = useNavigation();
  const { user } = props.route.params;
  const { token } = props.route.params;

  const fetchVendors = async () => {
   
      const response = await fetch(baseURL.URL + 'vendor/vendors', {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => res.json()) 
        .then((data) => {
          console.log(data);
          setVendors(data);
        }
        )
        .catch((err) => console.log(err));

  };

  useEffect(() => {
    fetchVendors();
  }, [user, token]);

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
        {vendors.length > 0 ? (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {vendors.map((item) => (
              <TouchableOpacity key={item.VendorID} onPress={() => {}}>
                <View style={styles.vendorItemContainer}>
                  <Text style={styles.vendorName}>{item.Name}</Text>
                  <Text style={styles.vendorInfo}>{item.Address}</Text>
                  <Text style={styles.vendorInfo}>{item.Phone}</Text>
                  <Text style={styles.vendorInfo}>{item.Email}</Text>
                  <Text style={styles.vendorInfo}>{item.Website}</Text>
                  <Text style={styles.vendorInfo}>{item.specialization}</Text>
                  <Text style={styles.vendorInfo}>{item.WorkingHours}</Text>
                  <Text style={styles.vendorInfo}>{item.Availability}</Text>
                  <Text style={styles.vendorInfo}>{item.DeliveryAvailable}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.errorView}>
            <Text style={styles.vendorInfo}>No vendors found.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  errorView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorListContainer: {
    flex: 1,
  },
  scrollViewContent: {
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
    padding: 5,
    backgroundColor: 'blue',
    borderRadius: 5,
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
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

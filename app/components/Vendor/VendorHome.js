import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import baseURL from '../../baseURL';
import Header from '../Header';

export default function VendorHome(props) {
  const [vendors, setVendors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const navigation = useNavigation();

  const fetchVendors = async () => {
    const response = await fetch(baseURL.URL + 'vendor/vendors', {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const flattenedSpecializations = data.flatMap((item) => item.Specializations).filter((specialization) => specialization.Name);
        setSpecializations(flattenedSpecializations);
        console.log(specializations)
        setVendors(data);
      })
      .catch((err) => console.log(err));
  };

  const { user, token } = props.route.params;

  useEffect(() => {
    fetchVendors();
  }, [user, token]);

  useFocusEffect(
    React.useCallback(() => {
      
      fetchVendors();
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
    }, [])
  );

  const navigateHandler = () => {
    navigation.navigate('CreateVendorForm', { user, token });
  };

  const handleEditVendor = (vendor) => {
    navigation.navigate('CreateVendorForm', { user, token, vendor, mode: "edit" });
  };

  const handleDeleteVendor = async (vendorId) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this vendor?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(baseURL.URL + 'vendor/delete', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ vendorId }),
              });

              if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                fetchVendors();
              } else {
                const errorData = await response.json();
                console.log(errorData.message);
              }
            } catch (error) {
              console.log('An error occurred while deleting the vendor:', error);
            }
          },
        },
      ]
    );
  };


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
              <TouchableOpacity key={item.VendorID} onPress={() => { }}>
                <View style={styles.vendorItemContainer}>
                  <Text style={styles.vendorName}>{item.Name}</Text>
                  <View style={styles.vendorInfoContainer}>
                    <FontAwesome5 name="address-card" style={styles.vendorInfoIcon} />
                    <Text style={styles.vendorInfoLabel}>{item.Location}</Text>
                  </View>
                  <View style={styles.vendorInfoContainer}>
                    <FontAwesome5 name="phone" style={styles.vendorInfoIcon} />
                    <Text style={styles.vendorInfoLabel}>{item.Phone}</Text>
                  </View>
                  <View style={styles.vendorInfoContainer}>
                    <FontAwesome5 name="envelope" style={styles.vendorInfoIcon} />
                    <Text style={styles.vendorInfoLabel}>{item.Email}</Text>
                  </View>
                  <View style={styles.vendorInfoContainer}>
                    <FontAwesome5 name="globe" style={styles.vendorInfoIcon} />
                    <Text style={styles.vendorInfoLabel}>{item.Website}</Text>
                  </View>
                  <View style={styles.specializationContainer}>
                    <Text style={styles.specializationLabel}>Specializations:</Text>
                    {specializations.length > 0 ? specializations
                      .filter((specialization) => specialization.vendorVendorID === item.VendorID)
                      .map((specialization, index) => (
                        <Text key={index} style={styles.specialization}>
                          {specialization.Name && specialization.Name.length > 0 ? specialization.Name : "Not Available"}
                        </Text>
                      )) : "Not Available"}

                  </View>
                  <View style={styles.vendorInfoContainer}>
                    <FontAwesome5 name="clock" style={styles.vendorInfoIcon} />
                    <Text style={styles.vendorInfoLabel}>{item.WorkingHours}</Text>
                  </View>
                  <View style={styles.vendorInfoContainer}>
                    <FontAwesome5 name="calendar-check" style={styles.vendorInfoIcon} />
                    <Text style={styles.vendorInfoLabel}>{item.Availability == true ? "Available" : "Not Available"}</Text>
                  </View>
                  <View style={styles.vendorInfoContainer}>
                    <FontAwesome5 name="truck" style={styles.vendorInfoIcon} />
                    <Text style={styles.vendorInfoLabel}>{item.DeliveryAvailable == true ? "Available" : "Not Available"}</Text>
                  </View>
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleEditVendor(item)}
                    >
                      <FontAwesome5 name="edit" style={styles.actionButtonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDeleteVendor(item.VendorID)}
                    >
                      <FontAwesome5 name="trash" style={styles.actionButtonIcon} />
                    </TouchableOpacity>
                  </View>
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
  vendorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  vendorInfoIcon: {
    marginRight: 10,
    fontSize: 18,
    color: 'gray',
  },
  vendorInfoLabel: {
    fontSize: 14,
    fontWeight: '400',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    marginLeft: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    color: 'gray',
  },
  specializationContainer: {
    marginTop: 10,
  },
  specializationLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  specialization: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 5,
  },
});

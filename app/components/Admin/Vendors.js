import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Header from '../Header';

export default function Vendors(props) {
    const {user} = props.route.params;
    const {token} = props.route.params;
    const vendors = [
        {
          vendorID: 1,
          name: 'Laundry Express',
          location: '123 Main St',
          phone: '123-456-7890',
          email: 'info@laundryexpress.com',
        },
        {
          vendorID: 2,
          name: 'Sparkling Clean',
          location: '456 Elm St',
          phone: '987-654-3210',
          email: 'contact@sparklingclean.com',
        },
        // Add more vendors as needed
      ];
      const handleEditVendor = (vendorID) => {
        console.log('Edit Vendor:', vendorID);
      };
    
      const handleDeleteVendor = (vendorID) => {
        console.log('Delete Vendor:', vendorID);
      };
    return (
      <View style={styles.container}>
                <Header user={user} token={token} />
                <View style={styles.container}>
                <View style={{
                padding: 16,
           }}>
            <Text style={{
                textAlign: 'center',
                fontSize: 31,
                fontWeight: 'bold',
                marginBottom: 16,
            }}>
                Orders
            </Text>
      {vendors.map((vendor) => (
        <View key={vendor.vendorID} style={styles.card}>
          <Text style={styles.vendorName}>{vendor.name}</Text>
          <Text style={styles.location}>Location: {vendor.location}</Text>
          <Text style={styles.phone}>Phone: {vendor.phone}</Text>
          <Text style={styles.email}>Email: {vendor.email}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditVendor(vendor.vendorID)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteVendor(vendor.vendorID)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
      </View>
    </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      },
      vendorName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      location: {
        fontSize: 16,
        marginBottom: 4,
      },
      phone: {
        fontSize: 16,
        marginBottom: 4,
      },
      email: {
        fontSize: 16,
        marginBottom: 4,
      },
      editButton: {
        backgroundColor: '#5134FF',
        borderRadius: 4,
        padding: 8,
        marginTop: 8,
      },
      deleteButton: {
        backgroundColor: '#F44336',
        borderRadius: 4,
        padding: 8,
        marginTop: 8,
      },
      buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
      },
  })

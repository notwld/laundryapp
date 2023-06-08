import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Header from '../Header';

export default function Staff(props) {
  const staffMembers = [
    {
      staffID: 1,
      jobTitle: 'Laundry Operator',
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
    },
    {
      staffID: 2,
      jobTitle: 'Laundry Assistant',
      name: 'Jane Smith',
      phone: '987-654-3210',
      email: 'jane.smith@example.com',
    },
    // Add more staff members as needed
  ];
  
    const {user} = props.route.params;
    const {token} = props.route.params;
    const handleEditStaff = (staffID) => {
      console.log('Edit Staff:', staffID);
    };
  
    const handleDeleteStaff = (staffID) => {
      console.log('Delete Staff:', staffID);
    };
    return (
        <View style={styles.container}>
                <Header user={user} token={token} />
                <View style={{
                padding: 16,
           }}>
            <Text style={{
                textAlign: 'center',
                fontSize: 31,
                fontWeight: 'bold',
                marginBottom: 16,
            }}>
                Laundry Staff
            </Text>
                
      {staffMembers.map((staff) => (
        <View key={staff.staffID} style={styles.card}>
          <Text style={styles.jobTitle}>{staff.jobTitle}</Text>
          <Text style={styles.staffName}>{staff.name}</Text>
          <Text style={styles.phone}>Phone: {staff.phone}</Text>
          <Text style={styles.email}>Email: {staff.email}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditStaff(staff.staffID)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteStaff(staff.staffID)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
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
    jobTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    staffName: {
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

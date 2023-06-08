import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Header from '../Header';

export default function Machines(props) {
  const handleEditMachine = (machineID) => {
    console.log('Edit Machine:', machineID);
  };

  const handleDeleteMachine = (machineID) => {
    console.log('Delete Machine:', machineID);
  };
  const machines = [
    {
      machineID: 1,
      machineName: 'Washer 1',
      availability: 'AVAILABLE',
    },
    {
      machineID: 2,
      machineName: 'Dryer 1',
      availability: 'UNAVAILABLE',
    },
    // Add more machines as needed
  ];
    const {user} = props.route.params;
    const {token} = props.route.params;
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
                Machines
            </Text>
      {machines.map((machine) => (
        <View key={machine.machineID} style={styles.card}>
          <Text style={styles.machineName}>{machine.machineName}</Text>
          <Text style={styles.availability}>Availability: {machine.availability}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditMachine(machine.machineID)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteMachine(machine.machineID)}
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
    machineName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    availability: {
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

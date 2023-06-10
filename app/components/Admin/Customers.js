import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../Header';

export default function Customers(props) {
  const { user } = props.route.params;
  const { token } = props.route.params;
  const customers = [
    {
      customerID: 1,
      customerName: 'John Doe',
      billingAddress: '123 Main St',
      paymentMethod: 'Credit Card',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    },
    {
      customerID: 2,
      customerName: 'Jane Smith',
      billingAddress: '456 Elm St',
      paymentMethod: 'PayPal',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
    },
  ];
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleEditCustomer = (customerID) => {
    console.log('Edit Customer:', customerID);
  };

  const handleDeleteCustomer = (customerID) => {
    console.log('Delete Customer:', customerID);
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
          Customers
        </Text>
        {customers.map((customer) => (
          <View key={customer.customerID} style={styles.card}>
            <Text style={styles.customerName}>{customer.customerName}</Text>
            <Text style={styles.billingAddress}>Billing Address: {customer.billingAddress}</Text>
            <Text style={styles.paymentMethod}>Payment Method: {customer.paymentMethod}</Text>
            <Text style={styles.email}>Email: {customer.email}</Text>
            <Text style={styles.phone}>Phone: {customer.phone}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditCustomer(customer.customerID)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteCustomer(customer.customerID)}
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
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  billingAddress: {
    fontSize: 16,
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 4,
  },
  phone: {
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
});


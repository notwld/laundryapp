import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VendorOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, status: 'Pending', customer: 'Huzzu', total: 100 },
    { id: 2, status: 'Shipped', customer: 'Bajwa', total: 250 },
    { id: 3, status: 'Delivered', customer: 'Haroon', total: 80 },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Order ID: {item.id}</Text>
      <Text style={styles.orderStatus}>Status: {item.status}</Text>
      <Text style={styles.orderCustomer}>Customer: {item.customer}</Text>
      <Text style={styles.orderTotal}>Total: ${item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vendor Orders</Text>
        <Ionicons name="menu" size={30} color="#000" />
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  orderList: {
    flex: 1,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 14,
    color: '#888',
  },
  orderCustomer: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default VendorOrders;

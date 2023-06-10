import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Header from '../Header';

export default function Sales(props) {
  const { user } = props.route.params;
  const { token } = props.route.params;
  return (
    <View style={styles.container}>
      <Header user={user} token={token} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sales Dashboard</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.salesCard}>

                <Text style={styles.salesValue}><Text style={{ color: "green" }}>$</Text>10,000</Text>
                <Text style={styles.salesLabel}>Total Sales</Text>
              </View>
              <View style={styles.salesCard}>
                <Text style={styles.salesValue}>100</Text>
                <Text style={styles.salesLabel}>Orders</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.salesCard}>
                <Text style={styles.salesValue}>50</Text>
                <Text style={styles.salesLabel}>Customers</Text>
              </View>
              <View style={styles.salesCard}>
                <Text style={styles.salesValue}><Text style={{ color: "green" }}>$</Text>5,000</Text>
                <Text style={styles.salesLabel}>Profit</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.salesCard}>

                <Text style={styles.salesValue}>15</Text>
                <Text style={styles.salesLabel}>Vendors</Text>
              </View>
              <View style={styles.salesCard}>
                <Text style={styles.salesValue}>100</Text>
                <Text style={styles.salesLabel}>Staff</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.salesCard}>
                <Text style={styles.salesValue}>200</Text>
                <Text style={styles.salesLabel}>Machines</Text>
              </View>
              <View style={styles.salesCard}>
                <Text style={styles.salesValue}>15,000+</Text>
                <Text style={styles.salesLabel}>Reviews</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  salesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    height: 140,
    justifyContent: 'center',
  },
  salesValue: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  salesLabel: {
    fontSize: 16,
    color: '#888888',
  },
});

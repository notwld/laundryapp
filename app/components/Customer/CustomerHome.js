import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const restaurantsData = [
  {
    id: '1',
    name: 'Restaurant A',
  },
  {
    id: '2',
    name: 'Restaurant B',
  },
  {
    id: '3',
    name: 'Restaurant C',
  },
];

const CustomerHome = () => {
  const renderRestaurantCard = ({ item }) => (
    <TouchableOpacity style={styles.restaurantCard}>
      <Text style={styles.restaurantName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity>
          <Image
            style={styles.cartIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Restaurant List */}
      <FlatList
        data={restaurantsData}
        renderItem={renderRestaurantCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.restaurantList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    width: 120,
    height: 40,
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  restaurantList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  restaurantCard: {
    marginBottom: 20,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  restaurantName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomerHome;

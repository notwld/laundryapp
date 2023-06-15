import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const VendorCard = ({ vendor, onPress }) => {
  // Calculate the number of filled and empty stars based on the average rating
  const filledStars = Math.floor(vendor.AverageRating);
  const emptyStars = 5 - filledStars;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['#00CED1', '#00BFFF']}
        style={styles.gradientBackground}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="person" size={20} color="#fff" />
          <Text style={styles.iconText}>{vendor.Name}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Ionicons name="location" size={20} color="#fff" />
          <Text style={styles.iconText}>{vendor.Location}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Ionicons name="list" size={20} color="#fff" />
          {/* <Text style={styles.iconText}>
            Specialized in {vendor.Specializations.join(', ')}
          </Text> */}
        </View>

        {/* <View style={styles.starContainer}>
          <Text style={styles.iconText}>Ratings:</Text>
          {[...Array(filledStars)].map((_, index) => (
            <Ionicons key={index} name="star" size={16} color="#FFD700" />
          ))}
          {[...Array(emptyStars)].map((_, index) => (
            <Ionicons key={index} name="star-outline" size={16} color="#FFD700" />
          ))}
        </View> */}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  gradientBackground: {
    padding: 16,
    borderRadius: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
  },
  starContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default VendorCard;

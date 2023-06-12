import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo package
import baseURL from '../baseURL';

export default function Header({
  user,
  token,
}) {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleLogout = async () => {
    await fetch(baseURL.URL + 'user/logout')
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Logged Out!') {
          navigation.navigate('Login');
        } else {
          navigation.navigate('Login');
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.header}>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Ionicons name="ios-close" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={() => {
            navigation.navigate("Profile", {
              user: user, token: token
            })
          }}>
            <Text>
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View>
          <Text style={styles.headerText}>Welcome Back!</Text>
          <Text style={styles.subHeaderText}>{user.Username}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
        <Ionicons name="ios-menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 13,
  },
  menuButton: {
    marginRight: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  subHeaderText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'black',
  },
  logoutText: {
    fontSize: 17,
    textDecorationLine: 'underline',
    fontWeight: '500',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
});

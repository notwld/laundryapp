import React, { Component,  useEffect,  useState } from 'react'
import { Text, View,BackHandler,StyleSheet, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import Header from '../Header';
import {useFocusEffect,useNavigation} from '@react-navigation/native';

export default function AdminHome (props) {
  const {user} = props.route.params;
  const {token} = props.route.params;
  const navigation = useNavigation();
  const navigateTo = (screen) => {
    navigation.navigate(screen, { user: user, token: token });
  }

  const data = [
    { icon: require("../../assets/box-solid.png"), name: 'Orders' },
    { icon: require("../../assets/users-solid.png"), name: 'Customers' },
    { icon: require("../../assets/cart-shopping-solid.png"), name: 'Sales' },
    { icon: require("../../assets/shirt-solid.png"), name: 'Staff' },
    { icon: require("../../assets/soap-solid.png"), name: 'Machines' },
    { icon: require("../../assets/user-regular.png"), name: 'Vendors' },
  ];
  useEffect(() => {
    const {user} = props.route.params;
  const {token} = props.route.params;
  }, []);
  useFocusEffect(
    React.useCallback(() => {
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
    }, [user])
  );
    return (
      <View>
       <Header user={user} token={token} />
       <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => 
       <TouchableOpacity onPress={() => navigateTo(item.name)} style={styles.card}>
         <View>
          <Image source={item.icon} style={styles.img} />
          <Text style={styles.cardText}>{item.name}</Text>
        </View>
       </TouchableOpacity>
        }
        numColumns={2}
      />
    </ScrollView>
      </View>
    )
  }



  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 10,
    },
    cardText: {
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center',
    },
    img: {
      width: 75,
      height: 75,
      marginBottom: 10,
      objectFit: 'contain',
    },
    card: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 13,
      padding: 20,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
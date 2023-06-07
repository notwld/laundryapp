import React, { Component, useFocusEffect, useState } from 'react'
import { Text, View,BackHandler,StyleSheet, FlatList, ScrollView, Image } from 'react-native'
import Header from '../Header';

export default function AdminHome (props) {
  const data = [
    { icon: require("../../assets/box-solid.png"), name: 'Orders' },
    { icon: require("../../assets/users-solid.png"), name: 'Customers' },
    { icon: require("../../assets/cart-shopping-solid.png"), name: 'Sales' },
    { icon: require("../../assets/shirt-solid.png"), name: 'Staff' },
    { icon: require("../../assets/soap-solid.png"), name: 'Machines' },
    { icon: require("../../assets/user-regular.png"), name: 'Vendors' },
  ];
  const { user } = props.route.params;
  const { token } = props.route.params;
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       if (!user) {
  //         return false;
  //       }
  //       return true;
  //     };

  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () => {
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //     };
  //   }, [user])
  // );
    return (
      <View>
       <Header user={user} token={token} />
       <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => 
        <View style={styles.card}>
          <Image source={item.icon} style={styles.img} />
          <Text style={styles.cardText}>{item.name}</Text>
        </View>
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
      fontSize: 20,
      fontWeight: 500,
      textAlign: 'center',
    },
    img: {
      width: 100,
      height: 100,
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
import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
export default function Profile(
  props
) {
  const navigation = useNavigation();
  const { token } = props.route.params;
  const [data, setData] = React.useState({});
  
  useEffect(() => {
    const { token } = props.route.params;
    console.log(token);

    const fetchUser = async ()=>{
      await fetch('http://192.168.1.107:19001/api/profile/user', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) =>  res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((err) => console.log(err));
      
    }
    fetchUser()
  }, []);
  return (
    <View style={styles.container}>
     <View style={{ backgroundColor:"white",borderRadius:13,alignItems:"center" }}>
     <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('UpdateProfile', {
          user: data, token: token
        })}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

      </View>
      <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
      <View style={{ paddingBottom: 20 }}>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{data.FirstName}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{data.LastName}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data.Email}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{data.Address}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{data.Phone}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{data.Username}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>{data.Role}</Text>
        </View>
      </View>
     </View>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#EAF0F7',
  },
  avatar: {
    height: 200,
    width: 200,
    marginVertical: 20,
    borderRadius: 100,
  },
  header: {
    padding:14,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
  },
  headerText: {
    fontSize: 20,
  },
  btnText: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: "white",
    backgroundColor: "blue",
    borderRadius: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    textAlign: "justify"
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 120,
    color: '#235789',
  },
  value: {
    fontSize: 16,
    color: '#235789',
  },
});



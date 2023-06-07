import { Text, View ,StyleSheet,Image,TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native';

export default function Header({
    user,
    token,
}) {
  const navigation = useNavigation();
const handleLogout = async() => {
      await fetch('http://192.168.1.107:19001/api/user/logout')
      .then((res) => res.json())
      .then((data) => {
        if(data.message === 'Logged Out!'){
          navigation.navigate('Login');
        }
        else{
          navigation.navigate('Login');
        }
      }
      )
      .catch((err) => console.log(err));
    };
    return (
        <View style={styles.header}>
       <View>
       <TouchableOpacity onPress={() => navigation.navigate('Profile',
        {token:token}
          )}>
       <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
        <Text style={{fontSize:11,
        color:"white"}}>View Profile</Text>
       </TouchableOpacity>
       </View>
        <View>
          <Text style={styles.headerText}>Welcome Back!</Text>
          <Text style={styles.subHeaderText}>{user.Username}</Text>
        </View>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#5134FF',
        borderBottomEndRadius:13,
        borderBottomStartRadius:13
      },
      avatar: {
        height: 50,
        width: 50,
        borderRadius: 100,
      },
      headerText: {
        fontSize: 24,
        fontWeight: '500',
        color:"white"
      },
      subHeaderText: {
        fontSize: 17,
        fontWeight: '400',
        color:"white"
      },
      logoutText: {
        fontSize: 12,
        textDecorationLine: 'underline',
        fontWeight: '500',
        color:"white"
      },
})
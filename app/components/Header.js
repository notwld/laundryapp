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
        <Text style={{fontSize:11}}>View Profile</Text>
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
        backgroundColor: '#fff',
      },
      avatar: {
        height: 50,
        width: 50,
        borderRadius: 100,
      },
      headerText: {
        fontSize: 20,
        fontWeight: '500',
      },
      subHeaderText: {
        fontSize: 14,
        fontWeight: '400',
      },
      logoutText: {
        fontSize: 12,
        textDecorationLine: 'underline',
        fontWeight: '500',
      },
})
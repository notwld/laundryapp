import { Text, View ,StyleSheet,Image,TouchableOpacity} from 'react-native'

export default function Header({
    user,
    handleLogout
}) {

    return (
        <View style={styles.header}>
        <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
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
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './components/Register';
import AdminHome from './components/Admin/AdminHome';
import CustomerHome from './components/Customer/CustomerHome';
import VendorHome from './components/Vendor/VendorHome';
import LaundryStaffHome from './components/LaundryStaff/LaundryStaffHome';
import CreateVendorForm from './components/Vendor/CreateVendorForm';
import Profile from './components/Profile';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <StatusBar style="auto" hidden={true}/>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }} initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="AdminHome" component={AdminHome}/>
        <Stack.Screen name="CustomerHome" component={CustomerHome}/>
        <Stack.Screen name="VendorHome" component={VendorHome}/>
        <Stack.Screen name="LaundryStaffHome" component={LaundryStaffHome}/>
        <Stack.Screen name="CreateVendorForm" component={CreateVendorForm}/>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

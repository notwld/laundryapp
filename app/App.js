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
import UpdateProfileScreen from './components/UpdateProfile';
import Orders from './components/Admin/Orders';
import Machines from './components/Admin/Machines';
import Vendors from './components/Admin/Vendors';
import Sales from './components/Admin/Sales';
import Staff from './components/Admin/Staff';
import Customers from './components/Admin/Customers';
import CustomerRegistration from './components/Customer/CustomerRegistration';
import VendorDetail from './components/Customer/VendorDetail';


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
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen}/>
        <Stack.Screen name="Customers" component={Customers}/>
        <Stack.Screen name="CustomerRegistration" component={CustomerRegistration}/>
        <Stack.Screen name="VendorDetail" component={VendorDetail}/>
        <Stack.Screen name="Staff" component={Staff}/>
        <Stack.Screen name="Sales" component={Sales}/>
        <Stack.Screen name="Vendors" component={Vendors}/>
        <Stack.Screen name="Machines" component={Machines}/>
        <Stack.Screen name="Orders" component={Orders} />
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

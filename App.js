import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/LoginSignupScreen/LoginScreen';
import SignupScreen from './src/LoginSignupScreen/SignupScreen';
import SignupNextScreen from './src/LoginSignupScreen/SignupNextScreen';
import AppNav from './src/Navigation/AppNav';
import { AuthProvider } from './src/Context/AuthContext';
import UserProfile from './src/MainScreens/UserProfile';
// import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  return (
  
    <View style={styles.container}>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </View>

    
    
  //  <ClearAsyncStorage/>


  );
}



// const ClearAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage cleared successfully.');
//   } catch (error) {
//     console.error('Error clearing AsyncStorage:', error);
//   }
// };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

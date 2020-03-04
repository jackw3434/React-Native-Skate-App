/**
 * @format
 */
//import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import Login from './pages/loginPage'
import { name as appName } from './app.json';

// import {NavigationContainer} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// <NavigationContainer>
//     <Stack.Navigator>
//         <Stack.Screen
//             name="Home"
//             component={Login}
//             options={{ title: 'Welcome' }}
//         />
//         {/* <Stack.Screen name="Profile" component={Profile} /> */}
//     </Stack.Navigator>
// </NavigationContainer>

AppRegistry.registerComponent(appName, () => App);

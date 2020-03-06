import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import RegisterScreen from './screens/registerScreen';
import LoginScreen from './screens/loginScreen';
import UserProfileScreen from './screens/loggedIn/userProfileScreen';
import SkateMapScreen from './screens/loggedIn/skateMapScreen';
import TrickBookScreen from './screens/loggedIn/trickBook/trickBookScreen';
import SingleTrickScreen from './screens/loggedIn/trickBook/singleTrickScreen';
import AppContainer from './screens/containers/AppContainer';
import HeaderConainer from './screens/containers/HeaderContainer'

import TabNavigation from './screens/loggedIn/tabNavigation'
import TrickBookStackNavigation from './screens/loggedIn/trickBook/trickBookStackNavigations'

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="LoggedIn" component={TabNavigation} />
          <Stack.Screen name="TrickStack" component={TrickBookStackNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({

});

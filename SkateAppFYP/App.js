import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import RegisterScreen from './screens/registerScreen';
import LoginScreen from './screens/loginScreen';
import UserProfileScreen from './screens/userProfileScreen';
import SkateMapScreen from './screens/skateMapScreen';
import TrickBookScreen from './screens/trickBookScreen';
import SingleTrickScreen from './screens/singleTrickScreen';
import SocialFeedScreen from './screens/socialFeedScreen';

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
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="SkateMap" component={SkateMapScreen} />
          <Stack.Screen name="TrickBook" component={TrickBookScreen} />
          <Stack.Screen name="SingleTrick" component={SingleTrickScreen} />
          <Stack.Screen name="SocialFeed" component={SocialFeedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({

});
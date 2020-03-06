import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import TrickBookScreen from './trickBookScreen';
import SingleTrickScreen from './singleTrickScreen';

const Stack = createStackNavigator();

export default class TrickBookStackNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TrickBook" component={TrickBookScreen} />
          <Stack.Screen name="SingleTrick" component={SingleTrickScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
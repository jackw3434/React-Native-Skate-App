import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './screens/registerScreen';
import ForgottenPasswordScreen from './screens/forgotPassword';
import LoginScreen from './screens/loginScreen';
import UserProfileScreen from './screens/loggedIn/userProfileScreen';
import SkateMapScreen from './screens/loggedIn/skateMapScreen';
import SocialFeedScreen from './screens/loggedIn/socialFeedScreen';
import TrickBookScreen from './screens/loggedIn/trickBook/trickBookScreen';
import SingleTrickScreen from './screens/loggedIn/trickBook/singleTrickScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from './Icon/Icon'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

        <Stack.Screen name="LoginTabNavigationStack" component={AuthorizedTabNavigation} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ForgottenPasswordScreen" component={ForgottenPasswordScreen} />
          <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function AuthorizedTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName='Skate Map'
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          let viewBoxvalue;

          if (route.name === 'Skate Map') {
            iconName = "MapIcon";
            viewBoxvalue = "0 0 20 20";
          }
          if (route.name === 'Trick Book') {
            iconName = "Book";
            viewBoxvalue = "0 0 20 20";
          }
          if (route.name === 'Social Feed') {
            iconName = "Newspaper";
            viewBoxvalue = "0 0 500 500";
          }

          return <Icon style={{ marginTop: 4 }} name={iconName} viewBox={viewBoxvalue} height="20" width="20" />;
        },
      })}
      tabBarOptions={{
        labelStyle: {
          fontSize: 16,
          textAlignVertical: 'center', // android only
          flex: Platform.OS === 'android' & 1,
          paddingBottom: 5
        }
      }}>
      <Tab.Screen name="Trick Book" component={TrickBookStack} />
      <Tab.Screen name="Skate Map" component={SkateMapScreen} />
      <Tab.Screen name="Social Feed" component={SocialFeedScreen} />
    </Tab.Navigator>
  );
}

function TrickBookStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrickBook" component={TrickBookScreen} />
      <Stack.Screen name="SingleTrick" component={SingleTrickScreen} />
    </Stack.Navigator>
  );
}
import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SkateMapScreen from './skateMapScreen';
import TrickBookScreen from './trickBook/trickBookScreen';
import SocialFeedScreen from './socialFeedScreen';
import LoginScreen from '../loginScreen';
import TrickStack from './trickBook/trickBookStackNavigations'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default class TabNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <NavigationContainer independent={true} >
                <Tab.Navigator initialRouteName='Skate Map' tabBarOptions={{
                    labelStyle: {
                        fontSize: 16,
                        textAlignVertical: 'center', // android only
                        flex: Platform.OS === 'android' & 1
                    }
                }}>
                    <Tab.Screen name="Trick Book" component={TrickStack} />
                    <Tab.Screen name="Skate Map" component={SkateMapScreen} />
                    <Tab.Screen name="Social Feed" component={SocialFeedScreen} />
                    {/* <Tab.Screen name="Login Screen" component={LoginScreen} /> */}
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    labelStyle: {
        flex: 1,
        fontSize: 16,
        textAlignVertical: 'center'
    }
});
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Dimensions.get('window').height;

export default class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    //console.log;("here ", this.props.view)
  }


  navTo(route) {
    this.props.navigation.navigate(route)
  }

  render() {
    console.log; ("Header Container")
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login Screen')}>
          <Text style={{ color: 'blue' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  }
});
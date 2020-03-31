import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions, Image } from 'react-native';
import SkateButton from '../components/skateButton';
import SkateTextInput from '../components/skateTextInput';
import AppContainer from './containers/AppContainer';
import { loginUser } from '../functions/userAccessFunctions';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValid: Boolean,
      passwordValid: Boolean,
      spinner: false,
      loginErrorMessage: ''
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      let userObject = await AsyncStorage.getItem("userObject");

      if (userObject) {
        this.navTo('LoginTabNavigationStack')
      }
    } catch (e) {
      // error reading value
      console.warn("e ", e)
    }
  }


  storeData = async (data) => {

    let reviews = [];

    for (let i = 0; i < data.reviews.length; i++) {

      reviews.push({
        reviewerID: data.reviews[i].reviewerID,
        reviewerName: data.reviews[i].reviewerName,
        reviewMessage: data.reviews[i].reviewMessage
      })
    }

    let userObject = {
      _id: data._id,
      userName: data.name,
      userEmail: data.email,
      reviews: reviews
    }

    try {

      await AsyncStorage.setItem("userObject", JSON.stringify(userObject))
    } catch (e) {
      // saving error
      console.warn("saving error: ", e)
    }
  }

  navTo(route) {
    this.props.navigation.navigate(route)
  }

  setEmail(email) {
    this.setState({ email: email, emailValid: true, loginErrorMessage: '' })
  };

  setPassword(password) {
    this.setState({ password: password, passwordValid: true, loginErrorMessage: '' })
  };

  loginButton() {

    let { email, password } = this.state;
    this.setState({ passwordValid: true, emailValid: true, spinner: !this.state.spinner, loginErrorMessage: '' })

    if (!email || !password) {
      this.setState({ passwordValid: false, emailValid: false, spinner: this.state.spinner, loginErrorMessage: 'Missing Form Fields.' })
    } else {

      let user = {
        "email": email,
        "password": password
      };

      loginUser(user)
        .then(response => {
          if (response == "Error: Network Error") {
            this.setState({ spinner: !this.state.spinner, loginErrorMessage: 'Network Error: Try again later' });
            return;
          }
          if (response && response.data.successMessage === "User Logged In" && response.data.accessToken) {

            let userData = response.data.userData
            delete userData.password;

            this.storeData(userData);
            this.setState({ spinner: !this.state.spinner });
            this.navTo('LoginTabNavigationStack')

          } else {
            this.setState({ passwordValid: false, emailValid: false, spinner: !this.state.spinner, loginErrorMessage: 'Incorrect Login' })
          }
        });
      this.setState({ email: "", password: "" });
    }
  }

  render() {
    return (
      <AppContainer noHeader={true} scrollView={true}>
        <View style={styles.container}>
          <Text style={styles.title}>Skate Buddy</Text>
          <Text style={styles.tagline}>A community skate application</Text>
          <Text style={styles.appDescripter}>Learn to skate, meet others who skate, teach others to skate.</Text>

          <View style={styles.spacer} />

          <SkateTextInput
            valid={this.state.emailValid}
            placeholder="Email"
            onChangeText={(email) => this.setEmail(email)}
            text={this.state.email}
            iconName="UserRegIcon"
            viewBox="0 -5 23.405 23.405"
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <SkateTextInput
            valid={this.state.passwordValid}
            placeholder="Password"
            onChangeText={password => this.setPassword(password)}
            text={this.state.password}
            iconName="Padlock"
            iconStyle={{ marginTop: 7 }}
            viewBox="0 0 20 30"
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={() => this.navTo('ForgottenPasswordScreen')} style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>forgot password?</Text>
          </TouchableOpacity>


          {this.state.loginErrorMessage !== "" &&
            <Text style={styles.errorMessege}>{this.state.loginErrorMessage}</Text>
          }
          <View style={styles.spacer} />

          <SkateButton
            buttonText="Sign in"
            onPress={() => this.loginButton()}
          />

          <View style={styles.dontHaveAccountContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => this.navTo('RegisterScreen')}>
              <Text style={styles.signUpHereText}> Sign up here.</Text>
            </TouchableOpacity>
          </View>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            indicatorStyle={styles.indicatorStyle}
          />
        </View>
      </AppContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    textAlign: "center"
  },
  tagline: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: '10%'
  },
  appDescripter: {
    fontSize: 16,
    paddingTop: '10%',
    textAlign: "center"
  },
  spacer: {
    paddingTop: '13%'
  },
  forgotPasswordContainer: {
    paddingTop: 5,
    marginRight: 10,
    alignSelf: 'flex-end',
    textAlign: 'right'
  },
  forgotPassword: {
    color: 'rgba(0,0,255,1)'
  },
  connectText: {
    paddingVertical: 10,
    textAlign: "center"
  },
  signUpHereText: {
    color: 'rgba(0,0,255,1)'
  },
  dontHaveAccountContainer: {
    flexDirection: "row",
    margin: 36,
    justifyContent: 'center'
  },
  spinnerTextStyle: {
    marginTop: 100,
    color: '#FFF',
  },

  errorMessege: {
    paddingTop: 10,
    color: 'red',
    textAlign: "center"
  },
});
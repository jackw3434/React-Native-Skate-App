import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import SkateButton from '../components/skateButton';
import SkateTextInput from '../components/skateTextInput';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true,
    };
  }

  navTo(route) {
    this.props.navigation.navigate(route)
  }

  setEmail(email) {
    this.setState({ email: email })
  };

  setPassword(password) {
    this.setState({ password: password })
  };

  login() {

    let { email, password } = this.state;

    if (!email || !password) {
      this.setState({ inputEror: true })
      console.log("Missing Form Fields");
    } else {

      let user = {
        "email": email,
        "password": password
      };

      // loginUser(user)
      //   .then(response => {
      //     if (response && response.data.successMessage === "User Logged In" && response.data.accessToken) {

      //       localStorage.setItem("user_id", response.data.userData._id);
      //       localStorage.setItem("first_name", response.data.userData.first_name);
      //       localStorage.setItem("surname", response.data.userData.surname);
      //       localStorage.setItem("email", response.data.userData.email);
      //       localStorage.setItem("token", response.data.accessToken);

      //       this.setState({ redirect: true });
      //       console.log("Logging in, redirecting ");
      //     } else {
      //       console.log("failed login response : ", response);
      //       return;
      //     }
      //   });

      // this.refs.email.value = "";
      // this.refs.password.value = "";
      this.setState({ email: "", password: "" });
    }
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        {/* <StatusBar barStyle="white" backgroundColor="blue" /> */}
        <SafeAreaView style={styles.container}>
        
          <ScrollView style={styles.container}>

            <View style={styles.spacer} />

            <Text style={styles.title}>Skate App</Text>
            <Text style={styles.tagline}>A community skate application</Text>
            <Text style={styles.appDescripter}>Learn to skate, meet others who skate, teach others to skate.</Text>

            <View style={styles.spacer} />

            <SkateTextInput
              valid={this.state.emailValid}
              placeholder="Email"
              onChangeText={(email) => this.setEmail(email)}
              text={this.state.email}
              iconName="UserRegIcon"
              align="center"
              viewBox="0 -5 23.405 23.405"
            />
            <SkateTextInput
              valid={this.state.passwordValid}
              placeholder="Password"
              onChangeText={password => this.setPassword(password)}
              text={this.state.password}
              iconName="Padlock"
              align="center"
              iconStyle={{ marginTop: 7 }}
              viewBox="0 0 20 30"
            />

            <TouchableOpacity onPress={() => this.navTo('ForgottenPasswordScreen')} style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.spacer} />

            <SkateButton
              buttonText="Sign in"
              onPress={() => this.navTo('LoginTabNavigationStack')}
            />

            {/* <Text style={styles.connectText}>or connect using</Text> */}
            {/* <SkateButton
                    buttonText="Google+"
                    onPress={}
                    iconName="Padlock"
                    iconStyle={{ marginTop: 7 }}
                    viewBox="0 0 20 30"
                  /> */}

            <View style={styles.dontHaveAccountContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => this.navTo('RegisterScreen')}>
                <Text style={styles.signUpHereText}> Sign up here.</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(240,248,255)'
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    paddingTop: '10%'
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
    paddingTop: '15%'
  },
  forgotPasswordContainer: {
    paddingTop: 5,
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
  }
});
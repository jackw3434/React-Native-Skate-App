import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1
  },
  title: {
    fontSize: 24,
    textAlign: "center"
  },
  titleContainer: {
    top: 50
  },
  taglineContainer: {
    top: 90
  },
  tagline: {
    textAlign: "center"
  },
  appDescripterContainer: {
    top: 120,
  },
  appDescripter: {
    textAlign: "center"
  },
  textInput: {
    height: 40,
    paddingLeft: 10
  },
  emailContainer: {
    top: 170,
    borderColor: 'gray',
    borderWidth: 1
  },
  passwordContainer: {
    top: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  inputError: {
    borderWidth: 2,
    borderColor: 'red',
  },
  forgotPassword: {
    position: "absolute",
    right: 0,
    top: 210,
    color: "blue",
  },
  loginContainer: {
    top: 260
  },
  loginButton: {

  },
  connectTextContainer: {
    top: 300,
  },
  connectText: {
    textAlign: "center",
  },
  googleContainer: {
    top: 330,
  },
  googleButton: {

  },
  signUpHereText: {
    position: "absolute",
    right: 0,
    color: "blue"
  },
  dontHaveAccountContainer: {
    marginTop: 40,
    flexDirection: 'row',
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      inputError: false
    };
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
      <View style={styles.container}>
        <StatusBar barStyle="white" backgroundColor="black" />
        <SafeAreaView>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Skate App</Text>
            </View>
            <View style={styles.taglineContainer}>
              <Text style={styles.tagline}>A community skate application</Text>
            </View>
            <View style={styles.appDescripterContainer}>
              <Text style={styles.appDescripter}>Learn to skate, meet others who skate, teach others to skate.</Text>
            </View>
            <View style={!this.state.inputError ? styles.emailContainer : [styles.emailContainer, styles.inputError]}>
              <TextInput
                style={styles.textInput}
                onChangeText={email => this.setEmail(email)}
                placeholder="Email"
                autoCompleteType="email"
              />
            </View>
            <View style={!this.state.inputError ? styles.passwordContainer : [styles.passwordContainer, styles.inputError]}>
              <TextInput
                style={styles.textInput}
                onChangeText={password => this.setPassword(password)}
                placeholder="Password"
                autoCompleteType="password"
              />
            </View>
            <View>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={{ color: 'blue' }}>forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginContainer}>
              <Button style={styles.loginButton} title="Sign in"></Button>
            </View>
            <View style={styles.connectTextContainer}>
              <Text style={styles.connectText}>or connect using</Text>
            </View>
            <View style={styles.googleContainer}>
              <Button style={styles.googleButton} title="Google+"></Button>
              <View style={styles.dontHaveAccountContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity style={styles.signUpHereText}>
                  <Text style={{ color: "blue" }}>Sign up here.</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
      </View>
    );
  }
}
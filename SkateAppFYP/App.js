import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

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
      <View style={{ flex: 1 }}>
        {/* <StatusBar barStyle="white" backgroundColor="black" /> */}
        <SafeAreaView>
          <ScrollView style={styles.container}>

            <Text style={styles.title}>Skate App</Text>
            <Text style={styles.tagline}>A community skate application</Text>
            <Text style={styles.appDescripter}>Learn to skate, meet others who skate, teach others to skate.</Text>

            <View style={styles.textInputContainer}>
              <TextInput
                style={!this.state.inputError ? styles.textInput : [styles.textInput, styles.inputError]}
                onChangeText={email => this.setEmail(email)}
                placeholder="Email"
                autoCompleteType="email"
              />
              <TextInput
                style={!this.state.inputError ? styles.textInput : [styles.textInput, styles.inputError]}
                onChangeText={password => this.setPassword(password)}
                placeholder="Password"
                autoCompleteType="password"
              />
            </View>

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>forgot password?</Text>
            </TouchableOpacity>

            <View style={{ paddingTop: '10%', }}>
              <Button title="Sign in"></Button>
              <Text style={styles.connectText}>or connect using</Text>
              <Button title="Google+"></Button>
            </View>

          </ScrollView>

          <View style={styles.dontHaveAccountContainer}>
            <View style={{ flex: 1, textAlign: "center", alignItems: "center" }}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity>
                <Text style={styles.signUpHereText}> Sign up here.</Text>
              </TouchableOpacity>
            </View>
          </View>

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
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    paddingTop: '10%'
  },
  tagline: {
    textAlign: "center",
    paddingTop: '10%'
  },
  appDescripter: {
    paddingTop: '10%',
    textAlign: "center"
  },
  textInputContainer: {
    paddingTop: '10%',
  },
  textInput: {
    height: 40,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },
  inputError: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: 'red',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  forgotPassword: {
    color: 'blue'
  },
  connectText: {
    paddingVertical: 10,
    textAlign: "center"
  },
  signUpHereText: {
    color: "blue"
  },
  dontHaveAccountContainer: {
    flexDirection: "row",
    position: 'absolute',
    bottom: 0,
    margin: 36
  }
});
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import AppContainer from './containers/AppContainer';
import SkateButton from '../components/skateButton';
import SkateTextInput from '../components/skateTextInput';
import { registerUser } from '../functions/userAccessFunctions';
const screenHeight = Math.round(Dimensions.get('window').height);

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameValid: true,
            email: '',
            emailValid: true,
            password: '',
            passwordValid: true,
            confirmPassword: '',
            confirmPasswordValid: true,
        };
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    setName(name) {
        this.setState({ name: name })
    };

    setEmail(email) {
        this.setState({ email: email })
    };

    setPassword(password) {
        this.setState({ password: password })
    };

    setConfirmPassword(confirmPassword) {
        this.setState({ confirmPassword: confirmPassword })
    };

    registerUserButton() {
        console.warn("1");
        let { name, email, password, confirmPassword } = this.state;

        if (!name || !email || !password || !confirmPassword) {
            console.warn("Missing Form Fields");
        }
        if (password !== confirmPassword) {
            console.warn("Passwords do not match");
            this.setState({ password: "", confirmPassword: "", passwordValid: false, confirmPasswordValid: false });
        } else {
            console.warn("2");
            let newUser = {
                "name": name,
                "email": email,
                "password": password
            };

            registerUser(newUser)

                .then(response => {
                    console.warn('3 ', response);
                    if (response === "User: " + email + " has been created.") {

                        this.navTo('LoginScreen');
                        this.setState({ name: "", email: "", password: "", confirmPassword: "" });
                    }

                    if (response === "Error: Request failed with status code 409") {
                        console.log("User with that email already exists");
                        return;
                    }

                    if (response === "UnauthorizedError: jwt expired, clearing cache and retrying") {
                        console.log("UnauthorizedError: jwt expired, clearing cache and retrying");
                        return;
                    }

                    if (response === "Error: Network Error") {
                        console.log("Error: Network Error, server not running");
                        return;
                    }

                    if (response === undefined) {
                        console.log("Generic_error: Network/JWT Issue");
                        return;
                    }                    
                })
        }
    }

    render() {
        return (
            <AppContainer passNav={this.props} isNested={true} scrollView={true} noBorder={true}>
                <View style={styles.pageContainer}>

                    <View style={styles.topSection}>
                        <Text style={styles.title}>Create an account</Text>
                        <Text style={styles.tagline}>Let's get started!</Text>
                    </View>

                    <View style={styles.middleSection}>
                        <SkateTextInput
                            valid={this.state.nameValid}
                            placeholder="Name"
                            onChangeText={(name) => this.setName(name)}
                            text={this.state.name}
                            iconName="UserRegIcon"
                            viewBox="0 -5 23.405 23.405"
                        />
                        <SkateTextInput
                            valid={this.state.emailValid}
                            placeholder="Email"
                            onChangeText={email => this.setEmail(email)}
                            text={this.state.email}
                            iconName="Mail"
                            iconStyle={{ marginTop: 7 }}
                            viewBox="2 -6 20 30"
                            keyboardType='email-address'
                        />
                        <SkateTextInput
                            valid={this.state.passwordValid}
                            placeholder="Password"
                            onChangeText={(password) => this.setPassword(password)}
                            text={this.state.password}
                            iconStyle={{ marginTop: 7 }}
                            iconName="Padlock"
                            viewBox="0 0 20 30"
                            secureTextEntry={true}
                        />
                        <SkateTextInput
                            valid={this.state.confirmPasswordValid}
                            placeholder="Confirm Password"
                            onChangeText={confirmPassword => this.setConfirmPassword(confirmPassword)}
                            text={this.state.confirmPassword}
                            iconName="Padlock"
                            iconStyle={{ marginTop: 7 }}
                            viewBox="0 0 20 30"
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.bottomSection}>
                        <SkateButton
                            buttonText="Create Account"
                            onPress={() => this.registerUserButton()}
                        />
                        <View style={styles.dontHaveAccountContainer}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={() => this.navTo('LoginScreen')}>
                                <Text style={styles.signUpHereText}> Login here.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        height: screenHeight - 100
    },
    topSection: {
        height: '18%'
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    middleSection: {
        height: '40%',
        justifyContent: 'space-evenly'
    },
    bottomSection: {
        height: '30%',
        justifyContent: 'center'
    },
    tagline: {
        fontSize: 20,
        textAlign: "center",
        paddingTop: '10%'
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
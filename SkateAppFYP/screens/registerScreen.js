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
            regErrorMessage: '',
            successReg: false
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
        if (confirmPassword == this.state.password) {
            this.setState({ passwordValid: true, confirmPasswordValid: true, regErrorMessage: "" })
        }
    };

    registerUserButton() {

        let { name, email, password, confirmPassword, regErrorMessage } = this.state;
        this.setState({ nameValid: true, emailValid: true, passwordValid: true, confirmPasswordValid: true, regErrorMessage: "" });

        if (!name || !email || !password || !confirmPassword) {
            this.setState({ regErrorMessage: "Error: Missing Form Fields" });
            if (!name) {
                this.setState({ nameValid: false });
            }
            if (!email) {
                this.setState({ emailValid: false });
            }
            if (!password) {
                this.setState({ passwordValid: false });
            }
            if (!confirmPassword) {
                this.setState({ confirmPasswordValid: false });
            }
        }
        if (password !== confirmPassword) {
            this.setState({ passwordValid: false, confirmPasswordValid: false, regErrorMessage: "Error: Passwords do not match*" });
        } else {

            let newUser = {
                "name": name,
                "email": email,
                "password": password
            };

            registerUser(newUser)

                .then(response => {
                    if (response === "User: " + email + " has been created.") {

                        this.setState({ name: "", email: "", password: "", confirmPassword: "", regErrorMessage: "", successReg: true });

                        setTimeout(() => { this.navTo('LoginScreen'); }, 3000)

                    }

                    if (response === "Error: Request failed with status code 409") {
                        console.warn("User with that email already exists");
                        this.setState({ regErrorMessage: "User with that email already exists", emailValid: false });
                        return;
                    }

                    if (response === "UnauthorizedError: jwt expired, clearing cache and retrying") {
                        console.warn("UnauthorizedError: jwt expired, clearing cache and retrying");
                        return;
                    }

                    if (response === "Error: Network Error") {
                        console.warn("Error: Network Error, server not running");
                        this.setState({ regErrorMessage: "Error: Network Error, please try again later." });
                        return;
                    }

                    if (response === undefined) {
                        console.warn("Generic_error: Network/JWT Issue");
                        this.setState({ regErrorMessage: "Oops, something went wrong, please try again later." });
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
                            onFocus={() => this.setState({ nameValid: true })}
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
                            onFocus={() => this.setState({ emailValid: true })}
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

                    {this.state.regErrorMessage !== "" &&
                        <Text style={styles.errorMessege}>{this.state.regErrorMessage}</Text>
                    }
                    {this.state.successReg &&
                        <Text style={styles.success}>Account has been created successfully!</Text>
                    }

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
        height: screenHeight - 100,
        padding:30
    },
    topSection: {
        height: '20%'
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
    },
    errorMessege: {
        color: 'red',
        textAlign: "center"
    },
    success: {
        color: 'green',
        textAlign: "center",
        fontWeight:'bold'
    }
});
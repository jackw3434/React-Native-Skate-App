import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import AppContainer from './containers/AppContainer';
import SkateButton from '../components/skateButton';
import SkateTextInput from '../components/skateTextInput';

const screenHeight = Math.round(Dimensions.get('window').height);

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailValid: true
        };
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    setEmail(email) {
        this.setState({ email: email })
    };

    render() {
        return (
            <AppContainer passNav={this.props} isNested={true} noBorder={true}>
                <View style={styles.pageContainer}>

                    <View style={styles.topSection}>
                        <Text style={styles.title}>Forgotten Password?</Text>
                    </View>

                    <View style={styles.middleSection}>
                    <Text style={styles.tagline}>Enter the email you used to create your account and we will send you a code to reset your password with.</Text>
                   
                        <SkateTextInput
                            valid={this.state.emailValid}
                            placeholder="Email"
                            onChangeText={email => this.setEmail(email)}
                            text={this.state.email}
                            iconName="Mail"
                            iconStyle={{ marginTop: 7 }}
                            viewBox="2 -6 20 30"
                        />


                    </View>

                    <View style={styles.bottomSection}>
                        
                        <SkateButton
                            buttonText="Send Code"
                            onPress={() => this.navTo('LoginScreen')}
                        />

                        <View style={styles.dontHaveAccountContainer}>
                            <Text>Didn't receive a code?</Text>
                            <TouchableOpacity onPress={() => this.navTo('LoginScreen')}>
                                <Text style={styles.signUpHereText}> Press here to resend.</Text>
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
        height: '10%',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    middleSection: {
        height: '35%',
        justifyContent: 'space-evenly'
    },
    bottomSection: {
        height: '35%',
        justifyContent: 'center'
    },
    goBack: {
        color: 'blue',
        paddingTop: '5%',
        paddingHorizontal: 15,
    },
    tagline: {
        fontSize: 16,
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
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goBack() {
        this.props.navigation.goBack()
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView>
                    <ScrollView contentContainerStyle={styles.container}>
                        <TouchableOpacity onPress={() => this.goBack()}>
                            <Text style={styles.goBack}>Go Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Forgot Password Screen</Text>
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
        height: '100%'
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        paddingTop: '10%'
    },
    goBack: {
        color: 'blue',
        paddingTop: '5%',
        paddingHorizontal: 15,
    }
});
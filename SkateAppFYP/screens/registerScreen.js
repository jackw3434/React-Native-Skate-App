import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';

export default class RegisterScreen extends React.Component {
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
                    <ScrollView >
                        <TouchableOpacity onPress={() => this.goBack()}>
                            <Text style={styles.goBack}>Go Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Register Screen</Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: "center",
        paddingTop: '10%'
    },
    goBack: {
        color:'blue',
        paddingTop:'5%',
        paddingHorizontal: 15,
    }
});
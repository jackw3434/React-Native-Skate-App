import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import AppContainer from '../../containers/AppContainer';

export default class TrickBookScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    render() {
        return (
            <AppContainer passNav={this.props} isNested={false} pageTitle="Trick Book">                
                <TouchableOpacity onPress={() => this.navTo('SingleTrick')}>
                    <Text style={styles.goBack}>Single Trick Screen (i.e Ollie)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.navTo('SingleTrick')}>
                    <Text style={styles.goBack}>Single Trick Screen (i.e Pop Shuvit)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.navTo('SingleTrick')}>
                    <Text style={styles.goBack}>Single Trick Screen (i.e Heelflip)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.navTo('SingleTrick')}>
                    <Text style={styles.goBack}>Single Trick Screen (i.e Kickflip)</Text>
                </TouchableOpacity>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: "center",
        //paddingTop: '10%'
    },
    goBack: {
        color: 'blue',
        textAlign: "center",
        paddingTop: '5%',
        // paddingHorizontal: 15,
    }
});
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import AppContainer from '../containers/AppContainer';

export default class SocialFeedScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // goBack() {
    //     this.props.navigation.goBack()
    // }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    render() {
        return (
            <AppContainer passNav={this.props} isNested={false}>
                <Text style={styles.title}>Social Feed</Text>
            </AppContainer>
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
        //paddingTop: '10%'
    },
    goBack: {
        color: 'blue',
        paddingTop: '5%',
        paddingHorizontal: 15,
    }
});
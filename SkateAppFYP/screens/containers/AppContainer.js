import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import HeaderContainer from './HeaderContainer'

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
         console.log("app container", this.props.passNav)
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    {/* <HeaderContainer/> */}
                    <TouchableOpacity onPress={() => this.props.passNav.navigate('Login Screen')}>
                        <Text style={{ color: 'blue' }}>Logout</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        {this.props.children}
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 15,
        width: '100%',
        height: '100%'
    },
});
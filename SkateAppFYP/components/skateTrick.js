import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import Icon from '../Icon/Icon';

export default class SkateTrick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                
        };
    }

    render() {       
        return (
            <View>
              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textBox: {
        padding: 0,
        paddingLeft: 10,
        flex: 1,           
        fontSize: 15,
    },
    Container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 40,
        borderColor: 'rgba(128, 128, 128,0.25)',
        height:40,
        maxHeight: 40,
        margin: 5,
        paddingLeft: 10,
        borderWidth: 2,
    }
});
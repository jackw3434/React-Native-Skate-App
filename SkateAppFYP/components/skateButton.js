import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import Icon from '../Icon/Icon';

export default class SkateButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: this.props.bgColor ? this.props.bgColor : 'rgba(0,0,255,0.9)', width: this.props.width }]} onPress={this.props.onPress}>
                {!this.props.icon && <Icon style={this.props.iconStyle} name={this.props.iconName ? this.props.iconName : ''} fill="white" viewBox={this.props.viewBox} height="28" width="28" />}
                <Text style={styles.text}>{this.props.buttonText}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 30,
        margin: 5,
        backgroundColor: 'rgba(0,0,255,0.9)',
        height: 45,
        maxHeight: 45,
        minHeight: 45,
        minWidth: '80%'
    },
    text: {
        color: '#fff',
        fontSize: 16,
    }
});
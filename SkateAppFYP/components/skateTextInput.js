import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import Icon from '../Icon/Icon';

export default class SkateTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: Boolean           
        };
    }

    render() {       
        return (
            <View style={[styles.Container, !this.props.valid && styles.invalid]}>
                {!this.props.icon && <Icon style={this.props.iconStyle} name={this.props.iconName} fill={"#000"} viewBox={this.props.viewBox} height="28" width="28" />}
                <TextInput placeholderTextColor="rgba(128, 128, 128,0.5)" {...this.props} style={[styles.textBox, this.props.style]}>{[this.props.text]}</TextInput>
                {!this.props.valid && <Text style={styles.errorStyle}>*</Text>}
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
        minHeight: 40,
        margin: 5,
        paddingLeft: 10,
        borderWidth: 2,
    },
    icon: {
       // marginTop: 5,
    },
    invalid: {
        borderColor: 'red'
    },
    errorStyle: {
        marginTop: 5,
        marginRight: 15,
        color: 'rgb(253,178,178)',
        fontSize: 24,
        height:40,
        maxHeight: 40,
    }
});
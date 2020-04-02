import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import AppContainer from '../../containers/AppContainer';
import SkateTrickList from '../../../components/skateTrickList';

export default class TrickBookScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navTo(route, param) {
        this.props.navigation.navigate(route, param)
    }

    render() {       
        return (
            <AppContainer passNav={this.props} isNested={false} scrollView={true} pageTitle="Trick Book" pageTitleIcon="Book" iconViewBox="0 0 50 50">              
               
                <View style={{paddingHorizontal:20}}>
                     <SkateTrickList passNav={this.props}/>
                </View>
               
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    goBack: {
        color: 'blue',
        textAlign: "center",
        paddingTop: '5%',
    }
});
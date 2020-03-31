import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Icon from '../../Icon/Icon'

const barStyle = Platform.OS === 'ios' ? 'default' : 'yellow';

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goBack() {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle={barStyle} backgroundColor='black' />
                <SafeAreaView style={[this.props.scrollView ? styles.container : styles.containerNoPaddingBottom]}>
                    {!this.props.noHeader && // for the login screen
                        <View>
                            {!this.props.isNested ? // nested view with back button 
                                <View>
                                    <View style={styles.headerContainer}>
                                        <View style={Platform.OS == 'android' && this.props.pageTitle == "Skate map" ? styles.leftHandContainer : [styles.leftHandContainer, { paddingHorizontal: 15 }]}>
                                            <Icon style={{ marginRight: 5 }} name={this.props.pageTitleIcon} viewBox={this.props.iconViewBox} height="50" width="50" />
                                            <Text style={styles.title}>{this.props.pageTitle}</Text>
                                        </View>

                                        <View style={styles.rightHandContainer}>
                                            <TouchableOpacity onPress={() => this.props.passNav.navigation.navigate('UserProfileScreen', this.props.userData)}>
                                                <Icon name='UserInCircleIcon' fill="blue" viewBox="0 0 250 250" height="40" width="40" />                                             
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.passNav.navigation.navigate('LoginScreen')}>
                                                <Icon name='LogoutIcon' fill="blue" viewBox="-20 -25 175 175" height="40" width="40" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={styles.headerContainer}>
                                    <View style={styles.leftHandContainer}>
                                        <TouchableOpacity onPress={() => this.props.passNav.navigation.goBack()}>
                                            <Icon name='BackArrow' fill="blue" viewBox="0 0 35 35" height="40" width="40" />
                                        </TouchableOpacity>
                                        <Text style={styles.title}>{this.props.pageTitle}</Text>
                                    </View>
                                </View>
                            }
                            {!this.props.noBorder &&
                                <View style={styles.borderLine} />
                            }
                        </View>
                    }
                    {this.props.scrollView ?
                        <ScrollView style={styles.container}>
                            {this.props.children}
                        </ScrollView>
                        :
                        <View style={{ flex: 1 }}>
                            {this.props.children}
                        </View>
                    }
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(240,248,255, 0.8)'
    },
    containerNoPaddingBottom: {
        paddingTop: 15,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(240,248,255, 0.2)'
    },
    headerContainer: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightHandContainer: {
        width: '25%',
        flexDirection: 'row',
        position: 'absolute',
        right: 0
    },
    leftHandContainer: {
        flexDirection: 'row',
        width: '70%',
        position: 'absolute',
        left: 0,
        alignItems: 'center',
    },
    title: {
        fontSize: 24
    },
    borderLine: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        paddingBottom: 10
    }
});
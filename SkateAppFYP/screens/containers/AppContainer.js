import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Icon from '../../Icon/Icon'
const barStyle = Platform.OS === 'ios' ? 'default' : 'yellow';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

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
                <SafeAreaView style={styles.container}>
                    {!this.props.noHeader &&
                        <View>
                            {!this.props.isNested ?
                                <View style={styles.headerContainer}>
                                    <Text style={styles.title}>{this.props.pageTitle}</Text>
                                    <View style={styles.rightHandContainer}>
                                        <TouchableOpacity onPress={() => this.props.passNav.navigation.navigate('UserProfileScreen')}>
                                            <Icon name='UserInCircleIcon' fill="blue" viewBox="0 0 250 250" height="40" width="40" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.passNav.navigation.navigate('LoginScreen')}>
                                            <Icon name='LogoutIcon' fill="blue" viewBox="-20 -25 175 175" height="40" width="40" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={styles.headerContainer}>
                                    <TouchableOpacity style={styles.leftHandContainer} onPress={() => this.props.passNav.navigation.goBack()}>
                                        <Icon name='BackArrow' fill="blue" viewBox="0 0 35 35" height="40" width="40" />
                                    </TouchableOpacity>
                                    <Text style={styles.title}>{this.props.pageTitle}</Text>
                                </View>

                            }
                            {!this.props.noBorder &&
                                <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, paddingBottom: 10 }} />
                            }
                        </View>
                    }
                    <ScrollView style={styles.container}>
                        {this.props.children}
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(240,248,255, 0.2)',
    },
    headerContainer: {
        width: '100%',
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
        position: 'absolute',
        left: 0
    },
    title: {
        fontSize: 24,
        alignContent: 'center'
    },
});
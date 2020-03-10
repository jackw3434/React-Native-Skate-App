import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Icon from '../../Icon/Icon'
const barStyle = Platform.OS === 'ios' ? 'default' : 'yellow';

const screenHeight = Math.round(Dimensions.get('window').height);

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
                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, paddingBottom: 10 }}>
                            {!this.props.isNested ?
                                // <View style={{ flexDirection: 'row', textAlign: 'center' }}>
                                //     <Text style={styles.title}>{this.props.pageTitle}</Text>
                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', textAlign: 'right' }}>
                                        <TouchableOpacity onPress={() => this.props.passNav.navigation.navigate('UserProfileScreen')}>
                                            <Icon name='UserInCircleIcon' fill="blue" viewBox="0 0 250 250" height="44" width="44" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.passNav.navigation.navigate('LoginScreen')}>
                                            <Icon name='LogoutIcon' fill="blue" viewBox="-20 -25 175 175" height="44" width="44" />
                                        </TouchableOpacity>
                                    </View>
                                // </View>
                                :
                                <TouchableOpacity onPress={() => this.props.passNav.navigation.goBack()}>
                                    <Icon name='BackArrow' fill="blue" viewBox="0 0 35 35" height="44" width="44" />
                                </TouchableOpacity>
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
        backgroundColor: 'rgba(240,248,255, 0.2)'
    },
    headerContainer: {
        height: 40,
        alignSelf: 'flex-end'
    },
    goBack: {
        color: 'blue',
        paddingLeft: 5
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
});
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';

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
                <SafeAreaView style={styles.container}>
                    {!this.props.isNested ?
                        <View style={{
                            flexDirection: 'row', alignSelf: 'flex-end',
                            textAlign: 'right',
                        }}>
                            <TouchableOpacity onPress={() => this.props.passNav.navigation.navigate('UserProfileScreen')}>
                                <Text style={{ color: 'blue', paddingRight:10 }}>User Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.passNav.navigation.navigate('LoginScreen')}>
                                <Text style={{ color: 'blue' }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => this.props.passNav.navigation.goBack()}>
                            <Text style={styles.goBack}>Go Back</Text>
                        </TouchableOpacity>
                    }
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
    headerContainer: {
        height: 40,
        alignSelf: 'flex-end'
    },
    goBack: {
        color: 'blue'
    }
});
import 'react-native-gesture-handler';
import * as React from 'react';
import MapView from 'react-native-maps';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import AppContainer from '../containers/AppContainer'
import Icon from '../../Icon/Icon'
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SkateMapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    render() {
        return (
            <AppContainer passNav={this.props} isNested={false} scrollView={false} pageTitle="Skate Map" pageTitleIcon="MapIcon" iconViewBox="0 0 50 50">
                <MapView
                    style={{ height: '100%' }}
                    initialRegion={{
                        latitude: 50.3762, // Plymouth Uni
                        longitude: -4.1395,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                <TouchableOpacity style={styles.mapIconStyle}>
                    <Icon name='PlusIcon' viewBox="-200 -150 900 900" height='100' width='100' />
                </TouchableOpacity>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    mapIconStyle: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: 'grey',
        borderColor: 'rgba(0,0,255,0.5)',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
import 'react-native-gesture-handler';
import * as React from 'react';
import MapView from 'react-native-maps';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import AppContainer from '../containers/AppContainer'

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
                <View style={styles.mapContainer}>
                    <MapView
                        style={{ height: '100%' }}
                        initialRegion={{
                            latitude: 50.3762, // Plymouth Uni
                            longitude: -4.1395,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>

            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {

        // borderColor: 'black',
        // borderWidth: 2,
    }
});
import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AppContainer from '../containers/AppContainer'
import Icon from '../../Icon/Icon'
import Modal from "react-native-modal";
import SkateButton from '../../components/skateButton'

export default class SkateMapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            currentLat: null,
            currentLng: null,
            mapType: "standard",
            isModalVisible: false,
            isModalMenuVisible: false,
            isNewSkateSpotVisible: false,
            isHereToTeachVisible: false,
            isGameOfSkateVisible: false
        };
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(info => {
            //console.warn("latitude: ", info.coords.latitude, " longitude: ", info.coords.longitude);
            this.setState({ currentLat: info.coords.latitude, currentLng: info.coords.longitude })
        });
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    toggleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            isModalMenuVisible: true,
            isNewSkateSpotVisible: false,
            isHereToTeachVisible: false,
            isGameOfSkateVisible: false
        });
    };

    toggleMapType() {
        if (this.state.mapType == "standard") {
            this.setState({ mapType: "hybrid" })
        } else {
            this.setState({ mapType: "standard" })
        }
    }

    openSkateSpotModal() {
        this.setState({ isNewSkateSpotVisible: true, isModalMenuVisible: false })
    }

    openHereToTeachModal() {
        this.setState({ isHereToTeachVisible: true, isModalMenuVisible: false })
    }

    openGameOfSkateModal() {
        this.setState({ isGameOfSkateVisible: true, isModalMenuVisible: false })
    }

    modalCancelSkateSpot() {
        this.setState({ isNewSkateSpotVisible: false, isModalMenuVisible: true })
    }

    modalCancelHereToTeach() {
        this.setState({ isHereToTeachVisible: false, isModalMenuVisible: true })
    }

    modalCancelGameOfSkate() {
        this.setState({ isGameOfSkateVisible: false, isModalMenuVisible: true })
    }

    submitSkateSpotPin() {

    }

    submitHereToTeachPin() {

    }

    submitGameOfSkatePin() {

    }

    render() {
        return (
            <AppContainer passNav={this.props} isNested={false} scrollView={false} pageTitle="Skate Map" pageTitleIcon="MapIcon" iconViewBox="0 0 50 50">
                <MapView
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnabled={true}
                    userLocationAnnotationTitle="me"
                    mapType={this.state.mapType}
                    style={{ height: '100%' }}
                    initialRegion={{
                        latitude: this.state.currentLat ? this.state.currentLat : 50.3762, // Plymouth Uni
                        longitude: this.state.currentLng ? this.state.currentLng : -4.1395,
                        latitudeDelta: 0.0221,
                        longitudeDelta: 0.0221,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: 50.3862, // Plymouth Uni
                            longitude: -4.1395,
                        }}
                        title="Title"
                        description="Description"
                        draggable
                        onDragEnd={e => console.warn(e.nativeEvent)}
                    />
                </MapView>

                <Modal
                    backdropTransitionInTiming={3000}
                    backdropTransitionOutTiming={3000}
                    onBackdropPress={() => this.toggleModal()}
                    style={{ alignItems: 'center' }}
                    isVisible={this.state.isModalVisible}>
                    <View style={{ backgroundColor: 'rgba(255,255,255,1)', borderRadius: 30, padding: 30 }}>
                        {this.state.isModalMenuVisible &&
                            <View>
                                <Text style={{ fontSize: 28, borderBottomWidth: 0.5, width: '100%' }}>Create a Pin</Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                                    Meet others who skate, teach others to skate,
                                    play a game of S.K.A.T.E or let others know about a cool skate spot.
                                </Text>
                                <SkateButton
                                    buttonText="New Skate Spot"
                                    iconName="Pin"
                                    viewBox="0 0 30 30"
                                    iconStyle={{ position: 'absolute', left: 10, top: 10 }}
                                    fill='white'
                                    onPress={() => this.openSkateSpotModal()}

                                />
                                <SkateButton
                                    buttonText="Here To Teach :)"
                                    bgColor='red'
                                    iconName="Pin"
                                    viewBox="0 0 30 30"
                                    iconStyle={{ position: 'absolute', left: 10, top: 10 }}
                                    fill='white'
                                    onPress={() => this.openHereToTeachModal()}
                                />
                                <SkateButton
                                    buttonText="Game of S.K.A.T.E"
                                    bgColor='red'
                                    iconName="Pin"
                                    viewBox="0 0 30 30"
                                    iconStyle={{ position: 'absolute', left: 10, top: 10 }}
                                    fill='white'
                                    onPress={() => this.openGameOfSkateModal()}
                                />
                            </View>
                        }
                        {this.state.isNewSkateSpotVisible &&
                            <View>
                                <Text style={{ fontSize: 28, borderBottomWidth: 0.5, width: '100%' }}>New Skate Spot</Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                                    Let others know about a cool skate spot.
                                </Text>
                                <Text>Found By: Skater Andy</Text>
                                <Text>Current Location</Text>
                                <Text>Enter a description of the skate spot</Text>
                                <View style={{ height: 120, width: '80%', borderWidth: 2 }}></View>
                                <SkateButton buttonText="Submit" onPress={() => this.submitSkateSpotPin()} />
                                <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.modalCancelSkateSpot()} />
                            </View>
                        }
                        {this.state.isHereToTeachVisible &&
                            <View>
                                <Text style={{ fontSize: 28, borderBottomWidth: 0.5, width: '100%' }}>Here To Teach :)</Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                                    Teach someone a new trick!
                                </Text>
                                <Text>You: Skater Andy</Text>
                                <Text>Current Location or pick a location</Text>
                                <Text>Enter a description of the skate spot</Text>
                                <View style={{ height: 120, width: '80%', borderWidth: 2 }}></View>
                                <Text>Select the time you will be there</Text>
                                <View style={{ height: 80, width: '80%', borderWidth: 2 }}></View>
                                <SkateButton buttonText="Submit" onPress={() => this.submitHereToTeachPin()} />
                                <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.modalCancelHereToTeach()} />
                            </View>
                        }
                        {this.state.isGameOfSkateVisible &&
                            <View>
                                <Text style={{ fontSize: 28, borderBottomWidth: 0.5, width: '100%' }}>Game of S.K.A.T.E</Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                                    Let people know you want to have a skate with them.
                                </Text>
                                <Text>You: Skater Andy</Text>
                                <Text>Current Location or pick a location</Text>
                                <Text>Enter a friendly message</Text>
                                <View style={{ height: 120, width: '80%', borderWidth: 2 }}>
                                    <Text>
                                        Anyone fancy a game of skate??
                                        Check out my tricks on my profile and come see if you can beat me :)
                                    </Text>
                                </View>
                                <Text>Select the time you will be there</Text>
                                <View style={{ height: 80, width: '80%', borderWidth: 2 }}></View>
                                <SkateButton buttonText="Submit" onPress={() => this.submitGameOfSkatePin()} />
                                <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.modalCancelGameOfSkate()} />
                            </View>
                        }
                    </View>
                </Modal>
                <TouchableOpacity style={{ position: 'absolute', paddingTop: 20 }} onPress={() => this.toggleMapType()}>
                    <Text style={{ color: 'red', paddingLeft:10}}>Toggle Map Type, Current: {this.state.mapType}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mapIconStyle} onPress={() => this.toggleModal()} >
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
        backgroundColor: 'rgba(108, 122, 137, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },

});
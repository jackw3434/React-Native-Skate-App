import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
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
            isGameOfSkateVisible: false,
            isMarkerModalVisible: false,
            locationProvider: false,
            markers: [{
                _id: 1,
                type: 'Skate Spot',
                coordinate: {
                    latitude: 50.3864,
                    longitude: -4.1395,
                },
                title: 'Stair set',
                createdBy: 'Skater Andy',
                photo: 'source goes here for image',
                description: 'Sick 3 stair set with smooth hand rail.',
                reviews: ["Nice area", "Really Fun Spot to learn.", "5 Star Spot", "Great Spot", "really good for learning", "I really like it", 'good spot'],
                startTime: '',
                endTime: '',
                pinColor: 'blue'
            },
            {
                _id: 2,
                type: 'Here To Teach :)',
                coordinate: {
                    latitude: 50.3874,
                    longitude: -4.1395,
                },
                title: 'Teaching Kickflips!',
                createdBy: 'Skater Jill',
                photo: '',
                description: 'Im gona be around for a bit and help anyone with their kickflips.',
                reviews: ["Really Helpful and Friendly.", "So helpful.", "Amazing teacher, I learnt a lot"],
                startTime: '2pm',
                endTime: '4pm',
                pinColor: 'orange'
            },
            {
                _id: 3,
                type: 'Game of S.K.A.T.E',
                coordinate: {
                    latitude: 50.3884,
                    longitude: -4.1395,
                },
                title: 'Anyone fancy a game of Skate?',
                createdBy: 'Skater Andy',
                photo: '',
                description: 'Here for a couple hours, come find me if you wanna play a game of skate.',
                reviews: ["Fun to skate with, hard to beat at a game of S.K.A.T.E", "I beat him easy xD"],
                startTime: '1pm',
                endTime: '5pm',
                pinColor: 'red'
            }],
            currentSkatePinModalData: {
                type: '',
                title: '',
                createdBy: '',
                coordinate: {
                    latitude: '',
                    longitude: ''
                },
                photo: '',
                description: '',
                reviews: [],
                startTime: '',
                endTime: '',
                pinColor: ''
            }
        };
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => { this.setState({ currentLat: position.coords.latitude, currentLng: position.coords.longitude, locationProvider: true }) },
            (error) => { this.setState({ locationProvider: false }) },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
        );

        Geolocation.watchPosition(
            (position) => { this.setState({ currentLat: position.coords.latitude, currentLng: position.coords.longitude, locationProvider: true }) },
            (error) => { this.setState({ locationProvider: false }) },
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
        );
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

    submitSkateSpotPin(data) {
        let skateSpotPin = {
            type: 'Skate Spot',
            title: data.title,
            createdBy: data.user,
            coordinate: {
                latitude: this.state.currentLat,
                longitude: this.state.currentLng
            },
            photo: '',
            description: data.description,
            //reviews: [],
            startTime: null,
            endTime: null,
            pinColor: 'blue'
        }
        this.state.markers.push(skateSpotPin)
    }

    submitHereToTeachPin(data) {
        let hearToTeachPin = {
            type: 'Skate Spot',
            title: data.title,
            createdBy: data.user,
            coordinate: {
                latitude: '',
                longitude: ''
            },
            photo: null,
            description: data.description,
            //reviews: [],
            startTime: data.startTime,
            endTime: data.endTime,
            pinColor: 'orange'
        }
        this.state.markers.push(hearToTeachPin)
    }

    submitGameOfSkatePin(data) {
        let gameOfSkatePin = {
            type: 'Skate Spot',
            title: data.title,
            createdBy: data.user,
            coordinate: {
                latitude: '',
                longitude: ''
            },
            photo: null,
            description: data.description,
            //reviews: [],
            startTime: data.startTime,
            endTime: data.endTime,
            pinColor: 'red'
        }
        this.state.markers.push(gameOfSkatePin)
    }

    openMarkerModal(marker) {

        let { type, title, createdBy, coordinate, photo, description, reviews, startTime, endTime, pinColor } = marker;

        this.setState({
            isMarkerModalVisible: true,
            currentSkatePinModalData: {
                type: type,
                title: title,
                createdBy: createdBy,
                coordinate: coordinate,
                photo: photo,
                description: description,
                reviews: reviews,
                startTime: startTime,
                endTime: endTime,
                pinColor: pinColor
            }
        })
    }

    closeMarkerModal() {
        this.setState({ isMarkerModalVisible: false })
    }

    useCurrentLocation() {

    }

    selectLocationOnMap() {
        // close modal
        // tap somehwere on the map
        // get coordinates
        // confirm selection or goback/cancel

    }

    _renderSkatePinModal() {
        let { type, title, createdBy, coordinate, photo, description, reviews, startTime, endTime, pinColor } = this.state.currentSkatePinModalData;

        if (type == "Skate Spot") {
            return (
                <Modal
                    backdropTransitionInTiming={3000}
                    backdropTransitionOutTiming={3000}
                    onBackdropPress={() => this.closeMarkerModal()}
                    style={{ alignItems: 'center' }}
                    isVisible={this.state.isMarkerModalVisible}>
                    <View style={[styles.modalContainer, { width: '100%' }]}>
                        <Text>Type: {type}</Text>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <Text style={{ paddingTop: 5, paddingBottom: 5 }}>Found By: <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{createdBy}</Text></Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 70, width: 70, borderWidth: 0.5, justifyContent: "center" }}><Text>Skate Spot Image</Text></View>
                            <Text style={{ fontSize: 16, textAlign: 'left', marginLeft: 10, flex: 1, flexWrap: 'wrap' }}>{description}</Text>
                        </View>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline', paddingBottom: 5, paddingTop: 5 }}>Reviews:</Text>
                        <View style={{ height: 100, borderWidth: 0.5, borderRadius: 5 }}>
                            <ScrollView>
                                {reviews.map((review) => {
                                    return <Text style={{ paddingBottom: 5, paddingLeft: 2 }}>{review}</Text>;
                                })}
                            </ScrollView>
                        </View>
                        <SkateButton
                            buttonText="Get Directions"
                            iconName="MapIcon"
                            viewBox="0 0 30 30"
                            iconStyle={styles.skateButtonIcon}
                            onPress={() => console.warn('latitide: ', coordinate.latitude, ' longitude: ', coordinate.longitude)}
                        />
                    </View>
                </Modal>
            );
        } else {
            return (
                <Modal
                    backdropTransitionInTiming={3000}
                    backdropTransitionOutTiming={3000}
                    onBackdropPress={() => this.closeMarkerModal()}
                    style={{ alignItems: 'center' }}
                    isVisible={this.state.isMarkerModalVisible}>
                    <View style={[styles.modalContainer, { width: '100%' }]}>
                        <Text>Type: {type}</Text>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <Text style={{ paddingTop: 5, paddingBottom: 5, color: 'blue', textDecorationLine: 'underline' }}>{createdBy}</Text>
                        <Text style={{ fontSize: 16, textAlign: 'left', marginLeft: 10, flex: 1, flexWrap: 'wrap' }}>{description}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='Clock' viewBox="-50 -50 1024 1024" height="28" width="28" fill='blue' />
                            <Text>{startTime} - {endTime}</Text>
                        </View>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline', paddingBottom: 5, paddingTop: 5 }}>Reviews:</Text>
                        <View style={{ height: 100, borderWidth: 0.5, borderRadius: 5 }}>
                            <ScrollView>
                                {reviews.map((review) => {
                                    return <Text style={{ paddingBottom: 5, paddingLeft: 2 }}>{review}</Text>;
                                })}
                            </ScrollView>
                        </View>
                        <SkateButton
                            buttonText="Get Directions"
                            iconName="MapIcon"
                            viewBox="0 0 30 30"
                            iconStyle={styles.skateButtonIcon}
                            onPress={() => console.warn('latitide: ', coordinate.latitude, ' longitude: ', coordinate.longitude)}
                        />
                    </View>
                </Modal>
            );
        }
    }

    render() {
        return (
            <AppContainer
                passNav={this.props}
                isNested={false}
                scrollView={false}
                pageTitle="Skate Map"
                pageTitleIcon="MapIcon"
                iconViewBox="0 0 50 50">

                <MapView
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnabled={true}
                    userLocationAnnotationTitle="Me!"
                    mapType={this.state.mapType}
                    style={{ height: '100%' }}
                    initialRegion={{
                        latitude: this.state.currentLat ? this.state.currentLat : 50.3762, // Plymouth Uni
                        longitude: this.state.currentLng ? this.state.currentLng : -4.1395,
                        latitudeDelta: 0.0221,
                        longitudeDelta: 0.0221,
                    }}
                // region={{
                //     latitude: this.state.currentLat ? this.state.currentLat : 50.3762, // Plymouth Uni
                //     longitude: this.state.currentLng ? this.state.currentLng : -4.1395,
                //     latitudeDelta: 0.0221,
                //     longitudeDelta: 0.0221, 
                // }}
                >
                    <Marker
                        coordinate={{
                            latitude: 50.3862,
                            longitude: -4.1395,
                        }}
                        title="Title"
                        description="Description"
                        draggable
                        onDragEnd={e => console.warn(e.nativeEvent)}
                    />
                    {this.state.markers.map(marker => (
                        <Marker
                            key={marker.title}
                            coordinate={{
                                latitude: marker.coordinate.latitude,
                                longitude: marker.coordinate.longitude,
                            }}
                            title={marker.type}
                            //description={marker.description}
                            pinColor={marker.pinColor}
                            onPress={() => this.openMarkerModal(marker)}
                        />
                    ))}
                </MapView>

                {this._renderSkatePinModal()}

                {/* <Modal
                    backdropTransitionInTiming={3000}
                    backdropTransitionOutTiming={3000}
                    onBackdropPress={() => this.closeMarkerModal()}
                    style={{ alignItems: 'center' }}
                    isVisible={this.state.isMarkerModalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Selected pin</Text>
                        <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                            This is a pin
                                </Text>
                    </View>
                </Modal> */}

                <Modal
                    backdropTransitionInTiming={3000}
                    backdropTransitionOutTiming={3000}
                    onBackdropPress={() => this.toggleModal()}
                    style={{ alignItems: 'center' }}
                    isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        {this.state.isModalMenuVisible &&
                            <View>
                                <Text style={styles.modalTitle}>Create a Pin</Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                                    Meet others who skate, teach others to skate,
                                    play a game of S.K.A.T.E or let others know about a cool skate spot.
                                </Text>
                                <SkateButton
                                    buttonText="New Skate Spot"
                                    iconName="Pin"
                                    viewBox="0 0 30 30"
                                    iconStyle={styles.skateButtonIcon}
                                    fill='white'
                                    onPress={() => this.openSkateSpotModal()}
                                />
                                <SkateButton
                                    buttonText="Here To Teach :)"
                                    bgColor='red'
                                    iconName="Pin"
                                    viewBox="0 0 30 30"
                                    iconStyle={styles.skateButtonIcon}
                                    fill='white'
                                    onPress={() => this.openHereToTeachModal()}
                                />
                                <SkateButton
                                    buttonText="Game of S.K.A.T.E"
                                    bgColor='red'
                                    iconName="Pin"
                                    viewBox="0 0 30 30"
                                    iconStyle={styles.skateButtonIcon}
                                    fill='white'
                                    onPress={() => this.openGameOfSkateModal()}
                                />
                            </View>
                        }
                        {this.state.isNewSkateSpotVisible &&
                            <View>
                                <Text style={styles.modalTitle}>Upload New Skate Spot</Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                                    Let others know about a good places to skate.
                                </Text>
                                <Text>Found By: Skater Andy</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Location: </Text>
                                    <TouchableOpacity onPress={() => this.useCurrentLocation()}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Use Current Location</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ paddingTop: 10, paddingBottom: 5 }}>Enter a description of the skate spot</Text>
                                <View style={{ height: 120, width: '100%', borderWidth: 2 }}></View>
                                <SkateButton style={{marginTop:10}} buttonText="Submit" onPress={() => this.submitSkateSpotPin()} />
                                <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.modalCancelSkateSpot()} />
                            </View>
                        }
                        {this.state.isHereToTeachVisible &&
                            <View>
                                <Text style={styles.modalTitle}>Here To Teach :)</Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                                    Teach someone a new trick!
                                </Text>
                                <Text>You: Skater Andy</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Location: </Text>
                                    <TouchableOpacity onPress={() => this.useCurrentLocation()}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Use Current Location</Text>
                                    </TouchableOpacity>
                                    <Text>or</Text>
                                    <TouchableOpacity onPress={() => this.selectLocationOnMap()}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Pick a location.</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ paddingTop: 10 }}>Enter a description of the skate spot</Text>
                                <View style={{ height: 120, width: '80%', borderWidth: 2 }}></View>
                                <Text>Select the time you will be there</Text>
                                <View style={{ height: 80, width: '80%', borderWidth: 2 }}></View>
                                <SkateButton buttonText="Submit" onPress={() => this.submitHereToTeachPin()} />
                                <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.modalCancelHereToTeach()} />
                            </View>
                        }
                        {this.state.isGameOfSkateVisible &&
                            <View>
                                <Text style={styles.modalTitle}>Game of S.K.A.T.E</Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                                    Let people know you want to have a skate with them.
                                </Text>
                                <Text>You: Skater Andy</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Location: </Text>
                                    <TouchableOpacity onPress={() => this.useCurrentLocation()}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Use Current Location</Text>
                                    </TouchableOpacity>
                                    <Text>or</Text>
                                    <TouchableOpacity onPress={() => this.selectLocationOnMap()}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Pick a location.</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text>Enter a friendly message</Text>
                                <View style={{ height: 120, width: '80%', borderWidth: 2 }}>
                                    <Text>
                                        Anyone fancy a game of skate??
                                        Check out my tricks on my profile and come see if you can beat me :)
                                    </Text>
                                </View>
                                <Text style={{ paddingTop: 10 }}>Select the time you will be there</Text>
                                <View style={{ height: 80, width: '80%', borderWidth: 2 }}></View>
                                <SkateButton buttonText="Submit" onPress={() => this.submitGameOfSkatePin()} />
                                <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.modalCancelGameOfSkate()} />
                            </View>
                        }
                    </View>
                </Modal>
                <TouchableOpacity style={styles.toggleMapTypeContainer} onPress={() => this.toggleMapType()}>
                    <Text>Map Type: {this.state.mapType}</Text>
                </TouchableOpacity>
                <View style={styles.bottomContainer}>
                    {!this.state.locationProvider &&
                        <Text style={styles.gpsStatusStle}>GPS Status: disabled</Text>
                    }
                    <TouchableOpacity style={styles.mapIconStyle} onPress={() => this.toggleModal()} >
                        <Icon name='PlusIcon' viewBox="-200 -150 900 900" height='100' width='100' />
                    </TouchableOpacity>
                </View>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    mapIconStyle: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: 'rgba(108, 122, 137, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gpsStatusStle: {
        padding: 8,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        textAlign: 'center'
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    skateButtonIcon: {
        position: 'absolute',
        left: 10,
        top: 10
    },
    modalContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 30,
        padding: 30
    },
    modalTitle: {
        fontSize: 28,
        borderBottomWidth: 0.5,
        width: '100%'
    },
    toggleMapTypeContainer: {
        position: 'absolute',
        right: 5,
        top: 5,
        padding: 8,
        borderColor: 'blue',
        borderWidth: 0.5,
        borderRadius: 30,
        backgroundColor: 'white'
    }

});
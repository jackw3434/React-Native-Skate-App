import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Button, Dimensions, Platform, BackHandler } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AppContainer from '../containers/AppContainer'
import Icon from '../../Icon/Icon'
import Modal from "react-native-modal";
import SkateButton from '../../components/skateButton'
import SkateDateTimePicker from '../../components/skateDateTimePicker';
import SkatePinCreationModalView from '../../components/skatePinCreationModalView'
import { getAllSkatePins, deleteSkatePin, postSkatePin } from '../../functions/skatePinFunctions'
import SkateMarkerModal from '../../components/skateMarkerModal'

export default class SkateMapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 50.3762, // Plymouth Uni
                longitude: -4.1395,
                latitudeDelta: 0.1321,
                longitudeDelta: 0.1321,
            },
            date: new Date(),
            currentLat: null,
            currentLng: null,
            useCurrentOrSelectedLocation: '',
            mapType: "standard",
            isModalVisible: false,
            isModalMenuVisible: false,
            isNewSkateSpotVisible: false,
            isHereToTeachVisible: false,
            isGameOfSkateVisible: false,
            isMarkerModalVisible: false,
            locationProvider: false,
            showDateTimePicker: false,
            dateTimePickerMode: '',
            startOrEndTime: '',
            selectedDate: '',
            selectedTime: '',
            canTapMap: false,
            mapCoordinatesToUse: {
                latitude: null,
                longitude: null,
            },
            description: '',
            skateDate: '',
            startTime: '',
            endTime: '',
            markers: [],
            currentSkatePinModalData: {
                createdBy: "LOGGED IN USER GOES HERE",
                coordinate: {
                    latitude: '',
                    longitude: ''
                },
                photo: '',
                description: '',
                reviews: [{
                    reviewerID: '',
                    reviewerName: '',
                    reviewerMessage: ''
                }],
                skateDate: '',
                startTime: '',
                endTime: '',
                pinColor: ''
            }
        };
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.1321,
                        longitudeDelta: 0.1321,
                    },
                    currentLat: position.coords.latitude,
                    currentLng: position.coords.longitude,
                    locationProvider: true
                })
            },
            (error) => {
                console.warn("Location Services Not Enabled", error.message);
                this.setState({ locationProvider: false })
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 });

        getAllSkatePins().then((skatePins) => {

            this.setState({ markers: skatePins })
        });
    };

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    toggleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            isModalMenuVisible: true,
            isNewSkateSpotVisible: false,
            isHereToTeachVisible: false,
            isGameOfSkateVisible: false,
            mapCoordinatesToUse:
            {
                latitude: '',
                longitude: ''
            }
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
        this.setState({
            isHereToTeachVisible: true,
            isModalMenuVisible: false,
            useCurrentOrSelectedLocation: ''
        })
    }

    openGameOfSkateModal() {
        this.setState({
            isGameOfSkateVisible: true,
            isModalMenuVisible: false,
            useCurrentOrSelectedLocation: ''
        })
    }

    cancelCreatingSkatePin() {
        this.setState({
            isGameOfSkateVisible: false,
            isHereToTeachVisible: false,
            isNewSkateSpotVisible: false,
            isModalMenuVisible: true,
            mapCoordinatesToUse: {
                latitude: '',
                longitude: ''
            },
            skateDate: '',
            startTime: '',
            endTime: '',
            description: '',
            useCurrentOrSelectedLocation: ''
        })
    }

    clearAfterPinSubmission() {
        this.setState({
            isHereToTeachVisible: false,
            isGameOfSkateVisible: false,
            isNewSkateSpotVisible: false,
            isModalVisible: false,
            mapCoordinatesToUse: {
                latitude: '',
                longitude: ''
            },
            description: '',
            skateDate: '',
            startTime: '',
            endTime: '',
            useCurrentOrSelectedLocation: ''
        })
    }

    submitPin(pinType) {

        let pin;

        if (!this.state.mapCoordinatesToUse.latitude) {
            console.warn("no coords", this.state.mapCoordinatesToUse);
        } else {
            if (pinType == "Here to teach") {
                pin = {
                    title: 'Here to teach',
                    createdBy: this.state.currentSkatePinModalData.createdBy,
                    coordinate: {
                        latitude: this.state.mapCoordinatesToUse.latitude,
                        longitude: this.state.mapCoordinatesToUse.longitude
                    },
                    photo: 'No Picture Yet',
                    description: this.state.description,
                    skateDate: this.state.skateDate,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    // reviews: [ review id, reviewmessage, reviewer name of logged in skaters reviews], axios get logged in user reviews
                    pinColor: 'orange'
                };
            }

            if (pinType == "Game of S.K.A.T.E") {
                pin = {
                    title: 'Game of S.K.A.T.E',
                    createdBy: this.state.currentSkatePinModalData.createdBy,
                    coordinate: {
                        latitude: this.state.mapCoordinatesToUse.latitude,
                        longitude: this.state.mapCoordinatesToUse.longitude
                    },
                    photo: 'No Picture Yet',
                    description: this.state.description,
                    // reviews: [ review id, reviewmessage, reviewer name of logged in skaters reviews], axios get logged in user reviews
                    skateDate: this.state.skateDate,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    pinColor: 'red'
                }
            }

            if (pinType == "Skate spot") {
                pin = {
                    title: 'Skate spot',
                    createdBy: this.state.currentSkatePinModalData.createdBy,
                    coordinate: {
                        latitude: this.state.mapCoordinatesToUse.latitude,
                        longitude: this.state.mapCoordinatesToUse.longitude
                    },
                    photo: 'No Picture Yet',
                    description: this.state.description,
                    pinColor: 'blue'
                }
            }

            postSkatePin(pin).then(response => {
                getAllSkatePins().then((skatePins) => {
                    this.setState({ markers: skatePins })
                })
            })

            this.clearAfterPinSubmission();
        }
    }

    openMarkerModal(marker) {

        let { title, createdBy, coordinate, photo, description, reviews, startTime, endTime, pinColor, skateDate } = marker;

        this.setState({
            isMarkerModalVisible: true,
            currentSkatePinModalData: {
                title: title,
                createdBy: createdBy,
                coordinate: coordinate,
                photo: photo,
                description: description,
                reviews: reviews,
                startTime: startTime,
                endTime: endTime,
                pinColor: pinColor,
                skateDate: skateDate
            }
        })
    }

    closeMarkerModal() {
        this.setState({ isMarkerModalVisible: false })
    }

    useCurrentLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({ useCurrentOrSelectedLocation: 'current', mapCoordinatesToUse: { latitude: position.coords.latitude, longitude: position.coords.longitude }, locationProvider: true })
            },
            (error) => {
                console.warn("Location Services Not Enabled"),
                    this.setState({ locationProvider: false })
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
        );
    }

    selectLocationOnMap() {
        this.setState({ useCurrentOrSelectedLocation: 'selected', isModalVisible: false, canTapMap: true })
    }

    returnFromMapLocationSelection() {
        this.setState({ isModalVisible: true, canTapMap: false })
    }

    _renderSkatePinModal() {

        let { title, createdBy, coordinate, photo, description, reviews, startTime, endTime, pinColor, skateDate } = this.state.currentSkatePinModalData;

        if (title == "Skate spot") {
            return (
                <SkateMarkerModal
                    onBackButtonPress={() => this.closeMarkerModal()}
                    onBackdropPress={() => this.closeMarkerModal()}
                    isVisible={this.state.isMarkerModalVisible}
                    modalTitle={title}
                    createdBy={createdBy}
                    onUserNamePress={() => console.warn(createdBy)} // .id
                    photo={photo}
                    description={description}
                    reviews={reviews}
                    coordinate={coordinate}
                    onDirectionsPress={() => console.warn(coordinate.latitude, coordinate.longitude)}
                />
            );
        } else {
            return (
                <SkateMarkerModal
                    onBackButtonPress={() => this.closeMarkerModal()}
                    onBackdropPress={() => this.closeMarkerModal()}
                    isVisible={this.state.isMarkerModalVisible}
                    modalTitle={title}
                    createdBy={createdBy}
                    onUserNamePress={() => console.warn(createdBy)} // .id
                    description={description}
                    photo={photo}
                    skateDate={skateDate}
                    startTime={startTime}
                    endTime={endTime}
                    reviews={reviews}
                    coordinate={coordinate}
                    onDirectionsPress={() => console.warn(coordinate.latitude, coordinate.longitude)}
                />
            );
        }
    }

    setDateTime = (event, date) => {

        let utcSeconds = event.nativeEvent.timestamp;
        let selectedDate = new Date(utcSeconds).toLocaleDateString();
        let selectedTime = new Date(utcSeconds).toLocaleTimeString();

        if (Platform.OS == 'android') {

            if (event.type == "set") {

                if (this.state.startOrEndTime == "startTime") {

                    this.setState({ startTime: selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false })
                } else if (this.state.startOrEndTime == "endTime") {

                    this.setState({ endTime: selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false })
                } else if (this.state.startOrEndTime == "Date") {

                    this.setState({ skateDate: selectedDate, showDateTimePicker: false, date: new Date() })
                }
            }
            if (event.type == "dismissed") {
                this.cancelDateTime();
            }
        } else {
            this.setState({ selectedDate: selectedDate, selectedTime: selectedTime, date: date })
        }
    }

    showDateOrTimePicker(pickerType, startOrEndTime) {
        if (pickerType == "Date") {
            this.setState({ dateTimePickerMode: 'date', showDateTimePicker: true, startOrEndTime: "Date" })
        }
        if (pickerType == "Time") {
            if (startOrEndTime == "startTime") {
                this.setState({ dateTimePickerMode: 'time', showDateTimePicker: true, startOrEndTime: "startTime" })
            }
            if (startOrEndTime == "endTime") {
                this.setState({ dateTimePickerMode: 'time', showDateTimePicker: true, startOrEndTime: "endTime" })
            }
        }
    }

    confirmStartTime() {
        if (Platform.OS == 'ios' && this.state.selectedDate == "") {
            let selectedTime = new Date().toLocaleTimeString();
            this.setState({ startTime: selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false })
        } else {
            this.setState({ startTime: this.state.selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false })
        }
    }

    confirmEndTime() {
        if (Platform.OS == 'ios' && this.state.selectedDate == "") {
            let selectedTime = new Date().toLocaleTimeString();
            this.setState({ endTime: selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false })
        } else {
            this.setState({ endTime: this.state.selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false })
        }
    }

    confirmSkateDate() {
        if (Platform.OS == 'ios' && this.state.selectedDate == "") {
            let selectedDate = new Date().toLocaleDateString();
            this.setState({ skateDate: selectedDate, showDateTimePicker: false, date: new Date() })
        } else {
            this.setState({ skateDate: this.state.selectedDate, showDateTimePicker: false, date: new Date() })
        }
    }

    cancelDateTime() {
        this.setState({ showDateTimePicker: false, date: new Date() })
    }

    _renderDateTimePicker() {
        if (this.state.startOrEndTime == "startTime") {
            return (
                <SkateDateTimePicker
                    value={this.state.date}
                    mode={this.state.dateTimePickerMode}
                    onChange={this.setDateTime}
                    confirm={() => this.confirmStartTime()}
                    cancel={() => this.cancelDateTime()}
                />
            );
        } else if (this.state.startOrEndTime == "endTime") {
            return (
                <SkateDateTimePicker
                    value={this.state.date}
                    mode={this.state.dateTimePickerMode}
                    onChange={this.setDateTime}
                    confirm={() => this.confirmEndTime()}
                    cancel={() => this.cancelDateTime()}
                />
            );
        } else {
            return (
                <SkateDateTimePicker
                    value={this.state.date}
                    mode={this.state.dateTimePickerMode}
                    onChange={this.setDateTime}
                    confirm={() => this.confirmSkateDate()}
                    cancel={() => this.cancelDateTime()}
                />
            );
        }
    }

    onRegionChange(region) {
        this.setState({ region: region })
    }

    showTempPin(event) {
        if (this.state.canTapMap === true) {
            let coordinate = event.nativeEvent.coordinate;
            let tempPin = {
                coordinate: {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude
                }
            }
            this.state.markers.push(tempPin)
            this.setState({ mapCoordinatesToUse: { latitude: coordinate.latitude, longitude: coordinate.longitude } });
            setTimeout(() => { this.state.markers.pop(), this.returnFromMapLocationSelection(); }, 400)
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
                    region={this.state.region}
                    onRegionChangeComplete={(region) => this.onRegionChange(region)}
                    onPress={(e) => this.showTempPin(e)}
                >
                    {this.state.markers && this.state.markers.map(marker => (
                        <Marker
                            key={marker._id}
                            coordinate={{
                                latitude: marker.coordinate.latitude,
                                longitude: marker.coordinate.longitude,
                            }}
                            title={marker.title}
                            description={marker.description}
                            pinColor={marker.pinColor}
                            onPress={() => this.openMarkerModal(marker)}
                        />
                    ))}
                </MapView>

                {this._renderSkatePinModal()}

                <Modal
                    backdropTransitionInTiming={3000}
                    backdropTransitionOutTiming={3000}
                    onBackdropPress={() => this.toggleModal()}
                    style={{ alignItems: 'center' }}
                    isVisible={this.state.isModalVisible}
                    onBackButtonPress={() => this.toggleModal()}
                >
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
                                    bgColor='orange'
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
                            <SkatePinCreationModalView
                                modalTitle="New skate spot"
                                modalDescription="Let others know about a good places to skate."
                                locationProvider={this.state.locationProvider}
                                onPressCurrentLocation={this.useCurrentLocation()}
                                useCurrentOrSelectedLocation={this.state.useCurrentOrSelectedLocation}
                                description={this.state.description}
                                onChangeText={(text) => { this.setState({ description: text }) }}
                                onPressSubmitPin={() => this.submitPin("Skate spot")}
                                onPressCancelPin={() => this.cancelCreatingSkatePin()}
                            />
                        }
                        {this.state.isHereToTeachVisible &&
                            <View>
                                {!this.state.showDateTimePicker ?
                                    <SkatePinCreationModalView
                                        modalTitle="Here to teach"
                                        modalDescription="Let others know where you are going to be and teach someone a new trick!"
                                        locationProvider={this.state.locationProvider}
                                        onPressCurrentLocation={() => this.useCurrentLocation()}
                                        onPressSelectedLocation={() => this.selectLocationOnMap()}
                                        useCurrentOrSelectedLocation={this.state.useCurrentOrSelectedLocation}
                                        description={this.state.description}
                                        onChangeText={(text) => { this.setState({ description: text }) }}
                                        onPressShowDatePicker={() => this.showDateOrTimePicker("Date", "Date")}
                                        skateDate={this.state.skateDate}
                                        onPressShowStartTimePicker={() => this.showDateOrTimePicker("Time", "startTime")}
                                        startTime={this.state.startTime}
                                        onPressShowEndTimePicker={() => this.showDateOrTimePicker("Time", "endTime")}
                                        endTime={this.state.endTime}
                                        onPressSubmitPin={() => this.submitPin("Here to teach")}
                                        onPressCancelPin={() => this.cancelCreatingSkatePin()}
                                    />
                                    :
                                    <View>
                                        {this._renderDateTimePicker()}
                                    </View>
                                }
                            </View>
                        }
                        {this.state.isGameOfSkateVisible &&
                            <View>
                                {!this.state.showDateTimePicker ?
                                    <SkatePinCreationModalView
                                        modalTitle="Game of S.K.A.T.E"
                                        modalDescription="Let people know you want to have a skate with them."
                                        locationProvider={this.state.locationProvider}
                                        onPressCurrentLocation={() => this.useCurrentLocation()}
                                        onPressSelectedLocation={() => this.selectLocationOnMap()}
                                        useCurrentOrSelectedLocation={this.state.useCurrentOrSelectedLocation}
                                        description={this.state.description}
                                        onChangeText={(text) => { this.setState({ description: text }) }}
                                        onPressShowDatePicker={() => this.showDateOrTimePicker("Date", "Date")}
                                        skateDate={this.state.skateDate}
                                        onPressShowStartTimePicker={() => this.showDateOrTimePicker("Time", "startTime")}
                                        startTime={this.state.startTime}
                                        onPressShowEndTimePicker={() => this.showDateOrTimePicker("Time", "endTime")}
                                        endTime={this.state.endTime}
                                        onPressSubmitPin={() => this.submitPin("Game of S.K.A.T.E")}
                                        onPressCancelPin={() => this.cancelCreatingSkatePin()}
                                    />
                                    :
                                    <View>
                                        {this._renderDateTimePicker()}
                                    </View>
                                }
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
                    {this.state.canTapMap &&
                        <TouchableOpacity onPress={() => this.returnFromMapLocationSelection()} >
                            <Text style={styles.gpsStatusStle}>Cancel</Text>
                        </TouchableOpacity>
                    }
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
        width: '80%'
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
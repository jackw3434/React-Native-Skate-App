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
import DateTimePicker from '@react-native-community/datetimepicker';
import SkatePinCreationModalView from '../../components/skatePinCreationModalView'

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
            markers: [
                {
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
                createdBy: "LOGGED IN USER GOES HERE",
                coordinate: {
                    latitude: '',
                    longitude: ''
                },
                photo: '',
                description: '',
                reviews: [],
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
                console.warn("Location Services Not Enabled", error.code, error.message);
                this.setState({ locationProvider: false })
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 10000
            }
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
            isGameOfSkateVisible: false,
            mapCoordinatesToUse:
            {
                latitide: '',
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

    modalCancelSkateSpot() {
        this.setState({
            useCurrentOrSelectedLocation: '',
            isNewSkateSpotVisible: false,
            isModalMenuVisible: true,
            mapCoordinatesToUse: {
                latitide: '',
                longitude: ''
            }
        })
    }

    modalCancelHereToTeach() {
        this.setState({
            isHereToTeachVisible: false,
            isModalMenuVisible: true,
            mapCoordinatesToUse: {
                latitide: '',
                longitude: ''
            },
            skateDate: '',
            startTime: '',
            endTime: '',
            description: '',
            useCurrentOrSelectedLocation: ''
        })
    }

    modalCancelGameOfSkate() {
        this.setState({
            isGameOfSkateVisible: false,
            isModalMenuVisible: true,
            mapCoordinatesToUse: {
                latitide: '',
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
                latitide: '',
                longitude: ''
            },
            description: '',
            skateDate: '',
            startTime: '',
            endTime: '',
            useCurrentOrSelectedLocation: ''
        })
    }

    submitSkateSpotPin() {

        let skateSpotPin = {
            title: 'Skate spot',
            createdBy: "User Who Found It Goes Here*",
            coordinate: {
                latitude: this.state.mapCoordinatesToUse.latitude,
                longitude: this.state.mapCoordinatesToUse.longitude
            },
            photo: 'Picture Required',
            description: this.state.description,
            reviews: ['Skate spot review here', "good spot"],
            pinColor: 'blue'
        }

        this.state.markers.push(skateSpotPin);
        this.clearAfterPinSubmission();
    }

    submitHereToTeachPin() {

        let hearToTeachPin = {
            title: 'Here to teach',
            createdBy: this.state.currentSkatePinModalData.createdBy,
            coordinate: {
                latitude: this.state.mapCoordinatesToUse.latitude,
                longitude: this.state.mapCoordinatesToUse.longitude
            },
            description: this.state.description,
            skateDate: this.state.skateDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            reviews: ["Good skate", "Friendly Guy"],
            pinColor: 'orange'
        };

        this.state.markers.push(hearToTeachPin);
        this.clearAfterPinSubmission();
    }

    submitGameOfSkatePin() {

        let gameOfSkatePin = {
            title: 'Game of S.K.A.T.E',
            createdBy: this.state.currentSkatePinModalData.createdBy,
            coordinate: {
                latitude: this.state.mapCoordinatesToUse.latitude,
                longitude: this.state.mapCoordinatesToUse.longitude
            },
            description: this.state.description,
            reviews: ["Had  Fun Game", "Almost Won!"],
            skateDate: this.state.skateDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            pinColor: 'red'
        }

        this.state.markers.push(gameOfSkatePin);
        this.clearAfterPinSubmission();
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
                <Modal
                    backdropTransitionInTiming={3000}
                    backdropTransitionOutTiming={3000}
                    onBackButtonPress={() => this.closeMarkerModal()}
                    onBackdropPress={() => this.closeMarkerModal()}
                    style={{ alignItems: 'center' }}
                    isVisible={this.state.isMarkerModalVisible}>
                    <View style={[styles.modalContainer, { width: '100%' }]}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, width: '100%' }}>
                            <Icon name='UserInCircleIcon' viewBox="20 0 250 250" height="30" width="30" fill='blue' />
                            <Text style={{fontSize:16}}>Found By: {createdBy}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 70, width: '25%', borderWidth: 0.5, justifyContent: "center" }}><Text>Skate Spot Image</Text></View>
                            <ScrollView style={{ height: 70, width: '75%', borderWidth: 0.5 }}>
                                <Text style={{ fontSize: 16, textAlign: 'left', marginLeft: 10, flex: 1, flexWrap: 'wrap' }}>
                                    {description}
                                </Text>
                            </ScrollView>
                        </View>
                        <Text style={{ paddingBottom: 5, paddingTop: 5 }}>Reviews:</Text>
                        <View style={{ height: 100, borderWidth: 0.5, borderRadius: 5 }}>
                            <ScrollView>
                                {reviews && reviews.map((review) => {
                                    return <Text style={{ paddingBottom: 5, paddingLeft: 2 }}>USER WHO LEFT REVIEW: {review}</Text>;
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
                    onBackButtonPress={() => this.closeMarkerModal()}
                    onBackdropPress={() => this.closeMarkerModal()}
                    style={{ alignItems: 'center' }}
                    isVisible={this.state.isMarkerModalVisible}>
                    <View style={[styles.modalContainer, { width: '100%' }]}>

                        <Text style={styles.modalTitle}>{title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='UserInCircleIcon' viewBox="20 0 250 250" height="30" width="30" fill='blue' />
                            <Text>{createdBy}</Text>
                        </View>
                        <Text>description:</Text>
                        <View style={{ width: '100%', paddingBottom: 5, height: 50 }}>
                            <Text style={{ fontSize: 16, textAlign: 'left', width: '100%' }}>{description}</Text>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='Calender' viewBox="0 -20 700 700" height="28" width="28" fill='blue' />
                            <Text>{skateDate}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='Clock' viewBox="-50 -50 1024 1024" height="28" width="28" fill='blue' />
                            <Text>{startTime} - {endTime}</Text>
                        </View>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline', paddingBottom: 5, paddingTop: 5 }}>Reviews:</Text>
                        <View style={{ height: 100, borderWidth: 0.5, borderRadius: 5 }}>
                            <ScrollView>
                                {reviews && reviews.map((review) => {
                                    return <Text style={{ paddingBottom: 5, paddingLeft: 2 }}>NAME GOES HERE: {review}</Text>;
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
                <View style={{ flex: Platform.OS == 'android' && 1 }}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={this.state.date}
                        mode={this.state.dateTimePickerMode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setDateTime}
                    />
                    {Platform.OS == 'ios' &&
                        <View>
                            <SkateButton buttonText="Confirm" onPress={() => this.confirmStartTime()} />
                            <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.cancelDateTime()} />
                        </View>
                    }

                </View>
            );
        } else if (this.state.startOrEndTime == "endTime") {
            return (
                <View style={{ flex: Platform.OS == 'android' && 1 }}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={this.state.date}
                        mode={this.state.dateTimePickerMode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setDateTime}
                    />
                    {Platform.OS == 'ios' &&
                        <View>
                            <SkateButton buttonText="Confirm" onPress={() => this.confirmEndTime()} />
                            <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.cancelDateTime()} />
                        </View>
                    }
                </View>
            );
        } else {
            return (
                <View style={{ flex: Platform.OS == 'android' && 1 }}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={this.state.date}
                        mode={this.state.dateTimePickerMode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setDateTime}
                    />
                    {Platform.OS == 'ios' &&
                        <View>
                            <SkateButton buttonText="Confirm" onPress={() => this.confirmSkateDate()} />
                            <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.cancelDateTime()} />
                        </View>
                    }
                </View>
            );
        }

    }

    onRegionChange(region) {
        this.setState({ region: region })
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
                    onPress={(e) => {
                        if (this.state.canTapMap === true) {
                            let coordinate = e.nativeEvent.coordinate;
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
                    }}
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
                    {this.state.markers && this.state.markers.map(marker => (
                        <Marker
                            key={marker.title}
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
                                {/* <Text style={styles.modalTitle}>New Skate Spot</Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                                    Let others know about a good places to skate.
                                </Text>
                                <Text style={{ color: 'blue' }}>Found By: Skater Andy</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Location: </Text>
                                    <TouchableOpacity onPress={() => this.useCurrentLocation()}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Use Current Location</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.state.mapCoordinatesToUse.latitude && this.state.mapCoordinatesToUse.longitude &&
                                    <View>
                                        <Text style={{ paddingTop: 10 }}>Latitude: {this.state.mapCoordinatesToUse.latitude}</Text>
                                        <Text>Longitude: {this.state.mapCoordinatesToUse.longitude}</Text>
                                    </View>
                                }
                                <Text style={{ paddingTop: 10, paddingBottom: 5 }}>Enter a description of the skate spot</Text>
                                <View style={{ height: 120, width: '100%', borderWidth: 2 }}></View>
                                <SkateButton style={{ marginTop: 10 }} buttonText="Submit" onPress={() => this.submitSkateSpotPin()} />
                                <SkateButton buttonText="Cancel" bgColor='red' onPress={() => this.modalCancelSkateSpot()} /> */}

                                <SkatePinCreationModalView
                                    modalTitle="New skate spot"
                                    modalDescription="Let others know about a good places to skate."
                                    onPressCurrentLocation={this.useCurrentLocation()}
                                    // onPressSelectedLocation={() => this.selectLocationOnMap()}
                                    useCurrentOrSelectedLocation={this.state.useCurrentOrSelectedLocation}
                                    description={this.state.description}
                                    onChangeText={(text) => { this.setState({ description: text }) }}
                                    //  onPressShowDatePicker={() => this.showDateOrTimePicker("Date", "Date")}
                                    //  skateDate={this.state.skateDate}
                                    //  onPressShowStartTimePicker={() => this.showDateOrTimePicker("Time", "startTime")}
                                    //  startTime={this.state.startTime}
                                    //  onPressShowEndTimePicker={() => this.showDateOrTimePicker("Time", "endTime")}
                                    //  endTime={this.state.endTime}
                                    onPressSubmitPin={() => this.submitSkateSpotPin()}
                                    onPressCancelPin={() => this.modalCancelSkateSpot()}
                                />
                            </View>
                        }
                        {this.state.isHereToTeachVisible &&
                            <View>
                                {!this.state.showDateTimePicker ?
                                    <SkatePinCreationModalView
                                        modalTitle="Here to teach"
                                        modalDescription="Let others know where you are going to be and teach someone a new trick!"
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
                                        onPressSubmitPin={() => this.submitHereToTeachPin()}
                                        onPressCancelPin={() => this.modalCancelHereToTeach()}
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
                                        onPressSubmitPin={() => this.submitGameOfSkatePin()}
                                        onPressCancelPin={() => this.modalCancelGameOfSkate()}
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
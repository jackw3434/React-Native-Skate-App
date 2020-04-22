import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AppContainer from '../containers/AppContainer'
import Icon from '../../Icon/Icon'
import Modal from "react-native-modal";
import SkateDateTimePicker from '../../components/skateDateTimePicker';
import SkatePinCreationModalView from '../../components/skatePinCreationModalView'
import { getAllSkatePins, deleteSkatePin, postSkatePin, reviewSkater, reviewSkateSpot } from '../../functions/skatePinFunctions'
import SkateMarkerModal from '../../components/skateMarkerModal'
import SkateModalMenu from '../../components/skateModalMenu'
import { openMap, createOpenLink } from 'react-native-open-maps';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class SkateMapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 50.3762, // Plymouth Uni - will need to get region from user 
                longitude: -4.1395,
                latitudeDelta: 0.1321,
                longitudeDelta: 0.1321,
            },
            date: new Date(),
            loggedInUserData: '',
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
            isLocationMissing: false,
            gpsStatus: "",
            showDateTimePicker: false,
            dateTimePickerMode: '',
            epochStartTime: "",
            epochEndTime: "",
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
            isSkateDateInvalid: false,
            startTime: '',
            endTime: '',
            markers: [],
            currentSkatePinModalData: {
                _id: '',
                createdBy: {
                    _id: '',
                    name: ''
                },
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
            },
            isPinSubmissionValid: '',
            hasComponentDidUpdateFired: false,
            reviewMessage: '',
            leaveReview: false,
            skateSpotImageData: ''
        };
    }

    getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                position => {
                    resolve(position);
                },
                (error) => {
                    reject(error);

                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
            );
        })
    }

    getData = async () => {
        try {
            let userObject = await AsyncStorage.getItem("userObject");
            return JSON.parse(userObject);
        } catch (e) {
            // error reading value           
        }
    }

    componentDidMount() {
        this.getData().then(userObject => {
            getAllSkatePins(userObject.accessToken).then((skatePins) => {
                this.setState({ markers: skatePins, loggedInUserData: userObject })
            });
        }) // will need to eventually check list of user pins to enable delete            
    };

    componentDidUpdate() {

        // causing infinite loop: does detect when gps is turned on or off by the user - causes map to update

        if (!this.state.currentLat) {
            Geolocation.getCurrentPosition(
                position => {
                    if (this.state.locationProvider) {
                        this.setState({
                            currentLat: position.coords.latitude,
                            currentLng: position.coords.longitude,

                        })
                    } else {
                        this.setState({
                            region: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                latitudeDelta: 0.1321,
                                longitudeDelta: 0.1321,
                            },
                            currentLat: position.coords.latitude,
                            currentLng: position.coords.longitude,
                            locationProvider: true,
                            gpsStatus: "GPS Status: enabled"
                        })
                    }
                },
                (error) => {
                    // calling setState on error creates complications

                    // if (this.state.locationProvider) {
                    //     return;
                    // } else {
                    //     this.setState({ locationProvider: false, gpsStatus: "GPS Status: disabled " + error.message })
                    // }
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
            );
        }
    }

    componentWillUnmount() {
        Geolocation.getCurrentPosition();
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
                latitude: '',
                longitude: ''
            },
            description: '',
            skateDate: '',
            startTime: '',
            endTime: '',
            isLocationMissing: false,
            isSkateDateInvalid: false,
            useCurrentOrSelectedLocation: ''
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
            isLocationMissing: false,
            isSkateDateInvalid: false,
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
            useCurrentOrSelectedLocation: '',
            epochStartTime: "",
            epochEndTime: "",
            skateSpotImageData: ''
        })
    }

    clearAfterPinSubmission() {
        this.setState({
            isLocationMissing: false,
            isSkateDateInvalid: false,
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
            useCurrentOrSelectedLocation: '',
            epochStartTime: "",
            epochEndTime: "",
            skateSpotImageData: ''
        })
    }

    submitPin(pinType) {

        let expiresIn;
        let localDate = new Date().toLocaleDateString();
        let dateNow = Date.parse(localDate) / 1000;
        let timeRightNow = new Date().getTime() / 1000;
        let begginningOfEventDay = Date.parse(this.state.skateDate) / 1000;
        let eventEndTime = this.state.epochEndTime / 1000;
        let dateToExpire = Date.now();

        if (begginningOfEventDay > dateNow) {
            let diff = begginningOfEventDay - dateNow;
            let timeUntilEventEnds = eventEndTime - timeRightNow;
            expiresIn = diff + timeUntilEventEnds;
        } else {
            // event is happening today!!           
            expiresIn = eventEndTime - timeRightNow;
        }

        dateToExpire += expiresIn * 1000;
        dateToExpire = new Date(dateToExpire)

        let pin;

        if (!this.state.mapCoordinatesToUse.latitude) {
            this.setState({ isLocationMissing: true })
        } else if (dateToExpire < new Date() && pinType !== "Skate spot") {
            this.setState({ isSkateDateInvalid: true })
        } else {
            if (pinType == "Here to teach") {
                pin = {
                    title: 'Here to teach',
                    createdBy: {
                        _id: this.state.loggedInUserData._id,
                        userName: this.state.loggedInUserData.userName,
                    },
                    coordinate: {
                        latitude: this.state.mapCoordinatesToUse.latitude,
                        longitude: this.state.mapCoordinatesToUse.longitude
                    },
                    photo: 'No Picture Yet',
                    description: this.state.description,
                    skateDate: this.state.skateDate,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    expireAt: dateToExpire,
                    reviews: this.state.loggedInUserData.reviews,
                    pinColor: 'orange'
                };
                postSkatePin(pin, this.state.loggedInUserData.accessToken).then(async response => {
                    getAllSkatePins(this.state.loggedInUserData.accessToken).then((skatePins) => {
                        this.setState({ markers: skatePins })
                        this.clearAfterPinSubmission();
                    })
                })
            }

            if (pinType == "Game of S.K.A.T.E") {
                pin = {
                    title: 'Game of S.K.A.T.E',
                    createdBy: {
                        _id: this.state.loggedInUserData._id,
                        userName: this.state.loggedInUserData.userName,
                    },
                    coordinate: {
                        latitude: this.state.mapCoordinatesToUse.latitude,
                        longitude: this.state.mapCoordinatesToUse.longitude
                    },
                    photo: 'No Picture Yet',
                    description: this.state.description,
                    reviews: this.state.loggedInUserData.reviews,
                    skateDate: this.state.skateDate,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    expireAt: dateToExpire,
                    pinColor: 'red'
                }
                postSkatePin(pin, this.state.loggedInUserData.accessToken).then(async response => {
                    getAllSkatePins(this.state.loggedInUserData.accessToken).then((skatePins) => {
                        this.setState({ markers: skatePins })
                        this.clearAfterPinSubmission();
                    })
                })
            }

            if (pinType == "Skate spot") {

                pin = {
                    title: 'Skate spot',
                    createdBy: {
                        _id: this.state.loggedInUserData._id,
                        userName: this.state.loggedInUserData.userName,
                    },
                    coordinate: {
                        latitude: this.state.mapCoordinatesToUse.latitude,
                        longitude: this.state.mapCoordinatesToUse.longitude
                    },
                    description: this.state.description,
                    reviews: [],
                    pinColor: 'blue'
                }

                postSkatePin(pin, this.state.loggedInUserData.accessToken).then(async response => {

                    let pinID = response.data.newSkatePin._id;
                    const url = 'https://skate-api.herokuapp.com';

                    await axios.post(url + '/api/skateSpotImage/' + pinID + '/upload',
                        this.state.skateSpotImageData,
                        {
                            headers: {
                                'Authorization': this.state.loggedInUserData.accessToken,
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {
                            getAllSkatePins(this.state.loggedInUserData.accessToken).then((skatePins) => {
                                this.setState({ markers: skatePins })
                                this.clearAfterPinSubmission();
                            })
                        })
                        .catch(function (error) {

                            if (error === "Error: Request failed with status code 409") {
                                return error.response;
                            }
                            if (error == "Error: Network Error") {
                                return error;
                            }
                            return error.response;
                        });
                })
            }
        }
    }

    openMarkerModal(marker) {

        let { _id, title, createdBy, coordinate, photo, description, reviews, startTime, endTime, pinColor, skateDate } = marker;

        this.setState({
            isMarkerModalVisible: true,
            currentSkatePinModalData: {
                _id: _id,
                title: title,
                createdBy: {
                    _id: createdBy._id,
                    userName: createdBy.userName
                },
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
        this.getCurrentPosition().then(position => {
            this.setState({
                isLocationMissing: false,
                useCurrentOrSelectedLocation: 'current',
                mapCoordinatesToUse: { latitude: position.coords.latitude, longitude: position.coords.longitude },
                locationProvider: true,
                gpsStatus: "GPS Status: enabled"
            })
        }).catch(error => {
            this.setState({ locationProvider: false, gpsStatus: "GPS Status: disabled " + error.message, currentLat: '', currentLng: '' })
        });
    }

    selectLocationOnMap() {
        this.setState({ isLocationMissing: false, useCurrentOrSelectedLocation: 'selected', isModalVisible: false, canTapMap: true })
    }

    returnFromMapLocationSelection() {
        this.setState({ isModalVisible: true, canTapMap: false })
    }

    deleteUsersPin(pinID) {
        deleteSkatePin(pinID, this.state.loggedInUserData.accessToken).then((response) => {
            this.closeMarkerModal()
            getAllSkatePins(this.state.loggedInUserData.accessToken).then((skatePins) => {
                this.setState({ markers: skatePins })
            });
        });
    }

    leaveReview() {
        this.setState({ leaveReview: !this.state.leaveReview, reviewMessage: "" })
    }

    setReviewMessage(message) {
        this.setState({ reviewMessage: message })
    }

    submitReview(pinID, title, createdBy) {

        let reviewObject = {
            reviewerName: this.state.loggedInUserData.userName,
            reviewMessage: this.state.reviewMessage
        }

        let addReview = this.state.currentSkatePinModalData.reviews.concat(reviewObject)

        if (title == "Skate spot") {
            reviewSkateSpot(pinID, this.state.reviewMessage).then(res => {
                getAllSkatePins(this.state.loggedInUserData.accessToken).then((skatePins) => {
                    this.setState({
                        markers: skatePins,
                        currentSkatePinModalData: {
                            _id: this.state.currentSkatePinModalData._id,
                            title: this.state.currentSkatePinModalData.title,
                            createdBy: {
                                _id: this.state.currentSkatePinModalData.createdBy._id,
                                userName: this.state.currentSkatePinModalData.createdBy.userName
                            },
                            coordinate: this.state.currentSkatePinModalData.coordinate,
                            photo: this.state.currentSkatePinModalData.photo,
                            description: this.state.currentSkatePinModalData.description,
                            reviews: addReview,
                            startTime: this.state.currentSkatePinModalData.startTime,
                            endTime: this.state.currentSkatePinModalData.endTime,
                            pinColor: this.state.currentSkatePinModalData.pinColor,
                            skateDate: this.state.currentSkatePinModalData.skateDate
                        }
                    })
                });
            })
        } else {
            reviewSkater(createdBy._id, pinID, this.state.reviewMessage).then(res => {
                getAllSkatePins(this.state.loggedInUserData.accessToken).then((skatePins) => {
                    this.setState({
                        markers: skatePins,
                        currentSkatePinModalData: {
                            _id: this.state.currentSkatePinModalData._id,
                            title: this.state.currentSkatePinModalData.title,
                            createdBy: {
                                _id: this.state.currentSkatePinModalData.createdBy._id,
                                userName: this.state.currentSkatePinModalData.createdBy.userName
                            },
                            coordinate: this.state.currentSkatePinModalData.coordinate,
                            photo: this.state.currentSkatePinModalData.photo,
                            description: this.state.currentSkatePinModalData.description,
                            reviews: addReview,
                            startTime: this.state.currentSkatePinModalData.startTime,
                            endTime: this.state.currentSkatePinModalData.endTime,
                            pinColor: this.state.currentSkatePinModalData.pinColor,
                            skateDate: this.state.currentSkatePinModalData.skateDate
                        }
                    })
                });
            })
        }
        this.leaveReview();
    }

    _renderSkatePinModal() {

        let travelType = 'walk';
        let lat, lng, start, end;

        let { _id, title, createdBy, coordinate, photo, description, reviews, startTime, endTime, pinColor, skateDate } = this.state.currentSkatePinModalData;

        if (this.state.currentLat && this.state.currentLng) {
            lat = this.state.currentLat;
            lng = this.state.currentLng;
            start = lat.toString().concat(",", lng.toString())
            end = coordinate.latitude.toString().concat(",", coordinate.longitude.toString())
        }

        if (title == "Skate spot") {
            return (
                <SkateMarkerModal
                    pinID={_id}
                    onDeletePress={() => this.deleteUsersPin(_id, this.state.loggedInUserData.accessToken)}
                    onBackButtonPress={() => this.closeMarkerModal()}
                    onBackdropPress={() => this.closeMarkerModal()}
                    isVisible={this.state.isMarkerModalVisible}
                    modalTitle={title}
                    createdBy={createdBy}
                    onUserNamePress={() => console.warn(createdBy._id)} // .id
                    photo={photo}
                    description={description}
                    onLeaveReview={() => this.leaveReview()}
                    leaveReview={this.state.leaveReview}
                    reviews={reviews}
                    reviewMessage={this.state.reviewMessage}
                    onReviewChange={(review) => this.setReviewMessage(review)}
                    onReviewSubmit={() => this.submitReview(_id, title, createdBy)}
                    coordinate={coordinate}
                    onDirectionsPress={createOpenLink({ travelType, start, end, zoom: 10 })}
                />
            );
        } else {
            return (
                <SkateMarkerModal
                    pinID={_id}
                    onDeletePress={() => this.deleteUsersPin(_id, this.state.loggedInUserData.accessToken)}
                    onBackButtonPress={() => this.closeMarkerModal()}
                    onBackdropPress={() => this.closeMarkerModal()}
                    isVisible={this.state.isMarkerModalVisible}
                    modalTitle={title}
                    createdBy={createdBy}
                    onUserNamePress={() => console.warn(createdBy._id)} // .id
                    description={description}
                    photo={photo}
                    skateDate={skateDate}
                    startTime={startTime}
                    endTime={endTime}
                    onLeaveReview={() => this.leaveReview()}
                    leaveReview={this.state.leaveReview}
                    reviews={reviews}// get the 
                    reviewMessage={this.state.reviewMessage}
                    onReviewChange={(review) => this.setReviewMessage(review)}
                    onReviewSubmit={() => this.submitReview(_id, title, createdBy)}
                    coordinate={coordinate}
                    onDirectionsPress={createOpenLink({ travelType, start, end, zoom: 10 })}
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
                    this.setState({ startTime: selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false, epochStartTime: utcSeconds })
                } else if (this.state.startOrEndTime == "endTime") {
                    this.setState({ endTime: selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false, epochEndTime: utcSeconds })
                } else if (this.state.startOrEndTime == "Date") {
                    this.setState({ skateDate: selectedDate, showDateTimePicker: false, date: new Date(), epochDate: utcSeconds })
                }
            }
            if (event.type == "dismissed") {
                this.cancelDateTime();
            }
        } else {
            // this.setState({ selectedDate: selectedDate, selectedTime: selectedTime, date: date })
            if (this.state.startOrEndTime == "startTime") {
                this.setState({ startTime: selectedTime, selectedTime: selectedTime, epochStartTime: utcSeconds, date: date })
            } else if (this.state.startOrEndTime == "endTime") {
                this.setState({ endTime: selectedTime, selectedTime: selectedTime, epochEndTime: utcSeconds, date: date })
            } else if (this.state.startOrEndTime == "Date") {
                this.setState({ selectedDate: selectedDate, date: date, epochDate: utcSeconds })
            }
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

        if (Platform.OS == 'ios' && this.state.selectedTime == "") {
            let selectedTime = new Date().toLocaleTimeString();
            this.setState({ startTime: selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false, epochStartTime: new Date().getTime() })
        } else {
            this.setState({ startTime: this.state.selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false })
        }
    }

    confirmEndTime() {

        if (Platform.OS == 'ios' && this.state.selectedTime == "") { // on change hasnt triggered for dateTimePicker            
            let selectedTime = new Date().toLocaleTimeString();
            this.setState({ endTime: selectedTime, selectedTime: "", date: new Date(), showDateTimePicker: false, epochEndTime: new Date().getTime() })
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
                iconViewBox="0 0 50 50"
                userData={this.state.loggedInUserData}>

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
                            description={marker.description && marker.description[0]}
                            pinColor={marker.pinColor}
                            onPress={() => this.openMarkerModal(marker)}
                        />
                    ))}
                </MapView>

                {this.state.isMarkerModalVisible && this._renderSkatePinModal()}

                <Modal
                    backdropTransitionInTiming={3000}
                    backdropTransitionOutTiming={3000}
                    onBackdropPress={() => this.toggleModal()}
                    style={{ alignItems: 'center', alignSelf: "center" }}
                    isVisible={this.state.isModalVisible}
                    onBackButtonPress={() => this.toggleModal()}
                >
                    <View style={styles.modalContainer}>
                        {this.state.isModalMenuVisible &&
                            <SkateModalMenu
                                onSkateSpotPress={() => this.openSkateSpotModal()}
                                onHereToTeachPress={() => this.openHereToTeachModal()}
                                onGameOfSkatePress={() => this.openGameOfSkateModal()}
                            />
                        }
                        {this.state.isNewSkateSpotVisible &&
                            <SkatePinCreationModalView
                                modalTitle="New skate spot"
                                modalDescription="Let others know about a good place to skate."
                                createdBy={this.state.loggedInUserData.userName}
                                locationProvider={this.state.locationProvider}
                                onPressCurrentLocation={this.useCurrentLocation()}
                                useCurrentOrSelectedLocation={this.state.useCurrentOrSelectedLocation}
                                skateSpotImage={(bodyFormData) => { console.warn("bodyFormData ", bodyFormData); this.setState({ skateSpotImageData: bodyFormData }) }}
                                description={this.state.description}
                                onChangePicker={(text) => {
                                    let joinDescription = []
                                    for (let index = 0; index < text.length; index++) {
                                        const element = text[index].value;
                                        joinDescription = joinDescription.concat(element);
                                    }
                                    this.setState({ description: joinDescription })
                                }}
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
                                        createdBy={this.state.loggedInUserData.userName}
                                        locationProvider={this.state.locationProvider}
                                        missingLocation={this.state.isLocationMissing}
                                        onPressCurrentLocation={() => this.useCurrentLocation()}
                                        onPressSelectedLocation={() => this.selectLocationOnMap()}
                                        useCurrentOrSelectedLocation={this.state.useCurrentOrSelectedLocation}
                                        description={this.state.description}
                                        onChangePicker={(text) => {
                                            let joinDescription = []
                                            for (let index = 0; index < text.length; index++) {
                                                const element = text[index].value;
                                                joinDescription = joinDescription.concat(element);
                                            }
                                            this.setState({ description: joinDescription })
                                        }}
                                        onPressShowDatePicker={() => this.showDateOrTimePicker("Date", "Date")}
                                        skateDate={this.state.skateDate}
                                        invalidDate={this.state.isSkateDateInvalid}
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
                                        createdBy={this.state.loggedInUserData.userName}
                                        locationProvider={this.state.locationProvider}
                                        missingLocation={this.state.isLocationMissing}
                                        onPressCurrentLocation={() => this.useCurrentLocation()}
                                        onPressSelectedLocation={() => this.selectLocationOnMap()}
                                        useCurrentOrSelectedLocation={this.state.useCurrentOrSelectedLocation}
                                        description={this.state.description}
                                        onChangeText={(text) => { this.setState({ description: text }) }}
                                        onPressShowDatePicker={() => this.showDateOrTimePicker("Date", "Date")}
                                        skateDate={this.state.skateDate}
                                        invalidDate={this.state.isSkateDateInvalid}
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
                    {this.state.gpsStatus != "" &&
                        <View>
                            <Text style={styles.gpsStatusStle}>{this.state.gpsStatus}</Text>
                        </View>
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
        textAlign: 'center',
        flexWrap: 'wrap',
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
    modalContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 30,
        padding: 30
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
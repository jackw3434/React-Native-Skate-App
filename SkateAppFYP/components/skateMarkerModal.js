import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { deleteSkatePin, reviewSkater, reviewSkateSpot } from '../functions/skatePinFunctions'
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import SkateButton from './skateButton'
import Icon from '../Icon/Icon';
import axios from 'axios';
//const url = 'https://localhost:7080';
const url = 'https://skate-api.herokuapp.com'; // only heroku url works for displaying images
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class SkateMarkerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skateSpotPicture:''
        };
    }

    getData = async () => {
        try {
            let userObject = await AsyncStorage.getItem("userObject");
            return JSON.parse(userObject);
        } catch (e) {
            // error reading value
            console.warn("e ", e)
        }
    } 

    componentDidMount() {

        this.getData().then(async userObject => {            
            await axios.get(url + '/api/image/' + this.props.photo, { headers: { Authorization: userObject.accessToken } })
                .then(response => {                 
                    this.setState({ skateSpotPicture: response.config.url })
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


    render() {      
        return (
            <Modal
                backdropTransitionInTiming={3000}
                backdropTransitionOutTiming={3000}
                onBackButtonPress={this.props.onBackButtonPress}
                onBackdropPress={this.props.onBackdropPress}
                style={{ alignItems: 'center' }}
                isVisible={this.props.isVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.centerRow}>
                        <Text style={styles.modalTitle}>{this.props.modalTitle}</Text>
                        <TouchableOpacity onPress={this.props.onDeletePress}>
                            <Icon name='Bin' viewBox="-30 -30 570 570" height="37" width="37" fill='blue' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userNameContainer}>
                        <Icon name='UserInCircleIcon' viewBox="0 0 250 250" height="30" width="30" fill='blue' />
                        <TouchableOpacity onPress={this.props.onUserNamePress}>
                            {this.props.modalTitle == "Skate spot" ?
                                <Text style={{ fontSize: 14 }}>Found By: {this.props.createdBy.userName}</Text>
                                :
                                <Text style={{ fontSize: 14, paddingLeft: 3 }}>{this.props.createdBy.userName}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    {this.props.modalTitle !== "Game of S.K.A.T.E" &&
                        <View>
                            <Text style={styles.descriptionText}>Description:</Text>
                            <View style={styles.descriptionAndPhotoContainer}>
                                {this.props.photo !== "" && this.props.modalTitle === "Skate spot" &&
                                    <View style={styles.photoContainer}>
                                        {/* <Text>{this.props.photo}</Text> */}
                                        <View style={{ alignSelf: 'center', paddingHorizontal:5 }}>
                                        <Image source={{ uri: this.state.skateSpotPicture.toString() }} style={styles.picture} />
                                    </View>
                                    </View>
                                }
                                <View style={styles.descriptionContainer}>
                                    <ScrollView
                                        ref={ref => { this.scrollview = ref }}
                                        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
                                        {this.props.description.map((descriptor, index) => {
                                            return (
                                                <View style={{ alignItems: 'center', padding: 5 }}>
                                                    <Text style={{
                                                        borderWidth: 1,
                                                        borderColor: 'blue',
                                                        borderRadius: 10,
                                                        padding: 4,
                                                        color: 'blue'
                                                    }}
                                                        key={index}>
                                                        {descriptor}
                                                    </Text>
                                                </View>
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    }
                    {this.props.modalTitle !== "Skate spot" &&
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingTop: 10, paddingBottom: 5 }}>
                                <Icon name='Calender' viewBox="0 -20 700 700" height="28" width="28" fill='blue' />
                                <Text>{this.props.skateDate}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
                                <Icon name='Clock' viewBox="-50 -50 1024 1024" height="28" width="28" fill='blue' />
                                <Text>{this.props.startTime} - {this.props.endTime}</Text>
                            </View>
                        </View>
                    }
                    <View style={styles.reviewHeaderRow}>
                        <Text style={{ color: 'blue', padding: 5, }}>{!this.props.leaveReview ? "Reviews:" : "Your review:"}</Text>
                        <TouchableOpacity onPress={this.props.onLeaveReview} style={styles.leaveAReviewButton}>
                            <Text style={{ color: 'blue' }}>{!this.props.leaveReview ? "Leave a review" : "cancel"}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        height: 100,
                        borderWidth: this.props.leaveReview ? 1 : 0.5,
                        borderRadius: 5,
                        paddingLeft: 5,
                        borderColor: this.props.leaveReview ? "blue" : "black"
                    }}>
                        {this.props.leaveReview ?
                            <View>
                                <ScrollView >
                                    <TextInput
                                        maxLength={120}
                                        placeholder={"Enter your review here"}
                                        multiline={true}
                                        style={styles.reviewTextInput}
                                        onChangeText={(review) => this.props.onReviewChange(review)}
                                    >
                                        {this.props.reviewMessage}
                                    </TextInput>
                                </ScrollView>
                                <TouchableOpacity
                                    onPress={this.props.onReviewSubmit}
                                    style={styles.submitReviewButton}
                                >
                                    <Text style={{ color: 'blue' }}>Submit review</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <ScrollView style={{ marginTop: 5 }}>
                                {this.props.reviews && this.props.reviews.slice(0).reverse().map((review, i) => {
                                    return (
                                        <View key={i} style={{ paddingBottom: 5, paddingLeft: 2, flexDirection: 'column' }}>
                                            <Text style={{ color: 'blue' }}>{review.reviewerName}: </Text>
                                            <Text >{review.reviewMessage}</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        }
                    </View>
                    <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                        <SkateButton
                            buttonText="Get Directions"
                            iconName="MapIcon"
                            viewBox="0 0 30 30"
                            iconStyle={styles.skateButtonIcon}
                            onPress={this.props.onDirectionsPress}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 30,
        padding: 30,
        width: screenWidth-50
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 28,
        borderBottomWidth: 0.5,
        width: '90%',
    },
    skateButtonIcon: {
        position: 'absolute',
        left: 10,
        top: 10
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,      
    },
    descriptionContainer: {         
   
        fontSize: 16,
        textAlign: 'left',
        flex: 1,
        flexWrap: 'wrap',
       // width:"70%"
    },
    descriptionText: {
        color: 'blue',
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 5
    },
    photoContainer: {        
    },
    descriptionAndPhotoContainer: {
        flexDirection: 'row',
        alignItems:'center',     
        height: screenHeight/9,
        borderWidth: 0.5,
        borderRadius: 5,        
        flexDirection: 'row'
    },
    reviewHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        paddingTop: 5
    },
    leaveAReviewButton: {
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: 'blue',
        padding: 5
    },
    reviewTextInput: {
        height: 100,
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 5,
        textAlignVertical: 'top'
    },
    submitReviewButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'blue',
        padding: 5,
        backgroundColor: "white"
    },
    picture: {   
       
        height: screenHeight/10,
        width: screenHeight/10,
        borderRadius: 10,
        zIndex: 1
    },
});
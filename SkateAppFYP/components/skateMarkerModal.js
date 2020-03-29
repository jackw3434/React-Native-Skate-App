import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import SkateButton from './skateButton'
import Icon from '../Icon/Icon';

export default class SkateMarkerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                    <Text style={styles.modalTitle}>{this.props.modalTitle}</Text>
                    <View style={styles.userNameContainer}>
                        <Icon name='UserInCircleIcon' viewBox="20 0 250 250" height="30" width="30" fill='blue' />
                        <TouchableOpacity onPress={this.props.onUserNamePress}>
                            {this.props.modalTitle == "Skate spot" ?
                                <Text style={{fontSize:14}}>Found By: {this.props.createdBy}</Text>
                                :
                                <Text style={{fontSize:14}}>{this.props.createdBy}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'blue', paddingTop: 5, paddingLeft: 5, paddingBottom:5 }}>Description:</Text>
                    <View style={styles.descriptionAndPhotoContainer}>
                        {this.props.photo &&
                            <View style={styles.photoContainer}>
                                <Text>{this.props.photo}</Text>
                            </View>
                        }
                        <ScrollView>
                            <Text style={styles.descriptionContainer}>
                                {this.props.description}
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingTop:15, paddingBottom:5 }}>
                        <Icon name='Calender' viewBox="0 -20 700 700" height="28" width="28" fill='blue' />
                        <Text>{this.props.skateDate}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
                        <Icon name='Clock' viewBox="-50 -50 1024 1024" height="28" width="28" fill='blue' />
                        <Text>{this.props.startTime} - {this.props.endTime}</Text>
                    </View>
                    <Text style={{ color: 'blue', padding: 5 }}>Reviews:</Text>
                    <View style={{ height: 100, borderWidth: 0.5, borderRadius: 5, paddingLeft: 5 }}>
                        <ScrollView>
                            {this.props.reviews && this.props.reviews.map((review,i) => {
                                return (
                                    <View key={i} style={{ paddingBottom: 5, paddingLeft: 2, flexDirection: 'column' }}>
                                        <Text style={{ color: 'blue' }}>{review.reviewerName}: </Text>
                                        <Text>{review.reviewMessage}</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
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
        width: '100%'
    },
    modalTitle: {
        fontSize: 28,
        borderBottomWidth: 0.5,
        width: '80%',
    },
    skateButtonIcon: {
        position: 'absolute',
        left: 10,
        top: 10
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5
    },
    descriptionContainer: {
        paddingLeft: 5,       
        paddingRight: 8,     
        fontSize: 16,
        textAlign: 'left',
        flex: 1,
        flexWrap: 'wrap',
    },
    photoContainer: {     
        width: '25%',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingLeft: 5,
        paddingTop: 3,
        paddingRight: 2,
        paddingBottom: 2      
    },
    descriptionAndPhotoContainer: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        height: 100,
        borderWidth: 0.5,
        borderRadius: 5,
        paddingLeft: 5,
        flexDirection: 'row'
    }
});
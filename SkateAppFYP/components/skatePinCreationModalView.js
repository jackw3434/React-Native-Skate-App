import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';
import SkateButton from './skateButton'

export default class SkatePinCreationModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // PROPS

    // modalTitle
    // modalDescription
    // description
    // onPressCurrentLocation
    // onPressSelectedLocation
    // useCurrentOrSelectedLocation
    // onChangeText
    // onPressShowDatePicker
    // skateDate
    // onPressShowStartTimePicker
    // startTime
    // onPressShowEndTimePicker
    // endTime
    // onPressSubmitPin
    // onPressCancelPin   
    // locationProvider

    render() {
        return (
            <View>
                <Text style={styles.modalTitle}>{this.props.modalTitle}</Text>
                <Text style={styles.modalDescription}>{this.props.modalDescription}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='UserInCircleIcon' viewBox="20 0 250 250" height="30" width="30" fill='blue' />
                    <Text>You: USERNAME GOES HERE</Text>
                </View>

                <View style={{ flexDirection: 'row', paddingTop: 5, alignItems: 'center' }}>
                    <Icon name='Pin' viewBox={Platform.OS == 'ios' ? "5 0 250 250" : "0 0 25 25"} height="25" width="25" fill='blue' />
                    <Text style={{ paddingLeft: 5 }}>Location: </Text>
                    <TouchableOpacity onPress={this.props.onPressCurrentLocation}>
                        <Text
                            style={
                                this.props.useCurrentOrSelectedLocation == 'current' ?
                                    styles.highlightedLocationOption
                                    :
                                    { color: 'blue' }
                            }
                        >
                            {this.props.locationProvider ? "Use current" : "GPS disabled"}
                        </Text>
                    </TouchableOpacity>
                    {this.props.onPressSelectedLocation &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text> or </Text>
                            <TouchableOpacity onPress={this.props.onPressSelectedLocation}>
                                <Text style={this.props.useCurrentOrSelectedLocation == 'selected' ? styles.highlightedLocationOption : { color: 'blue' }}>select a location</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                {this.props.onPressSelectedLocation ?
                    <View>
                        <Text style={{ paddingTop: 15, paddingBottom: 5, paddingLeft: 5 }}>Enter a description of your intentions:</Text>
                        <View style={{ paddingLeft: 5, height: 120, width: '100%', borderWidth: 0.5, borderRadius: 10, borderColor: 'blue', marginBottom: 10 }}>
                            <TextInput multiline={true} style={{ flex: 1, paddingLeft: 5, paddingTop: 10, paddingBottom: 10, paddingRight: 5 }} onChangeText={this.props.onChangeText}>{this.props.description}</TextInput>
                        </View>
                        {this.props.onPressSelectedLocation &&
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={{ paddingBottom: 10 }}>Select the date and time you will be there:</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='Calender' viewBox="0 -20 700 700" height="28" width="28" fill='blue' />
                                    <TouchableOpacity style={{ paddingBottom: 5 }} onPress={this.props.onPressShowDatePicker}>
                                        <Text style={{ color: 'blue' }}>
                                            Select date:
                                {this.props.skateDate &&
                                                <Text style={{ paddingLeft: 15 }}>{this.props.skateDate}</Text>
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='Clock' viewBox="-50 -130 1024 1024" height="28" width="28" fill='blue' />
                                    <TouchableOpacity style={{ paddingBottom: 5 }} onPress={this.props.onPressShowStartTimePicker}>
                                        <Text style={{ color: 'blue' }}>
                                            Select start time:
                        {this.props.startTime &&
                                                <Text>{this.props.startTime}</Text>
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='Clock' viewBox="-50 -130 1024 1024" height="28" width="28" fill='blue' />
                                    <TouchableOpacity style={{ paddingBottom: 5 }} onPress={this.props.onPressShowEndTimePicker}>
                                        <Text style={{ color: 'blue' }}>
                                            Select end time:
                        {this.props.endTime &&
                                                <Text>{this.props.endTime}</Text>
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                    :
                    <View>
                        <Text style={{ paddingTop: 15, paddingBottom: 5, paddingLeft: 5 }}>Enter a description of the skate spot you have found and want to share:</Text>
                        <View style={{ paddingLeft: 5, height: 120, width: '100%', borderWidth: 0.5, borderRadius: 10, borderColor: 'blue', marginBottom: 10 }}>
                            <TextInput multiline={true} style={{ flex: 1, paddingLeft: 5, paddingTop: 10, paddingBottom: 10, paddingRight: 5 }} onChangeText={this.props.onChangeText}>{this.props.description}</TextInput>
                        </View>
                    </View>
                }
                <SkateButton buttonText="Submit" onPress={this.props.onPressSubmitPin} />
                <SkateButton buttonText="Cancel" bgColor='red' onPress={this.props.onPressCancelPin} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 28,
        borderBottomWidth: 0.5,
        width: '80%'
    },
    modalDescription: {
        fontSize: 16,
        textAlign: 'left',
        paddingTop: 10,
        paddingBottom: 10
    },
    highlightedLocationOption: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        padding: 2,
        color: 'blue'
    }
});
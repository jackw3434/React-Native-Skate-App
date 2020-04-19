import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';
import SkateButton from './skateButton'
import RNPickerSelect from 'react-native-picker-select';

export default class SkatePinCreationModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptor:[]
        };
    }

    setDescriptor(descriptor) {
     let array =  this.state.descriptor;
     array.push(descriptor)
        this.setState({ descriptor: array })       
    };

    render() {
        return (
            <View>
                <Text style={styles.modalTitle}>{this.props.modalTitle}</Text>
                <Text style={styles.modalDescription}>{this.props.modalDescription}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='UserInCircleIcon' viewBox="20 0 250 250" height="30" width="30" fill='blue' />
                    <Text>You: {this.props.createdBy}</Text>
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
                {this.props.missingLocation &&
                    <View><Text style={{ color: 'red', textAlign: 'center', paddingTop: 10, fontWeight: 'bold' }}>Please select a location to use.</Text></View>
                }

                {/* // needs reworking 
                    //here to teach? display list of tricks and a wy to select them
                    // game of skate? dont show anything here              
                */}
                {this.props.onPressSelectedLocation ?
                    <View>
                        {this.props.modalTitle == "Here to teach" ?
                            <View>
                                <Text style={{ paddingTop: 15, paddingBottom: 5, paddingLeft: 5 }}>What are you going to teach?</Text>
                                <Text>display drop down list of tricks here</Text>
                                <View style={{ paddingLeft: 5, height: 80, width: '100%', borderWidth: 0.5, borderRadius: 10, borderColor: 'blue', marginBottom: 10 }}>
                                    {/* <TextInput multiline={true} style={{ flex: 1, paddingLeft: 5, paddingTop: 10, paddingBottom: 10, paddingRight: 5 }} onChangeText={this.props.onChangeText}>{this.props.description}</TextInput> */}
                                    <Text>display list of tricks to teach here</Text>
                                </View>
                            </View>
                            :
                            <View style={{ paddingBottom: 20 }}></View>
                        }
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
                                {this.props.invalidDate &&
                                    <View><Text style={{ color: 'red', textAlign: 'center', paddingTop: 10, fontWeight: 'bold' }}>Cannot set pin for in the past.</Text></View>
                                }
                            </View>
                        }

                        {/* // needs reworking  */}
                    </View>






                    :
                    <View>
                        <Text style={{ paddingTop: 15, paddingBottom: 5, paddingLeft: 5 }}>Select descriptions of the skate spot you have found and want to share:</Text>
                        <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>                            
                            <RNPickerSelect
                                placeholder={{
                                    label:  "select descriptor",
                                    value:  "select descriptor"
                                }}
                                useNativeAndroidPickerStyle={false}
                                placeholderTextColor="blue"
                                value={{
                                    label:  this.state.descriptor ? this.state.descriptor :"select descriptor",
                                    value:  this.state.descriptor ? this.state.descriptor :"select descriptor"
                                }}
                                textInputProps={{
                                    fontSize: 16,
                                    borderWidth: 1,
                                    borderColor: 'blue',
                                    borderRadius: 10,
                                    padding: 5,
                                    marginLeft: 5,
                                    paddingRight: Platform.OS == 'android' ? 30 : 0,
                                    width: "100%"
                                }}
                                onValueChange={(descriptor) => {
                                    if (descriptor != this.state.descriptor) {
                                        this.setDescriptor(descriptor)
                                    }
                                }}
                                items={[
                                    { label: "street", value: "street" },
                                    { label: "plaza", value: "plaza" },
                                    { label: "ramp", value: "ramp" },
                                    { label: "flat", value: "flat" },
                                    { label: "smooth", value: "smooth" },
                                    { label: "rough", value: "rough" },
                                    { label: "large", value: "large" },
                                    { label: "medium", value: "small" },
                                    { label: "small", value: "small" },
                                    { label: "busy", value: "busy" },
                                    { label: "quiet", value: "quiet" },
                                    { label: "flat-bank", value: "flat-bank" },
                                    { label: "ledge", value: "ledge" },
                                    { label: "stair set", value: "stair set" },
                                    { label: "rail", value: "rail" },
                                    { label: "transitions", value: "transitions" },
                                    { label: "concrete", value: "concrete" },
                                    { label: "metal", value: "metal" },
                                    { label: "wood", value: "wood" },                                   
                                ]}
                            />
                        </View>
                        <View style={{ paddingLeft: 5, height: 80, width: '100%', borderWidth: 0.5, borderRadius: 10, borderColor: 'blue', marginBottom: 10 }}>
                                <Text>{this.state.descriptor}</Text>
                            {/* <TextInput multiline={true} style={{ flex: 1, paddingLeft: 5, paddingTop: 10, paddingBottom: 10, paddingRight: 5 }} onChangeText={this.props.onChangeText}>{this.props.description}</TextInput> */}
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
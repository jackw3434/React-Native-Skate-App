import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import Icon from '../Icon/Icon';
import SkateButton from './skateButton'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
const screenHeight = Math.round(Dimensions.get('window').height);
//const url = 'https://localhost:7080';
const url = 'https://skate-api.herokuapp.com'; // only heroku url works for displaying images

export default class SkatePinCreationModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectectedItems: [],
            isShownPicker: false,
            achievedTricks: '',
            skateSpotPicture: ''
        };
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
            this.setState({
                achievedTricks: userObject.achievedTricks,
            })
        })
    }

    chooseImage() {

        const options = {
            title: 'Take a picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };        

        // Launch Camera:
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            } else {

                let bodyFormData = new FormData()

                bodyFormData.append('file', {
                    uri: response.uri,
                    type: response.type,
                    name: response.uri
                })

                this.props.skateSpotImage(bodyFormData)
                this.setState({ skateSpotPicture: "data:image/jpeg;base64," + response.data });
                // return bodyFormData to map screen for pin submission
            }
        });
    }

    render() {
        return (
            <View>
                <Text style={styles.modalTitle}>{this.props.modalTitle}</Text>
                <Text style={styles.modalDescription}>{this.props.modalDescription}</Text>
                {!this.state.isShownPicker &&
                    <View>
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
                        {this.props.modalTitle === "New skate spot" &&

                            <View style={styles.uploadAvatar}>
                                {!this.state.skateSpotPicture || this.state.skateSpotPicture == "" ?
                                    <TouchableOpacity onPress={() => this.chooseImage()}>
                                        <Icon name='AddCamera' viewBox="-450 -450 1400 1400" height='130' width='130' style={{ alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                    :
                                    <View style={{ height: "100%", width: "110%" }}>
                                        <View style={{ alignSelf: 'center', paddingRight: "9%" }}>
                                            <Image source={{ uri: this.state.skateSpotPicture.toString() }} style={styles.picture} />
                                        </View>
                                        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                            <TouchableOpacity style={styles.touchPencial} onPress={() => this.chooseImage()}>
                                                <Icon name='Pencil' viewBox="-200 -200 900 900" height='40' width='40' fill="rgb(0, 0, 153)" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </View>
                        }
                    </View>
                }
                {!this.props.missingPhoto && this.props.modalTitle === "New skate spot" &&
                    <View><Text style={{ color: 'red', paddingLeft: 5, paddingTop: 10, fontWeight: 'bold' }}>Please take a photo.</Text></View>
                }
                {this.props.missingLocation &&
                    <View><Text style={{ color: 'red', textAlign: 'center', paddingTop: 10, fontWeight: 'bold' }}>Please select a location to use.</Text></View>
                }
                {this.props.onPressSelectedLocation ?
                    <View>
                        {this.props.modalTitle == "Here to teach" ?
                            <View>
                                <Text style={{ paddingTop: 10, paddingBottom: 5, paddingLeft: 5 }}>What are you going to teach?</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ isShownPicker: !this.state.isShownPicker })
                                    }}
                                    style={{
                                        alignSelf: 'flex-start',
                                        borderWidth: 1,
                                        borderColor: 'blue',
                                        borderRadius: 30,
                                        color: 'white',
                                        backgroundColor: 'rgba(0,0,255,0.9)',
                                        alignItems: 'flex-start',
                                        padding: 1
                                    }}>
                                    <Text style={{
                                        padding: 7,
                                        color: 'white'
                                    }}>{!this.state.isShownPicker ? "Open picker" : "Close picker"}</Text>
                                </TouchableOpacity>
                                {this.props.invalidDescription &&
                                    <View><Text style={{ color: 'red', textAlign: 'center', paddingTop: 10, fontWeight: 'bold' }}>Must select at least 1 descriptor.</Text></View>
                                }
                                <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
                                    {this.state.isShownPicker ? <MultipleSelectPicker
                                        items={this.state.achievedTricks.map(trick => {
                                            return (
                                                { label: trick, value: trick }
                                            )
                                        })}
                                        style={{ height: 150 }}
                                        onSelectionsChange={(ele) => { this.setState({ selectectedItems: ele }), this.props.onChangePicker(ele) }}
                                        selectedItems={this.state.selectectedItems}
                                        checkboxStyle={{ height: 20, width: 20 }}
                                    />
                                        : null
                                    }
                                </View>
                                <View style={{ paddingLeft: 5, height: 80, width: '100%', borderWidth: 0.5, borderRadius: 10, borderColor: 'blue', marginBottom: 10, paddingVertical: 5 }}>
                                    <ScrollView
                                        ref={ref => { this.scrollview = ref }}
                                        onContentSizeChange={() => this.scrollview.scrollToEnd({ animated: true })}
                                        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', }}>
                                        {this.props.description.length > 0 && this.props.description.map((item, index) => {
                                            return (
                                                <View style={{ alignItems: 'center', padding: 5 }}>
                                                    <Text style={{
                                                        borderWidth: 1,
                                                        borderColor: 'blue',
                                                        borderRadius: 10,
                                                        padding: 7,
                                                        color: 'blue'
                                                    }}
                                                        key={index}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            )
                                        })}
                                    </ScrollView>
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
                                    <View><Text style={{ color: 'red', textAlign: 'center', paddingTop: 10, fontWeight: 'bold' }}>Invalid date or time.</Text></View>
                                }
                            </View>
                        }
                    </View>
                    :
                    <View>
                        <Text style={{ paddingTop: 25, paddingBottom: 5, paddingLeft: 5 }}>Select descriptions of the skate spot you have found and want to share:</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ isShownPicker: !this.state.isShownPicker })
                            }}
                            style={{
                                alignSelf: 'flex-start',
                                borderWidth: 1,
                                borderColor: 'blue',
                                borderRadius: 30,
                                color: 'white',
                                backgroundColor: 'rgba(0,0,255,0.9)',
                                alignItems: 'flex-start',
                                padding: 1
                            }}>
                            <Text style={{
                                padding: 7,
                                color: 'white',
                            }}>{!this.state.isShownPicker ? "Open picker" : "Close picker"}</Text>
                        </TouchableOpacity>
                        {this.props.invalidDescription &&
                            <View><Text style={{ color: 'red', textAlign: 'center', paddingTop: 10, fontWeight: 'bold' }}>Must select at least 1 descriptor.</Text></View>
                        }
                        <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
                            {this.state.isShownPicker ? <MultipleSelectPicker
                                items={[
                                    { label: "street", value: "street" },
                                    { label: "plaza", value: "plaza" },
                                    { label: "park", value: "park" },
                                    { label: "quater pipe", value: "quater pipe" },
                                    { label: "bowl", value: "bowl" },
                                    { label: "snake run", value: "snake run" },
                                    { label: "half pipe", value: "half pipe" },
                                    { label: "ramp", value: "ramp" },
                                    { label: "flat", value: "flat" },
                                    { label: "smooth", value: "smooth" },
                                    { label: "rough", value: "rough" },
                                    { label: "large", value: "large" },
                                    { label: "medium", value: "medium" },
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
                                    { label: "wood", value: "wood" }
                                ]}
                                style={{ height: 200 }}
                                onSelectionsChange={(ele) => { this.setState({ selectectedItems: ele }), this.props.onChangePicker(ele) }}
                                selectedItems={this.state.selectectedItems}
                                checkboxStyle={{ height: 20, width: 20 }}
                            />
                                : null
                            }
                        </View>
                        <View style={{ paddingLeft: 5, height: 80, width: '100%', borderWidth: 0.5, borderRadius: 10, borderColor: 'blue', marginBottom: 10, paddingVertical: 5 }}>
                            <ScrollView
                                ref={ref => { this.scrollview = ref }}
                                onContentSizeChange={() => this.scrollview.scrollToEnd({ animated: true })}
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', }}>
                                {this.state.selectectedItems.map((item, index) => {
                                    return (
                                        <View style={{ alignItems: 'center', padding: 5 }}>
                                            <Text style={{
                                                borderWidth: 1,
                                                borderColor: 'blue',
                                                borderRadius: 10,
                                                padding: 7,
                                                color: 'blue'
                                            }}
                                                key={index}>
                                                {item.label}
                                            </Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                }
                {!this.state.isShownPicker &&
                    <View>
                        <SkateButton buttonText="Submit" onPress={this.props.onPressSubmitPin} />
                        <SkateButton buttonText="Cancel" bgColor='red' onPress={this.props.onPressCancelPin} />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 28,
        borderBottomWidth: 0.5,
        width: '80%',
        borderBottomColor: 'grey'
    },
    modalDescription: {
        fontSize: 16,
        textAlign: 'left',
        paddingTop: 10,
        paddingBottom: 5
    },
    highlightedLocationOption: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        padding: 3,
        color: 'blue'
    },
    uploadAvatar: {
        height: screenHeight / 10,
        width: screenHeight / 10,
        backgroundColor: 'rgba(211,211,211,0.7)',
        borderRadius: screenHeight / 10,
        borderColor: 'blue',
        borderWidth: 2,
        justifyContent: 'center',
        zIndex: 100,
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 10,
        //top:10,
        bottom: -15

    },
    picture: {
        height: screenHeight / 10.4,
        width: screenHeight / 10.5,
        borderRadius: screenHeight / 10,
        zIndex: 1
    },
    touchPencial: {
        zIndex: 2,
        height: screenHeight / 24,
        width: screenHeight / 24,
        borderRadius: screenHeight / 24,
        borderWidth: 2,
        borderColor: 'blue',
        backgroundColor: 'rgba(211,211,211,1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
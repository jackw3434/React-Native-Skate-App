import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import AppContainer from '../containers/AppContainer';
import ImagePicker from 'react-native-image-picker';
import SkateTextInput from '../../components/skateTextInput'
import SkateTrickList from '../../components/skateTrickList'
import Icon from '../../Icon/Icon'

const screenHeight = Math.round(Dimensions.get('window').height);

export default class UserProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: ''
        };
    }

    goBack() {
        this.props.navigation.goBack()
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    componentDidMount() {

    }

    chooseImage() {


        const options = {
            title: 'Select Avatar',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            // console.warn('Response = ', response);

            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            } else {
                //const source = { uri: response.uri };

                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.warn('setState source = ');
                this.setState({
                    avatarSource: source
                });
            }
        });


        // // Launch Camera:
        // ImagePicker.launchCamera(options, (response) => {
        //     // Same code as in above section!
        // });

        // // Open Image Library:
        // ImagePicker.launchImageLibrary(options, (response) => {
        //     // Same code as in above section!
        // });
    }

    render() {

        let { _id, userName, userEmail, reviews } = this.props.route.params;

        return (
            <AppContainer passNav={this.props} isNested={true} scrollView={true} pageTitle={userName + "'s profile"}>

                <View style={styles.pageContainer}>

                    <View style={styles.topSection}>
                        <View style={styles.uploadAvatar}>
                            {this.state.avatarSource == "" ?
                                <TouchableOpacity onPress={() => this.chooseImage()}>
                                    <Icon name='AddCamera' viewBox="-200 -200 900 900" height='130' width='130' style={{ alignSelf: 'center' }} />
                                </TouchableOpacity>
                                :
                                <View style={{ height: "100%", width: "110%" }}>
                                    <View style={{ alignSelf: 'center', paddingRight: "9%" }}>
                                        <Image source={this.state.avatarSource} style={styles.picture} />
                                    </View>
                                    <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                        <TouchableOpacity style={styles.touchPencial} onPress={() => this.chooseImage()}>
                                            <Icon name='Pencil' viewBox="0 0 450 500" height='40' width='40' fill="rgb(0, 0, 153)" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 38 }}>{userName}</Text>
                        </View>
                    </View>

                    <View style={styles.middleSection}>
                        <View>
                            <Text style={styles.profileLables}>Skate Stance: <Text style={{ color: "black" }}>Regular</Text></Text>
                            <Text style={styles.profileLables}>Age: <Text style={{ color: "black" }}>25</Text></Text>
                            <Text style={styles.profileLables}>Style of Skating: <Text style={{ color: "black" }}> Street, Ramps, Park, Oldschool, Flatland</Text></Text>
                            <Text style={styles.profileLables}>Reason for using this app: <Text style={{ color: "black" }}>Learn to skate, teach others to skate, make friends with other skaters</Text></Text>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 20 }}>
                            <Text style={styles.profileLables}>Reviews:</Text>
                            <ScrollView style={{ height: screenHeight / 5, borderRadius: 30, borderWidth: 0.5 }}>
                                {reviews && reviews.map((review, i) => {
                                    return (
                                        <View key={i} style={{ padding: 10 }}>
                                            <Text style={{ color: 'blue', paddingBottom: 2 }}>{review.reviewerName}: </Text>
                                            <Text>{review.reviewMessage}</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.bottomSection}>
                       <SkateTrickList/>

                    </View>
                </View>

            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,     
        paddingHorizontal: 30,
        paddingBottom: 10,
    },
    topSection: {
        flex: 1,     
        alignItems: 'center',
        borderBottomWidth: 0.5,
        marginBottom: 20
    },
    profileLables: {
        fontSize: 18,
        color: "blue",
        paddingBottom: 5
    },
    middleSection: {
        flex: 1,     
        borderBottomWidth: 0.5,
        marginBottom: 20
    },
    bottomSection: {      
         height:screenHeight-300,       
    },
    container: {
        paddingHorizontal: 15,
        width: '100%',
        height: '100%'
    },  
    uploadAvatar: {
        height: screenHeight / 5,
        width: screenHeight / 5,
        backgroundColor: 'rgba(211,211,211,0.7)',
        borderRadius: screenHeight / 5,
        borderColor: 'blue',
        borderWidth: 2,
        justifyContent: 'center',
        zIndex: 100
    },
    picture: {
        height: screenHeight / 5.1,
        width: screenHeight / 5.1,
        borderRadius: screenHeight / 5.1,
        zIndex: 1       
    },
    touchPencial: {
        zIndex: 2,
        height: screenHeight / 12,
        width: screenHeight / 12,
        borderRadius: screenHeight / 12,
        borderWidth: 2,
        borderColor: 'blue',
        backgroundColor: 'rgba(211,211,211,1)',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

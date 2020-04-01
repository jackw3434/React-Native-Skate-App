import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions, Image } from 'react-native';
import AppContainer from '../containers/AppContainer';
import ImagePicker from 'react-native-image-picker';
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
        console.warn(_id, userName, userEmail, reviews)
        return (
            <AppContainer passNav={this.props} isNested={true} scrollView={true} pageTitle={userName + "'s profile"}>

                <View style={styles.pageContainer}>
                    <View style={styles.topSection}>
                        <TouchableOpacity style={{ paddingVertical: 20 }} onPress={() => this.chooseImage()}>
                            <View style={styles.uploadAvatar}>
                                {this.state.avatarSource == "" ?
                                    <Icon name='AddCamera' viewBox="-200 -150 900 900" height='100' width='100' style={{ alignSelf: 'center' }} />
                                    :
                                    <Image source={this.state.avatarSource} style={styles.picture} />
                                }
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>{userName}</Text>
                    </View>

                    <View style={styles.middleSection}>


                        <Text>ID: {_id}</Text>
                        <Text>Name: {userName}</Text>
                        <Text>Email: {userEmail}</Text>
                        <Text>Reviews:</Text>

                        {reviews && reviews.map((review, i) => {
                            return (
                                <View key={i} style={{ paddingLeft: 10 }}>
                                    <Text style={{ color: 'blue' }}>({review.reviewerID}) {review.reviewerName}: </Text>
                                    <Text>{review.reviewMessage}</Text>
                                </View>
                            )
                        })}
                    </View>



                    <View style={styles.bottomSection}>

                    </View>
                </View>






            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        height: screenHeight,
        paddingHorizontal: 30,
        paddingBottom: 10,

    },
    topSection: {
        alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    middleSection: {
        height: '40%',
        // justifyContent: 'space-evenly',
        //  backgroundColor: 'blue'
    },
    bottomSection: {
        height: '50%',
        justifyContent: 'center',
        backgroundColor: 'green'
    },


    container: {
        paddingHorizontal: 15,
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        //paddingTop: '10%'
    },
    goBack: {
        color: 'blue',
        paddingTop: '5%',
        paddingHorizontal: 15,
    },
    uploadAvatar: {
        height: screenHeight / 5,
        width: screenHeight / 5,
        backgroundColor: 'rgba(211,211,211,0.7)',
        borderRadius: screenHeight / 5,
        borderColor: 'blue',
        borderWidth: 2,
        justifyContent: 'center',
    },
    picture: {
        height: screenHeight / 5,
        width: screenHeight / 5,
        borderRadius: screenHeight / 5
    }
});
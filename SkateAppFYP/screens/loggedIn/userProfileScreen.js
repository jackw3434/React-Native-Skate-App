import React from 'react';
import { StyleSheet, ScrollView, View, Text, Picker, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import AppContainer from '../containers/AppContainer';
import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import SkateTrickList from '../../components/skateTrickList'
import Icon from '../../Icon/Icon'
import AsyncStorage from '@react-native-community/async-storage';
import { editMe } from '../../functions/userAccessFunctions'
const screenHeight = Math.round(Dimensions.get('window').height);

export default class UserProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            userName: '',
            userEmail: '',
            reviews: [],
            profilePicture: '',
            skateStance: "",
            age: "",
            skateStyles: "",
            reasonsForAppUsage: '',
            skateIQ: '',
            achievedTricks: []
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

    goBack() {
        this.props.navigation.goBack()
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

     componentDidMount() {
         this.getData().then( userObject => {
           // console.warn(userObject.profilePicture)
             this.setState({
                _id: userObject._id,
                userName: userObject.userName,
                region: userObject.region,
                userEmail: userObject.userEmail,
                reviews: userObject.reviews,
                profilePicture: userObject.profilePicture,
                skateStance: userObject.skateStance,
                age: userObject.age,
                styleOfSkating: userObject.styleOfSkating,
                reasonsForUsingTheApp: userObject.reasonsForUsingTheApp,
                skateIQ: userObject.skateIQ,
                achievedTricks: userObject.achievedTricks,
                accessToken: userObject.accessToken
            })
        })
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
               // const source = { uri: "data:image/jpeg;base64," + response.data };
                //let string ='data:image/jpeg;base64,' + response.data ;
                console.warn('setState source 1 ');
                editMe(this.state._id, { profilePicture: response.data }, this.state.accessToken).then(res => {
                    // console.warn("userprofile edit res", res)
                    console.warn('setState source 2 ');
                    this.setState({ profilePicture: response.data });
                })

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

    setSkateStance(stance) {
        this.setState({ skateStance: stance })
    };

    //Street, Ramps, Park, Oldschool, Flatland// Learn to skate, teach others to skate, make friends with other skaters
    render() {
        //console.warn(this.state.profilePicture)
        let skateStanceoptions = [
            { label: "Unsure", value: "Unsure" },
            { label: "Reguler - (Left foot at the front)", value: "Regular" },
            { label: "Goofy - (Right foot at the front)", value: "Goofy" },
            { label: "Mongo - (Left foot at the back)", value: "Mongo" },
            { label: "Goofy Mongo - (right foot at the back)", value: "Goofy Mongo" },
        ]

        let { _id, userName, userEmail, reviews, profilePicture, skateStance, age, region, styleOfSkating, reasonsForUsingTheApp, achievedTricks } = this.state;
        let skateIQ = achievedTricks.length

        return (
            <AppContainer passNav={this.props} isNested={true} scrollView={true} pageTitle={userName + "'s profile"}>

                <View style={styles.pageContainer}>

                    <View style={styles.topSection}>
                        <View style={styles.uploadAvatar}>
                            {!profilePicture || profilePicture == "" ?
                                <TouchableOpacity onPress={() => this.chooseImage()}>
                                    <Icon name='AddCamera' viewBox="-200 -200 900 900" height='130' width='130' style={{ alignSelf: 'center' }} />
                                </TouchableOpacity>
                                :
                                <View style={{ height: "100%", width: "110%" }}>
                                    <View style={{ alignSelf: 'center', paddingRight: "9%" }}>
                                        <Image source={{uri: "data:image/jpeg;base64," +profilePicture.toString()}} style={styles.picture} />
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
                            <Text style={{ fontSize: 24 }}>{userName}</Text>
                        </View>
                    </View>

                    <View style={styles.middleSection}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.profileLables}>Skate Stance: <Text style={{ color: "black" }}>{skateStance}</Text></Text>
                            <RNPickerSelect
                                placeholder={{ label: "select stance", value: "select stance" }}
                                useNativeAndroidPickerStyle={false}
                                placeholderTextColor="black"

                                textInputProps={{ fontSize: 18, backgroundColor: 'yellow' }}
                                onValueChange={(value) => console.log(value)}
                                items={skateStanceoptions}
                            />
                        </View>


                        <Text style={styles.profileLables}>Region: <Text style={{ color: "black" }}>{region}</Text></Text>
                        <Text style={styles.profileLables}>Age: <Text style={{ color: "black" }}>{age}</Text></Text>
                        <Text style={styles.profileLables}>Style of Skating: <Text style={{ color: "black" }}>{styleOfSkating}</Text></Text>
                        <Text style={styles.profileLables}>Reason for using this app: <Text style={{ color: "black" }}>{reasonsForUsingTheApp}</Text></Text>

                        <Text style={styles.profileLables}>Your reviews:</Text>
                        <View style={{ minHeight: screenHeight / 5, maxHeight: screenHeight / 5, borderRadius: 30, borderWidth: 0.5, marginTop: 10 }}>

                            <ScrollView nestedScrollEnabled={true}>
                                {reviews.length == 0 ?
                                    <Text style={{ fontSize: 22, textAlign: 'center', paddingTop: 20 }}>No Reviews yet.</Text>
                                    :
                                    reviews.map((review, i) => {
                                        return (
                                            <View key={i} style={{ paddingLeft: 20, paddingVertical: 6 }}>
                                                <Text style={{ color: 'blue', paddingBottom: 0 }}>{review.reviewerName}: </Text>
                                                <Text>{review.reviewMessage}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>

                    </View>

                    <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='Brain' viewBox="0 0 60 60" height="60" width="60" fill='black' />
                            <Text style={{ fontSize: 28, paddingLeft: 10 }}>Your Skate IQ:</Text>
                        </View>
                        <Text style={{ fontSize: 54 }}>{skateIQ}</Text>
                        <View style={{ borderBottomWidth: 0.5, width: "20%" }} />
                    </View>
                    <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='Book' viewBox="0 0 60 60" height="60" width="60" fill='black' />
                            <Text style={{ fontSize: 28, paddingLeft: 10 }}>Your Tricks:</Text>
                        </View>

                        <Text style={{ textAlign: 'center', width: "75%", paddingTop: 5 }}>Your skate IQ is calculated at 1 point for each trick you can do.</Text>

                    </View>

                    <View style={styles.bottomSection}>


                        <SkateTrickList usersAchievedtricks={achievedTricks} />

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
        paddingBottom: 30,
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
        paddingBottom: 20,
        marginBottom: 20
    },
    bottomSection: {
        maxHeight: screenHeight - 300,
        padding: 15,
        borderRadius: 30,
        borderWidth: 0.5,
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

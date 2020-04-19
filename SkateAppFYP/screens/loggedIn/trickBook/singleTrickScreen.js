import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Switch } from 'react-native';
import AppContainer from '../../containers/AppContainer';
import YoutubePlayer from 'react-native-youtube-iframe';
import { editMe } from '../../../functions/userAccessFunctions';
import AsyncStorage from '@react-native-community/async-storage';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const side = screenWidth / 10;
const youtubeSize = screenWidth - side;

export default class SingleTrickScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            _id: '',
            userName: '',
            userEmail: '',
            reviews: [],
            profilePicture: '',
            skateStance: "",
            age: "",
            styleOfSkating: [],
            reasonsForUsingTheApp: [],
            skateIQ: '',
            achievedTricks: [],
            accessToken: ""
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
        this.getData().then(userObject => {
            this.setState({
                _id: userObject._id,
                userName: userObject.userName,
                region: userObject.region,
                userEmail: userObject.userEmail,
                reviews: userObject.reviews,
                profilePicture: userObject.profilePicture,
                skateStance: userObject.skateStance,
                age: userObject.age,
                achievedTricks: userObject.achievedTricks,
                accessToken: userObject.accessToken
            })
        })
    }

    componentDidUpdate() {

        let trick = this.props.route.params;
        let found = this.state.achievedTricks.find(data => data === trick.name)

        if (found && !this.state.isEnabled) {
            this.setState({ isEnabled: true })
        }
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    toggleSwitch(learned, trickName) {

        let newAchievedTricks;

        if (learned) {
            newAchievedTricks = this.state.achievedTricks.concat(trickName)
        } else {
            newAchievedTricks = this.state.achievedTricks.filter(e => e !== trickName)
        }

        this.setState({ isEnabled: learned, achievedTricks: newAchievedTricks });

        editMe({ achievedTricks: trickName, learned: learned }).then(res => {

            let userObject = {
                _id: this.state._id,
                profilePicture: this.state.profilePicture,
                userName: this.state.userName,
                userEmail: this.state.userEmail,
                reviews: this.state.reviews,
                skateStance: this.state.skateStance,
                age: this.state.age,
                achievedTricks: this.state.achievedTricks,
                accessToken: this.state.accessToken
            }

            try {
                AsyncStorage.setItem("userObject", JSON.stringify(userObject))
            } catch (e) {
                console.warn("saving error: ", e)
            }
        })
    };

    render() {

        let trick = this.props.route.params;

        return (
            <AppContainer passNav={this.props} isNested={true} scrollView={true} pageTitle={trick.name}>
                <View style={{ paddingHorizontal: 30 }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
                        <Text>Tricked learned:</Text>
                        <Switch
                            trackColor={{ false: "grey", true: "green" }}
                            thumbColor={this.state.isEnabled ? "white" : "light-grey"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => this.toggleSwitch(value, trick.name)}
                            value={this.state.isEnabled}
                        />
                    </View>
                    <Text style={{ fontSize: 24 }}>Video</Text>
                    <View style={{ height: 220, alignItems: 'center' }}>
                        <YoutubePlayer
                            height={500}
                            width={youtubeSize}
                            videoId={trick.videoUrl}
                            style={{ backgroundColor: 'red' }}
                            onChangeState={event => console.log(event)}
                            onReady={() => console.log("ready")}
                            onError={e => console.log(e)}
                            onPlaybackQualityChange={q => console.log(q)}
                            volume={50}
                            playbackRate={1}
                            playerParams={{
                                preventFullScreen: false,
                                cc_lang_pref: "us",
                                showClosedCaptions: true
                            }}
                        />
                    </View>
                    <Text style={{ fontSize: 24, paddingBottom: 5 }}>How to {trick.name}</Text>
                    <View style={{ paddingBottom: 10 }}>
                        {!trick.description[0].stepTitle || !trick.description[0].stepDescription ?
                            <Text style={{ fontSize: 18 }}>No description yet.</Text>
                            :
                            trick.description.map((descriptions, i) => {
                                return (
                                    <View key={i}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 5 }}>Step: {descriptions.stepTitle}</Text>
                                        <Text style={{ paddingBottom: 15 }}>{descriptions.stepDescription}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
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
        color: 'blue'
    }
});
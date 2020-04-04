import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import AppContainer from '../../containers/AppContainer';
import YoutubePlayer from 'react-native-youtube-iframe';

export default class SingleTrickScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navTo(route) {
        this.props.navigation.navigate(route)
    }

    render() {

        let trick = this.props.route.params;

        return (
            <AppContainer passNav={this.props} isNested={true} scrollView={true} pageTitle={trick.name}>
                <Text>Description: {trick.description}</Text>
                <Text>Video URL: {trick.videoUrl}</Text>

                <YoutubePlayer
                   // ref={playerRef}
                    height={300}
                    width={400}
                    videoId={trick.videoUrl}
                   // play={playing}
                    onChangeState={event => console.log(event)}
                    onReady={() => console.log("ready")}
                    onError={e => console.log(e)}
                    onPlaybackQualityChange={q => console.log(q)}
                    volume={50}
                    playbackRate={1}
                    playerParams={{
                        preventFullScreen: true,
                        cc_lang_pref: "us",
                        showClosedCaptions: true
                    }}
                />
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
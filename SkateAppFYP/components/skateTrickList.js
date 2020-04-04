import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import Icon from '../Icon/Icon';

const Tricks = [
    {
        name: "Ollie",
        description: "Ollie description",
        videoUrl: "_cmXDVZrKZU"
    },
    {
        name: "Frontside 180",
        description: "Frontside 180 description",
        videoUrl: "OqYb98vp0zI"
    },
    {
        name: "Backside 180",
        description: "Backside 180 description",
        videoUrl: "5RtkYzx3TdE"
    },
    {
        name: "Pop Shove It",
        description: "Pop Shove It description",
        videoUrl: "tyXwyN_t"
    },
    {
        name: "Frontside Pop Shove It",
        description: "Frontside Pop Shove It description",
        videoUrl: "rbpllQ2bGAE"
    },
    {
        name: "Heelflip",
        description: "Heelflip description",
        videoUrl: "phsJk5_jHkU"
    },
    {
        name: "Kickflip",
        description: "Kickflip description",
        videoUrl: "YOf0XeI7KzU"
    },
    {
        name: "Varial Kickflip",
        description: "Varial Kickflip description",
        videoUrl: "q0FxPQp2wHk"
    },
    {
        name: "Hardflip",
        description: "Hardflip description",
        videoUrl: "hZlSr6SQvds"
    },
    {
        name: "Varial Heelflip",
        description: "Varial Heelflip description",
        videoUrl: "ter2CbfTe4E"
    },
    {
        name: "Inward Heelflip",
        description: "Inward Heelflip description",
        videoUrl: "0SmsV8Xb7fA"
    },
    {
        name: "Backside 180 Kickflip",
        description: "Backside 180 Kickflip description",
        videoUrl: "T0VUCWLYg9E"
    },
    {
        name: "Frontside 180 kickflip",
        description: "Frontside 180 kickflip description",
        videoUrl: "_YCXMS2_O6w"
    },
    {
        name: "Backside 180 Heelflip",
        description: "Backside 180 Heelflip description",
        videoUrl: "qLX_ekRgfdw"
    },
    {
        name: "Frontside 180 Heelflip",
        description: "Frontside 180 Heelflip description",
        videoUrl: "aN0jbylT3IY"
    },
    {
        name: "360 Pop Shove It",
        description: "360 Pop Shove It description",
        videoUrl: "tapZBLs4xI0"
    },
    {
        name: "Backside Big Spin",
        description: "Backside Big Spin description",
        videoUrl: "MsPPeoeukoU"
    },
    {
        name: "Frontside Big Spin",
        description: "Frontside Big Spin description",
        videoUrl: "pksJFJQnLHA"
    },
    {
        name: "360 Flip",
        description: "360 Flip description",
        videoUrl: "PnuobIzTPMs"
    },
    {
        name: "Ollie Impossible",
        description: "Ollie Impossible description",
        videoUrl: "a_1Hz88lpY8"
    },
    {
        name: "Laser Flip",
        description: "Laser Flip description",
        videoUrl: "B991k5v-cvE"
    },
    {
        name: "Casper Flip",
        description: "Casper Flip description",
        videoUrl: "x4O6bDFlKHw"
    },
    {
        name: "Backside Big Spin Kickflip",
        description: "Backside Big Spin Kickflip description",
        videoUrl: "TuzfkgxbOeQ"
    }
]

export default class SkateTrickList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    navTo(route, params) {
        if (this.props.passNav) {
            this.props.passNav.navigation.navigate(route, params)
        }
    }

    render() {
        return (
            <ScrollView nestedScrollEnabled={true} >
                {this.props.trickBook ?
                    Tricks.map((trick, i) => {
                        return (
                            <TouchableOpacity key={i} style={styles.trickContainer} onPress={() => this.navTo("SingleTrick", trick)}>
                                <Text style={styles.skateText}>{trick.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                    :
                    [
                        (this.props.usersAchievedtricks.length == 0 ?
                            <Text key="head over" style={{ fontSize: 22, textAlign: 'center' }}>Head over to the trick book to learn some new tricks.</Text>
                            :
                            this.props.usersAchievedtricks.map((trick, i) => {
                                return (
                                    <TouchableOpacity key={i} style={styles.trickContainer} onPress={() => this.navTo("SingleTrick", trick)}>
                                        <Text style={styles.skateText}>{trick}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        )
                    ]
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    skateText: {
        fontSize: 32
    },

    trickContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 2,
        margin: 5,
        borderColor: 'rgba(0,0,255,0.9)',
        maxHeight: 100,
        minHeight: 100,
        minWidth: '80%'
    }
});
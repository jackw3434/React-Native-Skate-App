import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import Icon from '../Icon/Icon';

const Tricks = [
    {
        name: "Ollie",
        description: "Ollie description",
        videoUrl: "Ollie youtube url"
    },
    {
        name: "Frontside 180",
        description: "Frontside 180 description",
        videoUrl: "Frontside 180 youtube url"
    },
    {
        name: "Backside 180",
        description: "Backside 180 description",
        videoUrl: "Backside 180 youtube url"
    },
    {
        name: "Pop Shove It",
        description: "Pop Shove It description",
        videoUrl: "Pop Shove It youtube url"
    },
    {
        name: "Frontside Pop Shove It",
        description: "Frontside Pop Shove It description",
        videoUrl: "Frontside Pop Shove It youtube url"
    },
    {
        name: "Heelflip",
        description: "Heelflip description",
        videoUrl: "Heelflip youtube url"
    },
    {
        name: "Kickflip",
        description: "Kickflip description",
        videoUrl: "Kickflip youtube url"
    },
    {
        name: "Varial Kickflip",
        description: "Varial Kickflip description",
        videoUrl: "Varial Kickflip youtube url"
    },
    {
        name: "Hardflip",
        description: "Hardflip description",
        videoUrl: "Hardflip youtube url"
    },
    {
        name: "Varial Heelflip",
        description: "Varial Heelflip description",
        videoUrl: "Varial Heelflip youtube url"
    },
    {
        name: "Inward Heelflip",
        description: "Inward Heelflip description",
        videoUrl: "Inward Heelflip youtube url"
    },
    {
        name: "Backside 180 Kickflip",
        description: "Backside 180 Kickflip description",
        videoUrl: "Backside 180 Kickflip youtube url"
    },
    {
        name: "Frontside 180 kickflip",
        description: "Frontside 180 kickflip description",
        videoUrl: "Frontside 180 kickflip youtube url"
    },
    {
        name: "Backside 180 Heelflip",
        description: "Backside 180 Heelflip description",
        videoUrl: "Backside 180 Heelflip youtube url"
    },
    {
        name: "Frontside 180 Heelflip",
        description: "Frontside 180 Heelflip description",
        videoUrl: "Frontside 180 Heelflip youtube url"
    },
    {
        name: "360 Pop Shove It",
        description: "360 Pop Shove It description",
        videoUrl: "360 Pop Shove It youtube url"
    },
    {
        name: "Backside Big Spin",
        description: "Backside Big Spin description",
        videoUrl: "Backside Big Spin youtube url"
    },
    {
        name: "Frontside Big Spin",
        description: "Frontside Big Spin description",
        videoUrl: "Frontside Big Spin youtube url"
    },
    {
        name: "360 Flip",
        description: "360 Flip description",
        videoUrl: "360 Flip youtube url"
    },
    {
        name: "Ollie Impossible",
        description: "Ollie Impossible description",
        videoUrl: "Ollie Impossible youtube url"
    },
    {
        name: "Laser Flip",
        description: "Laser Flip description",
        videoUrl: "OLaser Flipllie youtube url"
    },
    {
        name: "Casper Flip",
        description: "Casper Flip description",
        videoUrl: "Casper Flip youtube url"
    },
    {
        name: "Backside Big Spin Kickflip",
        description: "Backside Big Spin Kickflip description",
        videoUrl: "Backside Big Spin Kickflip youtube url"
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
                            <Text style={{ fontSize: 22, textAlign: 'center' }}>Head over to the trick book to learn some new tricks.</Text>
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
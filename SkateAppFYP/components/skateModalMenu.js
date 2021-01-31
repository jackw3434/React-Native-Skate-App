import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SkateButton from './skateButton'

export default class SkateModalMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let learnSomeTricks = false;
     
        if (this.props.achievedTricks.length == 0) {
     
            learnSomeTricks = true;
        }
        return (
            <View>
                <Text style={styles.modalTitle}>Create a Pin</Text>
                <Text style={{ fontSize: 16, textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
                    Meet others who skate, teach others to skate,
                    play a game of S.K.A.T.E or let others know about a cool skate spot.
            </Text>
                <SkateButton
                    buttonText="New Skate Spot"                 
                    iconName="Pin"
                    viewBox="0 0 30 30"
                    iconStyle={styles.skateButtonIcon}
                    fill='white'
                    onPress={this.props.onSkateSpotPress}
                />
                <SkateButton
                    buttonText="Here To Teach"
                    learnSomeTricks={learnSomeTricks}
                    bgColor='orange'
                    iconName="Pin"
                    viewBox="0 0 30 30"
                    iconStyle={styles.skateButtonIcon}
                    fill='white'
                    onPress={this.props.onHereToTeachPress}
                />
                <SkateButton
                    buttonText="Game of S.K.A.T.E"                 
                    bgColor='red'
                    iconName="Pin"
                    viewBox="0 0 30 30"
                    iconStyle={styles.skateButtonIcon}
                    fill='white'
                    onPress={this.props.onGameOfSkatePress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    skateButtonIcon: {
        position: 'absolute',
        left: 10,
        top: 10
    },
    modalTitle: {
        fontSize: 28,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
    },
});
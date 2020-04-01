import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import AppContainer from '../containers/AppContainer';

export default class UserProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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

    render() {       
        let { _id, userName, userEmail, reviews } = this.props.route.params;
        return (
            <AppContainer passNav={this.props} isNested={true} scrollView={true} pageTitle="User Profile">
                <View style={{ paddingLeft: 10 }}>
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

                    <Text>{reviews.reviewerID}</Text>
                    <Text>{reviews.reviewerName}</Text>
                    <Text>{reviews.reviewMessage}</Text>
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
        color: 'blue',
        paddingTop: '5%',
        paddingHorizontal: 15,
    }
});
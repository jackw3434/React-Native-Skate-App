import React from 'react';
import SkateButton from './skateButton'
import { StyleSheet, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class SkateDateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }  

    render() {       
        return (
            <View>
                <DateTimePicker               
                    testID="dateTimePicker"
                    value={this.props.value}
                    mode={this.props.mode}
                    is24Hour={true}
                    display="spinner"
                    onChange={this.props.onChange}
                />
                {Platform.OS == 'ios' &&
                    <View>
                        <SkateButton buttonText="Confirm" onPress={this.props.confirm} />
                        <SkateButton buttonText="Cancel" bgColor='red' onPress={this.props.cancel} />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
   
});
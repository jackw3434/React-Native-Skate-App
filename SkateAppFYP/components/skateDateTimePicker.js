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
            <View style={{ flex: Platform.OS == 'android' && 1 }}>
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={this.props.value}
                    mode={this.props.mode}
                    is24Hour={true}
                    display="default"
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
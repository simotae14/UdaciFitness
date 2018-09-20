import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default class Live extends Component {
    state = {
        coords: null,
        status: null,
        direction: ''
    }

    render () {
        const { coords, status, direction } = this.state;

        // loading
        if (status === null) {
            return <ActivityIndicator style={{marginTop: 30}}/>;
        }

        // denied
        if (status === 'denied') {
            return (
                <View>
                    <Text>Denied</Text>
                </View>
            );
        }

        // problems
        if (status === 'undetermined') {
            return (
                <View>
                    <Text>undetermined</Text>
                </View>
            )
        }

        // if it's all ok
        return (
            <View>
                <Text>Live</Text>
                <Text>{ JSON.stringify(this.state) }</Text>
            </View>
        );
    }
}
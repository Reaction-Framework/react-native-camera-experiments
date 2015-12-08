'use strict';

import React, { AppRegistry, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Camera from 'react-native-camera';

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
    },
    flipButton: {
        width: 40,
        height: 40,
        margin: 10,
        alignSelf: 'flex-start'
    },
    captureButton: {
        width: 40,
        height: 40,
        margin: 10,
        alignSelf: 'flex-end'
    }
});

export default React.createClass({
    getInitialState() {
        return {
            cameraType: Camera.constants.Type.back
        }
    },
    render() {
        return (
            <Camera ref="cam"
                    style={styles.container}
                    type={this.state.cameraType}>
                <TouchableHighlight onPress={this.flipCamera}>
                    <Image style={styles.flipButton}
                           source={require('image!flip')}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.takePicture}>
                    <Image style={styles.captureButton}
                           source={require('image!capture')}/>
                </TouchableHighlight>
            </Camera>
        );
    },
    flipCamera() {
        var state = this.state;
        state.cameraType = state.cameraType === Camera.constants.Type.back
            ? Camera.constants.Type.front : Camera.constants.Type.back;
        this.setState(state);
    },
    takePicture() {
        this.refs.cam.capture(function(err, data) {
            console.log(err, data);
        });
    }
});

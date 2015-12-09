'use strict';

import React, { AppRegistry, StyleSheet, Image, TouchableHighlight, Text } from 'react-native';
import Camera from 'react-native-camera';

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#000000'
    },
    aspect: {
        height: 40,
        margin: 10,
        color: '#ffffff',
        alignSelf: 'center'
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
            cameraType: Camera.constants.Type.back,
            aspect: Camera.constants.Aspect.fill,
            aspectText: 'Fill'
        }
    },
    render() {
        return (
            <Camera ref="cam"
                    style={styles.container}
                    type={this.state.cameraType}
                    aspect={this.state.aspect}>
                <TouchableHighlight onPress={this.flipCamera}>
                    <Image style={styles.flipButton}
                           source={require('image!flip')}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.changeAspect}>
                    <Text style={styles.aspect}>
                        {this.state.aspectText}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.takePicture}>
                    <Image style={styles.captureButton}
                           source={require('image!capture')}/>
                </TouchableHighlight>
            </Camera>
        );
    },
    changeAspect() {
        var state = this.state;

        switch (state.aspect) {
            case Camera.constants.Aspect.fill:
                state.aspect = Camera.constants.Aspect.fit;
                state.aspectText = 'Fit';
                break;
            case Camera.constants.Aspect.fit:
                state.aspect = Camera.constants.Aspect.stretch;
                state.aspectText = 'Stretch';
                break;
            case Camera.constants.Aspect.stretch:
                state.aspect = Camera.constants.Aspect.fill;
                state.aspectText = 'Fill';
                break;
        }

        this.setState(state);
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

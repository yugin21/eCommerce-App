import React, { Component } from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';

const loadBG = require('../assets/mobile.png')

const Loading = () => (
    <ImageBackground source={loadBG} style={{
        flex: 1, justifyContent: 'flex-end',
        alignItems: 'center', paddingBottom: 43,
    }}>
        <ActivityIndicator size='large' color='#fff' />
    </ImageBackground>
)

export default Loading;
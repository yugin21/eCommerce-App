import React, { Component } from 'react'
import {
    StyleSheet, Text, View, TouchableWithoutFeedback, StatusBar, TextInput, SafeAreaView,
    Keyboard, TouchableOpacity, KeyboardAvoidingView, ImageBackground, ToastAndroid
} from 'react-native'
import _ from 'lodash';
import { authenticationURL } from '../../utils/Endpoints';

const bg = require('../assets/mobilepng.png')

export default class Authentication extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        password: '',
    }

    signupData({ name, email, phone, password }) {
        if (_.isString(name && email && phone && password == '')) {
            ToastAndroid.show('Field is required', ToastAndroid.SHORT)
        } else {
            const url = authenticationURL
            let bodyJSON = JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password
                })
            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: bodyJSON
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    ToastAndroid.show('Sign Up Success', ToastAndroid.SHORT)
                    this.props.navigation.navigate('Authorization')
                })
                .catch(err => {
                    console.log(err)
                    ToastAndroid.show('Email or Phone has registered', ToastAndroid.SHORT)
                    this.setState({ email: '', phone: '' })
                })
        }

    }

    goSignIn() {
        this.props.navigation.navigate('Authorization')
    }

    render() {
        const { name, email, phone, password } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior={'height' & 'padding'} style={styles.container} enabled>
                    <TouchableWithoutFeedback style={styles.container}
                        onPress={Keyboard.dismiss}>
                        <ImageBackground style={styles.container}
                            source={bg}
                        >
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.regText}>Create Account</Text>
                                    <TextInput
                                        onChangeText={name => this.setState({ name })}
                                        value={this.state.name}
                                        style={styles.input}
                                        placeholder="Name"
                                        placeholderTextColor='#fff'
                                        returnKeyType='next'
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.refs.txtEmail.focus()}
                                        blurOnSubmit={false}
                                    />
                                    <TextInput
                                        onChangeText={email => this.setState({ email })}
                                        value={this.state.email}
                                        style={styles.input}
                                        placeholder="Email"
                                        placeholderTextColor='#fff'
                                        keyboardType='email-address'
                                        returnKeyType='next'
                                        textContentType='emailAddress'
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.refs.txtPhone.focus()}
                                        ref={"txtEmail"}
                                        autoCapitalize='none'
                                        blurOnSubmit={false}
                                    />
                                    <TextInput
                                        onChangeText={phone => this.setState({ phone })}
                                        value={this.state.phone}
                                        style={styles.input}
                                        placeholder="Phone number (min. 6 characters)"
                                        placeholderTextColor='rgba(255,255,255,1)'
                                        keyboardType='number-pad'
                                        returnKeyType='next'
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.refs.txtPassword.focus()}
                                        ref={"txtPhone"}
                                        blurOnSubmit={false}
                                    />
                                    <TextInput
                                        onChangeText={password => this.setState({ password })}
                                        value={this.state.password}
                                        style={styles.input}
                                        placeholder="Password (min. 8 characters)"
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='go'
                                        secureTextEntry
                                        autoCorrect={false}
                                        ref={"txtPassword"}
                                        autoCapitalize='none'
                                    />
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.signupData({ name, email, phone, password })}>
                                        <Text style={styles.buttonText}>SIGN UP</Text>
                                    </TouchableOpacity>
                                    <View style={styles.signinWrapper}>
                                        <Text style={{ color: 'grey' }}>Already have an account? </Text>
                                        <TouchableOpacity onPress={() => this.goSignIn()}>
                                            <Text style={{ color: '#3478C0' }}>Sign in</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    inputWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 15,
        height: 307,
        paddingHorizontal: 35,
        paddingVertical: 5,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(128, 142, 155, 0.3)',
        color: '#FFF',
        marginBottom: 7,
        paddingHorizontal: 10,
        borderRadius: 11,
    },
    buttonContainer: {
        backgroundColor: '#3478C0',
        paddingVertical: 15,
        borderRadius: 11,
        elevation: 1
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    regText: {
        fontSize: 21,
        color: '#3478C0',
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    signinWrapper: {
        flexDirection: 'row',
        marginTop: 9,
    }
})

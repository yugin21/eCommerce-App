import React, { Component } from 'react'
import {
    StyleSheet, Text, View, TouchableWithoutFeedback, StatusBar, TextInput, SafeAreaView,
    Keyboard, TouchableOpacity, KeyboardAvoidingView, ImageBackground, ToastAndroid, AsyncStorage
} from 'react-native'
import Loading from './Loading';
import { authorizationURL } from '../../utils/Endpoints';

const bg = require('../assets/mobilepng.png')

export default class Authorization extends Component {

    state = { email: '', password: '', phone: '', loading: false }

    signinData = ({ email, phone, password }) => {
        const url = authorizationURL
        let bodyJSON = JSON.stringify({
                email: email,
                phone: phone,
                password: password
            })
        this.setState({ loading: true })
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
                if (data.token) {
                    ToastAndroid.show('Login Success', ToastAndroid.SHORT)
                    this.setState({ loading: false })
                    AsyncStorage.setItem('token', data.token)
                        .then(value => {
                            return value
                        })
                    this.props.navigation.navigate('MainHome')
                    this.setState({ email: '', password: '' })
                } else {
                    ToastAndroid.show('Invalid Email or Password', ToastAndroid.SHORT)
                    this.setState({ loading: false, password: '' })
                }
            })
            .catch(err => {
                ToastAndroid.show('Login Failed', ToastAndroid.SHORT)
                this.setState({ loading: false })
            })
    }

    componentWillMount() {
        this.renderToken()
    }

    renderToken() {
        AsyncStorage.getItem('token')
            .then(value => {
                if (value) {
                    this.props.navigation.navigate('Home')
                }
            })
            .catch(err => console.log(err))
    }

    goSignup() {
        this.props.navigation.navigate('Authentication')
    }

    loading() {
        const { email, password } = this.state
        if (this.state.loading) {
            return <Loading />
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <KeyboardAvoidingView behavior={'height' | 'padding' | 'position'} style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container}
                            onPress={Keyboard.dismiss}>
                            <ImageBackground style={styles.container}
                                source={bg}
                            >
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.regText}>Login Account</Text>
                                        <TextInput
                                            onChangeText={(email, phone) => this.setState({ email, phone })}
                                            value={this.state.email}
                                            style={styles.input}
                                            placeholder="Email or Phone"
                                            placeholderTextColor='#fff'
                                            keyboardType='email-address'
                                            textContentType='emailAddress'
                                            returnKeyType='next'
                                            autoCorrect={false}
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => this.refs.txtPassword.focus()}
                                            autoCapitalize='none'
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
                                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.signinData({ email, password })} >
                                            <Text style={styles.buttonText}>SIGN IN</Text>
                                        </TouchableOpacity>
                                        <View style={styles.signinWrapper}>
                                            <Text style={{ color: 'grey' }}>Not have an account? </Text>
                                            <TouchableOpacity onPress={() => this.goSignup()} >
                                                <Text style={{ color: '#3478C0' }}>Sign up</Text>
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.loading()}
            </View>
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
        height: 250,
        paddingHorizontal: 35,
        paddingVertical: 5,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(128, 142, 155, 0.3)',
        color: '#FFF',
        marginBottom: 10,
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

import React, { Component } from 'react'
import {
    StyleSheet, Text, View, TouchableWithoutFeedback, StatusBar, TextInput, SafeAreaView,
    Keyboard, TouchableOpacity, KeyboardAvoidingView, ImageBackground, ToastAndroid, AsyncStorage
} from 'react-native'
import Loading from './Loading';
import { changePasswordURL } from '../../utils/Endpoints';

const bg = require('../assets/mobilepng.png')

export default class ChangePassword extends Component {

    state = { password: '', newPassword: '', loading: false, token: '' }

    updatePassword = ({ password, newPassword }) => {
        const url = changePasswordURL
        const token = this.state.token
        this.setState({ loading: true })
        return fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                current_password: password,
                new_password: newPassword,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data)
                    ToastAndroid.show('Password Changed', ToastAndroid.SHORT)
                    this.setState({ newPassword: '', password: '', loading: false })
                } else {
                    console.log(data)
                    ToastAndroid.show('Current password is invalid', ToastAndroid.SHORT)
                    this.setState({ loading: false, password: '', newPassword: '' })
                }
            })
            .catch(err => {
                console.log(err)
                ToastAndroid.show('Failed', ToastAndroid.SHORT)
                this.setState({ loading: false })
            })
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(value => {
            this.setState({ token: value })
        })
    }

    loading() {
        const { password, newPassword } = this.state
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
                                        <Text style={styles.regText}>Change Password</Text>
                                        <TextInput
                                            onChangeText={(password) => this.setState({ password })}
                                            value={this.state.password}
                                            style={styles.input}
                                            placeholder="Current password"
                                            placeholderTextColor='#fff'
                                            returnKeyType='next'
                                            secureTextEntry
                                            autoCorrect={false}
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => this.refs.txtPassword.focus()}
                                            autoCapitalize='none'
                                        />
                                        <TextInput
                                            onChangeText={newPassword => this.setState({ newPassword })}
                                            value={this.state.newPassword}
                                            style={styles.input}
                                            placeholder="New password"
                                            placeholderTextColor='rgba(255,255,255,0.8)'
                                            returnKeyType='go'
                                            secureTextEntry
                                            autoCorrect={false}
                                            ref={"txtPassword"}
                                            autoCapitalize='none'
                                        />
                                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.updatePassword({ password, newPassword })} >
                                            <Text style={styles.buttonText}>OK</Text>
                                        </TouchableOpacity>
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
        console.log(this.state.token)
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
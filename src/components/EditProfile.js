import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, ToastAndroid, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage, TextInput } from 'react-native';
import { profileURL } from '../../utils/Endpoints';

const pp = require('../assets/pp.jpg')

export default class EditProfile extends Component {
    state = {
        dataSource: [],
        isLoading: false,
        refreshing: false,
        name: '',
        email: '',
        phone: '',
        token: null
    }


    updateProfile() {
        const token = this.state.token
        console.log(token)
        const { name, email, phone } = this.state
        axios.put(`http://e-commerce-rest-api.herokuapp.com/profile`, {
            name: name,
            email: email,
            phone: phone

        }, { headers: { Authorization: "Bearer " + token } })
            .then(responseJson => {
                console.log(responseJson)
                this.setState({
                    name: responseJson.data.profile.name,
                    phone: responseJson.data.profile.phone,
                    email: responseJson.data.profile.email,
                })
                ToastAndroid.show("Profile data updated!", ToastAndroid.SHORT);
            })
            .catch(err => {
                console.log(err)
                ToastAndroid.show("Your data failed to changed", ToastAndroid.SHORT);
            });
    }


    componentDidMount() {
        AsyncStorage.getItem('token').then(value => {
            this.setState({ token: value })
            this.requestDataProfile()
        })
    }

    requestDataProfile() {
        const url = profileURL
        const token = this.state.token
        console.log(token)
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    console.log(responseJson)
                    this.setState({
                        name: responseJson.profile.name,
                        phone: responseJson.profile.phone,
                        email: responseJson.profile.email,
                    })
                }
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    renderItem = () => {
        const { name, email, phone } = this.state
        return (
            <ScrollView style={{ flex: 1, marginBottom: 5 }}>
                <View style={styles.paymentContainer}>
                    <View style={styles.shippingTitleWrapper}>
                        <Text style={styles.shippingTitle}>Account Information</Text>
                    </View>

                    <View style={styles.shippingInputContainer}>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            onChangeText={name => this.setState({ name })}
                            value={name}
                            style={styles.input}
                            returnKeyType='next'
                            autoCorrect={false}
                            onSubmitEditing={() => this.refs.txtEmail.focus()}
                            blurOnSubmit={false}
                            maxLength={20}
                        />

                        <Text style={styles.inputTitle}>Email</Text>
                        <TextInput
                            onChangeText={email => this.setState({ email })}
                            value={email}
                            style={styles.input}
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            returnKeyType='next'
                            autoCorrect={false}
                            ref={"txtEmail"}
                            onSubmitEditing={() => this.refs.txtPhone.focus()}
                            blurOnSubmit={false}
                            autoCapitalize="none"
                        />

                        <Text style={styles.inputTitle}>Phone</Text>
                        <TextInput
                            onChangeText={phone => this.setState({ phone })}
                            value={phone}
                            style={styles.input}
                            returnKeyType='go'
                            autoCorrect={false}
                            blurOnSubmit={false}
                            ref={"txtPhone"}
                            keyboardType='number-pad'
                        />

                        <TouchableOpacity style={styles.orderButton} onPress={() => this.updateProfile()}>
                            <Text style={styles.orderButtonText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }

    render() {
        console.log(this.state)
        return (
            this.renderItem()
        )
    };
}

const styles = StyleSheet.create({
    userWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        height: 150,
        elevation: 2,
        marginTop: 3,
    },
    ppStyle: {
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        borderWidth: 4,
        borderColor: 'rgba(189, 195, 199,0.3)',
    },
    userNameText: {
        paddingHorizontal: 10,
        fontSize: 25,
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'left',
        paddingBottom: 10,
    },
    userPhoneText: {
        fontSize: 15,
        color: 'grey',
        paddingHorizontal: 10
    },
    paymentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 15,
        paddingVertical: 10
    },
    shippingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3478C0'
    },
    shippingTitleWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#dfe6e9',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    inputTitle: {
        fontSize: 15,
        color: 'grey',
        paddingBottom: 5
    },
    shippingInputContainer: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    input: {
        height: 40,
        backgroundColor: '#ecf0f1',
        color: '#000',
        marginBottom: 10,
        borderRadius: 3,
        paddingHorizontal: 10
    },
    orderButton: {
        backgroundColor: '#3478C0',
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    orderButtonText: {
        fontSize: 19,
        color: '#fff'
    },

})
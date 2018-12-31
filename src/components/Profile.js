import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import Icon from 'react-native-fa-icons';
import { profileURL } from '../../utils/Endpoints';

const pp = require('../assets/pp.jpg')

export default class Profile extends Component {
    state = {
        dataSource: [],
        isLoading: false,
        refreshing: false,
        orders: ''
    }

    signOut() {
        AsyncStorage.removeItem('token')
            .then(() => {
                return this.props.navigation.navigate('Authorization')
            })
            .catch(err => console.log(err))
    }

    goSignUp() {
        this.props.navigation.navigate('Authentication')
    }

    goSignIn() {
        this.props.navigation.navigate('Authorization')
    }

    goChangePassword() {
        this.props.navigation.navigate('ChangePassword')
    }

    goWaitingPayment() {
        this.props.navigation.navigate('WaitingPayment')
    }

    goWaitingConfirm() {
        this.props.navigation.navigate('WaitingConfirm')
    }

    goOrderOnProcess() {
        this.props.navigation.navigate('OrderOnProcess')
    }

    goOrderOnShipping() {
        this.props.navigation.navigate('OrderOnShipping')
    }

    goOrderReceived() {
        this.props.navigation.navigate('OrderReceived')
    }

    goEditProfile() {
        this.props.navigation.navigate('EditProfile')
    }

    dataRequest() {
        const url = profileURL
        const token = this.state.token
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: responseJson.profile,
                    orders: responseJson.orders,
                    photo: responseJson.profile.photo,
                    isLoading: false,
                    refreshing: false,
                })
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(value => {
            this.setState({ token: value })
            this.dataRequest()
        })

    }

    renderItem = () => {
        const { dataSource, orders } = this.state
        return (
            <ScrollView style={{ flex: 1, marginBottom: 5 }}>
                <View style={styles.userWrapper}>
                    <TouchableOpacity style={{ marginRight: 15, }} onPress={() => this.props.navigation.navigate('Upload')}>
                        <Image
                            source={{ uri: dataSource.photo }}
                            style={styles.ppStyle}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={styles.userNameText}>{dataSource.name}</Text>
                        <Text style={styles.userPhoneText}>{dataSource.phone}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Upload')}>
                            <Text style={{ color: '#3478C0', paddingTop: 10, paddingHorizontal: 10 }}>[Change avatar]</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity style={styles.signInButton} onPress={() => this.goSignIn()}>
                            <Text style={styles.signInButtonText}>SIGN IN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity style={styles.signUpButton} onPress={() => this.goSignUp()}>
                            <Text style={styles.signUpButtonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, marginTop: 15, }}>
                    <TouchableOpacity style={styles.menuSection} onPress={() => this.goWaitingPayment()}>
                        <Icon name="hourglass" style={{ fontSize: 20, paddingRight: 15, }} />
                        <Text style={{ fontSize: 17, }}>Waiting Payment</Text>
                        <View style = {styles.ordersCount}>
                            <Text style = {styles.ordersCountText}>{orders.waiting_payment}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuSection} onPress={() => this.goWaitingConfirm()}>
                        <Icon name="hourglass" style={{ fontSize: 20, paddingRight: 15, }} />
                        <Text style={{ fontSize: 17, }}>Waiting Confirm Orders</Text>
                        <View style = {styles.ordersCount}>
                            <Text style = {styles.ordersCountText}>{orders.waiting_confirm}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuSection} onPress={() => this.goOrderOnProcess()}>
                        <Icon name="gg-circle" style={{ fontSize: 20, paddingRight: 15, }} />
                        <Text style={{ fontSize: 17, }}>Order on Process</Text>
                        <View style = {styles.ordersCount}>
                            <Text style = {styles.ordersCountText}>{orders.onprocess}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuSection} onPress={() => this.goOrderOnShipping()}>
                        <Icon name="plane" style={{ fontSize: 20, paddingRight: 15, }} />
                        <Text style={{ fontSize: 17, }}>Order in Shipping</Text>
                        <View style = {styles.ordersCount}>
                            <Text style = {styles.ordersCountText}>{orders.onshipping}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuSection} onPress={() => this.goOrderReceived()}>
                        <Icon name="home" style={{ fontSize: 20, paddingRight: 15, }} />
                        <Text style={{ fontSize: 17, }}>Order Received</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.menuEditSection} onPress={() => this.goEditProfile()}>
                        <Icon name="gear" style={{ fontSize: 20, paddingRight: 15, }} />
                        <Text style={{ fontSize: 17, }}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuSection} onPress={() => this.goChangePassword()}>
                        <Icon name="key" style={{ fontSize: 20, paddingRight: 15, }} />
                        <Text style={{ fontSize: 17, }}>Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signOutSection} onPress={() => this.signOut()}>
                        <Text style={{ fontSize: 17, color: '#3478C0' }}>SIGN OUT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    render() {
        return (
            this.renderItem()
        )
    };
}

const styles = StyleSheet.create({
    userWrapper: {
        flex: 1,
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
    menuSection: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#dfe6e9',
    },
    menuEditSection: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#dfe6e9',
        marginTop: 10
    },
    signUpButton: {
        backgroundColor: '#3478C0',
        paddingVertical: 15,
        borderRadius: 3,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 10,
    },
    signInButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderRadius: 3,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 10,
    },
    signUpButtonText: {
        fontSize: 15,
        color: '#fff'
    },
    signInButtonText: {
        fontSize: 15,
        color: '#3478C0'
    },
    signOutSection: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#dfe6e9',
        marginTop: 10
    },
    ordersCount:{
        flex: 1, 
        alignItems: 'flex-end', 
        marginRight: 10,
    },
    ordersCountText:{
        color: '#fff',
        borderRadius: 18/2,
        height: 18,
        width: 18,
        backgroundColor: '#ff6b6b',
        textAlign: 'center'
    }
})
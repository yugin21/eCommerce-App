import React, { Component } from 'react'
import { Picker, AsyncStorage, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import _ from 'lodash';
import { shippingURL, provinceURL, checkoutURL } from '../../utils/Endpoints';

export default class Shipping extends Component {

    state = {
        choosenProvince: '', token: '', zip: '',
        name: '', phone: '', address: '', province: '', city: '',
        dataSource: [], dataSourceCity: [], dataProvince: '', dataCity: '', choosenCity: ''
    }

    postShippingData({ name, phone, address, choosenProvince, choosenCity, zip }) {
        if (_.isString(name && phone && address && choosenProvince && choosenCity && zip == '')) {
            ToastAndroid.show('Field is required', ToastAndroid.SHORT)
        } else {
            const url = shippingURL
            const token = this.state.token
            return fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    received_name: name,
                    phone: phone,
                    address: address,
                    province_id: choosenProvince,
                    city_id: choosenCity,
                    zip: zip
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.props.navigation.navigate('Review')
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }


    requestDataProvince() {
        const url = provinceURL

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: [...responseJson],
                    dataProvince: responseJson.province
                })
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    requestDataCity(id) {
        const url = `http://e-commerce-rest-api.herokuapp.com/city?province=` + id

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSourceCity: [...responseJson],
                    choosenProvince: id
                })
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(value => {
            this.setState({ token: value })
            this.requestDataShipping()
        })
        this.requestDataProvince()

    }

    requestDataShipping() {
        const url = checkoutURL
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
                if (this.state.qty != 0 && responseJson.shipping) {
                    console.log(responseJson)
                    this.setState({
                        name: responseJson.shipping.received_name,
                        phone: responseJson.shipping.phone,
                        address: responseJson.shipping.address,
                        choosenProvince: responseJson.shipping.province_id,
                        choosenCity: responseJson.shipping.city_id,
                        zip: responseJson.shipping.zip.toString()
                    })
                }
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    renderItem = () => {
        const { name, phone, address, province, city, dataSource, choosenCity,
            dataSourceCity, choosenProvince, zip } = this.state
        console.log(this.state)


        let listProvince = []
        dataSource.forEach(element => {
            listProvince.push(element.province)
        });

        let listIdProvince = []
        dataSource.forEach(element => {
            listIdProvince.push(element.province_id)
        });

        let pickerProvince = listProvince.map((s, i) => {
            return <Picker.Item key={i} value={listIdProvince[i]} label={s} />
        });

        let listCity = []
        dataSourceCity.forEach(element => {
            listCity.push(element.city_name)
        });

        let listIdCity = []
        dataSourceCity.forEach(element => {
            listIdCity.push(element.city_id)
        });

        let pickercity = listCity.map((s, i) => {
            return <Picker.Item key={i} value={listIdCity[i]} label={s} />
        });

        return (
            <ScrollView style={{ flex: 1, }} >
                <View style={styles.paymentContainer}>
                    <View style={styles.shippingTitleWrapper}>
                        <Text style={styles.shippingTitle}>Shipping Address</Text>
                    </View>

                    <View style={styles.shippingInputContainer}>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                            style={styles.input}
                            returnKeyType='next'
                            autoCorrect={false}
                            onSubmitEditing={() => this.refs.txtPhone.focus()}
                            blurOnSubmit={false}
                        />

                        <Text style={styles.inputTitle}>Phone</Text>
                        <TextInput
                            onChangeText={phone => this.setState({ phone })}
                            value={this.state.phone}
                            style={styles.input}
                            returnKeyType='next'
                            autoCorrect={false}
                            onSubmitEditing={() => this.refs.txtAddress.focus()}
                            blurOnSubmit={false}
                            ref={"txtPhone"}
                            keyboardType='number-pad'
                        />

                        <Text style={styles.inputTitle}>Address</Text>
                        <TextInput
                            onChangeText={address => this.setState({ address })}
                            value={this.state.address}
                            style={styles.addressInput}
                            returnKeyType='next'
                            autoCorrect={false}
                            blurOnSubmit={false}
                            ref={"txtAddress"}
                            multiline={true}
                        />
                        <Text style={{ color: 'grey', paddingBottom: 15 }}>
                            Example: Glagah Lor, Tamanan, Banguntapan, Bantul Regency, Special Region of Yogyakarta
                        </Text>

                        <Text style={styles.inputTitle}>Select Province</Text>
                        <Picker selectedValue={choosenProvince}
                            onValueChange={
                                (itemValue) => this.requestDataCity(itemValue)
                            }>
                            {pickerProvince}
                        </Picker>

                        <Text style={styles.inputTitle}>Select City</Text>
                        <Picker selectedValue={choosenCity}
                            onValueChange={
                                (itemValue) => this.setState({ choosenCity: itemValue })
                            }>
                            {pickercity}
                        </Picker>

                        <Text style={styles.inputTitle}>Zip Code</Text>
                        <TextInput
                            onChangeText={zip => this.setState({ zip })}
                            value={this.state.zip}
                            style={styles.input}
                            returnKeyType='go'
                            autoCorrect={false}
                            blurOnSubmit={false}
                            keyboardType='number-pad'
                        />


                        <TouchableOpacity style={styles.orderButton} onPress={() => this.postShippingData({ name, phone, address, choosenProvince, choosenCity, zip })}>
                            <Text style={styles.orderButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }

    render() {
        return (
            this.renderItem()
        )
    }
}
const styles = StyleSheet.create({
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
    addressInput: {
        height: 100,
        backgroundColor: '#ecf0f1',
        color: '#000',
        marginBottom: 10,
        borderRadius: 3,
        paddingHorizontal: 10,
        textAlignVertical: 'top'
    },
    dropdownTitle: {
        fontSize: 15,
        color: 'grey',
        paddingTop: 10,
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
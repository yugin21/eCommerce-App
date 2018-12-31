import React, { Component } from 'react';
import { View, Alert, ScrollView, Text, AsyncStorage, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Loading from './Loading';
import { orderOnShippingURL } from '../../utils/Endpoints';

class OrderOnShipping extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            page: 1,
            seed: 1,
            isLoading: true,
            refreshing: false,
            token: null,
            orderID: ''
        }
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.shippingInputContainer}>
                <View style={styles.selectedPaymentSection}>
                    <View style={{ borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#dfe6e9' }}>
                        <Text style={styles.totalItem}>In Shipping</Text>
                    </View>
                    <View style={styles.selectedAddressWrapper}>
                        <View style={styles.selectedAddressWrapper}>
                            <Text style={styles.addressText}>Invoice: <Text style={{ fontSize: 15, color: 'red' }}>{item.invoice}</Text></Text>
                            <Text style={styles.addressText}>Total Cost: {item.total_payment}</Text>
                        </View>

                        <TouchableOpacity style={styles.orderButton} onPress={() => this.confirmOrderReceived(item.order_id)}>
                            <Text style={styles.orderButtonText}>Confirm Received Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    dataRequest() {
        const url = orderOnShippingURL
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
                    dataSource: [...responseJson.data],
                    isLoading: false,
                    refreshing: false,
                })
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    confirmOrderReceived(id) {
        const url = `http://e-commerce-rest-api.herokuapp.com/order/confirm-received?order_id=${id}`
        const token = this.state.token
        console.log(id)
        Alert.alert(
            'Confirm Order',
            'You have received your order?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () =>
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
                                this.dataRequest()
                            })
                            .catch(error => {
                                this.setState({ error, isLoading: false, refreshing: false })
                            })
                },
            ],
            { cancelable: false }
        )

    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(value => {
            this.setState({ token: value })
            this.dataRequest()
        })
    }


    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true,
                seed: this.state.seed + 1,
            }, () => {
                this.dataRequest();
            }
        )
    }

    render() {
        return (
            this.state.isLoading
                ?
                <Loading />
                :
                <ScrollView>
                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    shippingInputContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginVertical: 5,
    },
    selectedPaymentSection: {
        flex: 1,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    totalItem: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingVertical: 10,
        color: '#3478C0'
    },
    selectedAddressWrapper: {
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    addressText: {
        fontSize: 15,
        color: 'grey',
        paddingVertical: 10
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

export default OrderOnShipping;